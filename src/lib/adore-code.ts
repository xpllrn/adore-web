import type { Block, EmbedState, MessageButton, Mode } from "@/types/embed";

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
    try {
      const data = JSON.parse(raw) as Record<string, unknown>;
      if (data["mode"] === "embed" || data["mode"] === "container") {
        return {
          mode: data["mode"],
          message: typeof data["content"] === "string" ? data["content"] : undefined,
          embed:
            data["embed"] && typeof data["embed"] === "object"
              ? (data["embed"] as Partial<EmbedState>)
              : undefined,
          containerColor:
            data["container"] &&
            typeof data["container"] === "object" &&
            typeof (data["container"] as { color?: unknown }).color === "string"
              ? (data["container"] as { color: string }).color
              : undefined,
          blocks:
            data["container"] &&
            typeof data["container"] === "object" &&
            Array.isArray((data["container"] as { components?: unknown }).components)
              ? (data["container"] as { components: Block[] }).components
              : undefined,
          buttons: Array.isArray(data["buttons"])
            ? (data["buttons"] as MessageButton[])
            : undefined,
        };
      }
    } catch {
      return null;
    }
    return null;
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
      const hex = val.startsWith("#") ? val : `#${val}`;
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
