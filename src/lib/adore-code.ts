import type { Block, EmbedField, EmbedState, MessageButton, Mode } from "@/types/embed";

/** `0x9DD2A8`, `9DD2A8`, `#9dd2a8` -> `#9dd2a8`/`#9DD2A8`. Anything else is returned trimmed. */
export function normalizeHexColor(value: string): string {
  const bare = value.trim().replace(/^0x/i, "").replace(/^#/, "");
  return /^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(bare) ? `#${bare}` : value.trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

// Ids for items coming from pasted JSON; the builder re-keys them on load anyway.
let coercedId = 50_000;

function coerceEmbed(raw: Record<string, unknown>): Partial<EmbedState> {
  const embed: Partial<EmbedState> = {};
  const stringKeys = [
    "title",
    "description",
    "authorName",
    "authorIcon",
    "authorUrl",
    "thumbnail",
    "image",
    "footer",
    "footerIcon",
  ] as const;
  for (const key of stringKeys) {
    const value = asString(raw[key]);
    if (value !== undefined) embed[key] = value;
  }
  const color = asString(raw["color"]);
  if (color) embed.color = normalizeHexColor(color);
  if (typeof raw["timestamp"] === "boolean") embed.timestamp = raw["timestamp"];
  embed.fields = Array.isArray(raw["fields"])
    ? raw["fields"].filter(isRecord).map((field): EmbedField => ({
        id: ++coercedId,
        name: asString(field["name"]) ?? "Field",
        value: asString(field["value"]) ?? "",
        inline: field["inline"] === true,
      }))
    : [];
  return embed;
}

function coerceButtons(raw: unknown[]): MessageButton[] {
  return raw.filter(isRecord).map((button) => {
    const coerced: MessageButton = {
      id: ++coercedId,
      label: asString(button["label"]) ?? "Button",
    };
    const url = asString(button["url"]);
    if (url !== undefined) coerced.url = url;
    return coerced;
  });
}

function coerceBlocks(raw: unknown[]): Block[] {
  const blocks: Block[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    const text = asString(item["text"]) ?? "";
    const url = asString(item["url"]) ?? "";
    switch (item["type"]) {
      case "text":
        blocks.push({ id: ++coercedId, type: "text", text });
        break;
      case "separator":
        blocks.push({ id: ++coercedId, type: "separator" });
        break;
      case "image":
        blocks.push({
          id: ++coercedId,
          type: "image",
          url,
          description: asString(item["description"]) ?? "",
        });
        break;
      case "section":
        blocks.push({
          id: ++coercedId,
          type: "section",
          text,
          accessory: item["accessory"] === "button" ? "button" : "thumbnail",
          url,
          label: asString(item["label"]) ?? "Open",
        });
        break;
      case "gallery":
        blocks.push({
          id: ++coercedId,
          type: "gallery",
          images: (Array.isArray(item["images"]) ? item["images"] : [])
            .filter(isRecord)
            .map((image) => ({
              id: ++coercedId,
              url: asString(image["url"]) ?? "",
              description: asString(image["description"]) ?? "",
            })),
        });
        break;
    }
  }
  return blocks;
}

export function buildAdoreCode(
  mode: Mode,
  message: string,
  embed: EmbedState,
  containerColor: string,
  blocks: Block[],
  buttons: MessageButton[],
): string {
  const parts: string[] = [];
  const trim = (s?: string) => (typeof s === "string" ? s.trim() : "");

  if (trim(message)) {
    parts.push(`content: ${trim(message)}`);
  }

  if (mode === "embed") {
    if (trim(embed.color)) {
      parts.push(`color: ${trim(embed.color)}`);
    }
    if (trim(embed.authorName)) {
      let seg = trim(embed.authorName);
      if (trim(embed.authorUrl)) {
        seg += ` && ${trim(embed.authorIcon) || "N/A"} && ${trim(embed.authorUrl)}`;
      } else if (trim(embed.authorIcon)) {
        seg += ` && ${trim(embed.authorIcon)}`;
      }
      parts.push(`author: ${seg}`);
    }
    if (trim(embed.title)) {
      parts.push(`title: ${trim(embed.title)}`);
    }
    if (trim(embed.description)) {
      parts.push(`description: ${trim(embed.description)}`);
    }
    if (trim(embed.thumbnail)) {
      parts.push(`thumbnail: ${trim(embed.thumbnail)}`);
    }
    if (trim(embed.image)) {
      parts.push(`image: ${trim(embed.image)}`);
    }
    for (const f of embed.fields) {
      if (trim(f.name) || trim(f.value)) {
        parts.push(
          `field: ${trim(f.name) || "\u200b"} && ${trim(f.value) || "\u200b"}${f.inline ? " && true" : ""}`,
        );
      }
    }
    if (trim(embed.footer)) {
      let seg = trim(embed.footer);
      if (trim(embed.footerIcon)) {
        seg += ` && ${trim(embed.footerIcon)}`;
      }
      parts.push(`footer: ${seg}`);
    }
    if (embed.timestamp) {
      parts.push("timestamp");
    }
    for (const b of buttons) {
      if (trim(b.label) || trim(b.url)) {
        const target = trim(b.url) || "https://adore.rest";
        const label = trim(b.label) || "Button";
        parts.push(`button: ${target} && ${label}`);
      }
    }

    if (!parts.length) return "{embed}";
    return `{embed}${parts.map((p) => `$v{${p}}`).join("")}`;
  } else {
    if (trim(containerColor)) {
      parts.push(`color: ${trim(containerColor)}`);
    }
    for (const b of blocks) {
      if (b.type === "text") {
        if (trim(b.text)) parts.push(`text: ${trim(b.text)}`);
      } else if (b.type === "section") {
        if (!trim(b.text)) continue;
        if (b.accessory === "button") {
          const btnTarget = trim(b.url) || "https://adore.rest";
          const btnLabel = trim(b.label) || "Open";
          parts.push(`section: ${trim(b.text)} && button && ${btnTarget} && ${btnLabel}`);
        } else if (b.accessory === "thumbnail" && trim(b.url)) {
          parts.push(`section: ${trim(b.text)} && ${trim(b.url)}`);
        } else {
          parts.push(`text: ${trim(b.text)}`);
        }
      } else if (b.type === "separator") {
        parts.push("separator");
      } else if (b.type === "image") {
        if (trim(b.url)) parts.push(`image: ${trim(b.url)}`);
      } else if (b.type === "gallery") {
        const urls = b.images.map((img) => trim(img.url)).filter(Boolean);
        if (urls.length > 0) parts.push(`gallery: ${urls.join(" && ")}`);
      }
    }
    for (const b of buttons) {
      if (trim(b.label) || trim(b.url)) {
        const target = trim(b.url) || "https://adore.rest";
        const label = trim(b.label) || "Button";
        parts.push(`button: ${target} && ${label}`);
      }
    }

    if (!parts.length) return "{container}";
    return `{container}${parts.map((p) => `$v{${p}}`).join("")}`;
  }
}

export function parseAdoreCode(code: string): {
  mode: Mode;
  message?: string | undefined;
  embed?: Partial<EmbedState> | undefined;
  containerColor?: string | undefined;
  blocks?: Block[] | undefined;
  buttons?: MessageButton[] | undefined;
} | null {
  let raw = code.trim();
  if (/^[,/!.]createembed\s+/i.test(raw)) {
    raw = raw.replace(/^[,/!.]createembed\s+/i, "").trim();
  }

  const isContainer = /^\{container\}/i.test(raw);
  const isEmbed = /^\{embed\}/i.test(raw);

  if (!isContainer && !isEmbed) {
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return null;
    }
    if (!isRecord(data) || (data["mode"] !== "embed" && data["mode"] !== "container")) return null;
    // Pasted JSON is untrusted: coerce every value so a wrong type can't crash the preview.
    const container = isRecord(data["container"]) ? data["container"] : undefined;
    const containerColor = asString(container?.["color"]);
    const components: unknown = container?.["components"];
    const buttons: unknown = data["buttons"];
    return {
      mode: data["mode"],
      message: typeof data["content"] === "string" ? data["content"] : undefined,
      embed: isRecord(data["embed"]) ? coerceEmbed(data["embed"]) : undefined,
      containerColor: containerColor ? normalizeHexColor(containerColor) : undefined,
      blocks: Array.isArray(components) ? coerceBlocks(components) : undefined,
      buttons: Array.isArray(buttons) ? coerceButtons(buttons) : undefined,
    };
  }

  const mode: Mode = isContainer ? "container" : "embed";
  const body = raw.slice(isContainer ? 11 : 7);
  const parts = body
    .split("$v")
    .map((p) => p.trim().replace(/^\{/, "").replace(/\}$/, "").trim())
    .filter(Boolean);

  let message: string | undefined;
  const newEmbed: Partial<EmbedState> = { fields: [] };
  let containerColor: string | undefined;
  const blocks: Block[] = [];
  const buttons: MessageButton[] = [];
  let idGen = 100;

  for (const part of parts) {
    const colonIdx = part.indexOf(":");
    const key = (colonIdx === -1 ? part : part.slice(0, colonIdx)).trim().toLowerCase();
    const val = colonIdx === -1 ? "" : part.slice(colonIdx + 1).trim();

    if (key === "content" || key === "message") {
      message = val;
    } else if (key === "color") {
      const hex = normalizeHexColor(val);
      if (mode === "container") containerColor = hex;
      else newEmbed.color = hex;
    } else if (key === "button") {
      const args = val.split("&&").map((s) => s.trim());
      buttons.push({
        id: ++idGen,
        url: args[0] || "",
        label: args[1] || "Button",
      });
    } else if (mode === "embed") {
      if (key === "title") newEmbed.title = val;
      else if (key === "description") newEmbed.description = val;
      else if (key === "thumbnail") newEmbed.thumbnail = val;
      else if (key === "image") newEmbed.image = val;
      else if (key === "timestamp") newEmbed.timestamp = true;
      else if (key === "author") {
        const args = val.split("&&").map((s) => s.trim());
        newEmbed.authorName = args[0] || "";
        newEmbed.authorIcon = args[1] && args[1].toUpperCase() !== "N/A" ? args[1] : "";
        newEmbed.authorUrl = args[2] || "";
      } else if (key === "footer") {
        const args = val.split("&&").map((s) => s.trim());
        newEmbed.footer = args[0] || "";
        newEmbed.footerIcon = args[1] || "";
      } else if (key === "field") {
        const args = val.split("&&").map((s) => s.trim());
        const inline = args[2]?.toLowerCase() === "true" || args[2]?.toLowerCase() === "inline";
        newEmbed.fields = newEmbed.fields || [];
        newEmbed.fields.push({
          id: ++idGen,
          name: args[0] || "Field",
          value: args[1] || "\u200b",
          inline,
        });
      }
    } else {
      if (key === "text") {
        blocks.push({ id: ++idGen, type: "text", text: val });
      } else if (key === "separator") {
        blocks.push({ id: ++idGen, type: "separator" });
      } else if (key === "image") {
        blocks.push({ id: ++idGen, type: "image", url: val, description: "" });
      } else if (key === "gallery") {
        const urls = val
          .split("&&")
          .map((s) => s.trim())
          .filter(Boolean);
        blocks.push({
          id: ++idGen,
          type: "gallery",
          images: urls.map((u) => ({ id: ++idGen, url: u, description: "" })),
        });
      } else if (key === "section") {
        const args = val.split("&&").map((s) => s.trim());
        const text = args[0] || "";
        if (args[1]?.toLowerCase() === "button") {
          blocks.push({
            id: ++idGen,
            type: "section",
            text,
            accessory: "button",
            url: args[2] || "",
            label: args[3] || "Open",
          });
        } else {
          blocks.push({
            id: ++idGen,
            type: "section",
            text,
            accessory: "thumbnail",
            url: args[1] || "",
            label: "Open",
          });
        }
      }
    }
  }

  return { mode, message, embed: newEmbed, containerColor, blocks, buttons };
}

export type { Block, EmbedField, EmbedState, MessageButton, Mode } from "@/types/embed";
