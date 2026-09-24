import { ArrowDown, ArrowUp, Check, ChevronDown, ChevronRight, Clipboard, Code2, Copy, ImageIcon, Link2, Plus, RotateCcw, SeparatorHorizontal, Trash2, Type, X } from "lucide-react";
import { useMemo, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { ADORE_AVATAR } from "./site-chrome";
import { Button } from "@/components/ui/button";

const inputClass = "min-w-0 rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";
const panelClass = "rounded-md border border-border bg-surface shadow-panel";

type Mode = "embed" | "container";
type EmbedField = { id: number; name: string; value: string; inline: boolean };
type MessageButton = { id: number; label: string; url: string };
type Block =
  | { id: number; type: "text"; text: string }
  | { id: number; type: "section"; text: string; accessory: "thumbnail" | "button"; url: string; label: string }
  | { id: number; type: "separator" }
  | { id: number; type: "image"; url: string; description: string }
  | { id: number; type: "gallery"; images: { id: number; url: string; description: string }[] };

type EmbedState = {
  title: string; description: string; color: string; authorName: string; authorIcon: string; authorUrl: string;
  thumbnail: string; image: string; footer: string; footerIcon: string; timestamp: boolean; fields: EmbedField[];
};

const initialEmbed: EmbedState = {
  title: "Welcome to the community", description: "Read the rules, choose your roles, and make yourself at home.", color: "#8b8d92",
  authorName: "", authorIcon: "", authorUrl: "", thumbnail: "", image: "", footer: "Powered by adore", footerIcon: "", timestamp: false, fields: [],
};

const variableGroups = {
  Server: ["{guild.name}", "{guild.id}", "{guild.membercount}", "{guild.boost_count}", "{guild.boost_tier}", "{guild.role_count}", "{guild.emoji_count}", "{guild.channels_count}", "{guild.owner_id}", "{guild.created_at}"],
  Member: ["{user.name}", "{user.mention}", "{user.id}", "{user.avatar}", "{user.created_at}", "{user.joined_at}"],
  Channel: ["{channel.name}", "{channel.mention}", "{channel.id}", "{channel.topic}"],
  "Date & time": ["{date}", "{time}", "{timestamp}", "{timestamp.relative}"],
};

const sampleVariables: Record<string, string> = {
  "{guild.name}": "Adore Community", "{guild.id}": "120493827102", "{guild.membercount}": "232,375", "{guild.boost_count}": "48", "{guild.boost_tier}": "3",
  "{guild.role_count}": "36", "{guild.emoji_count}": "120", "{guild.channels_count}": "42", "{guild.owner_id}": "1029384756", "{guild.created_at}": "September 19, 2024",
  "{user.name}": "stella", "{user.mention}": "@stella", "{user.id}": "918273645", "{user.avatar}": "avatar", "{user.created_at}": "May 8, 2021", "{user.joined_at}": "Today",
  "{channel.name}": "general", "{channel.mention}": "#general", "{channel.id}": "564738291", "{channel.topic}": "The main community chat",
  "{date}": "September 19, 2026", "{time}": "10:53 AM", "{timestamp}": "September 19 at 10:53 AM", "{timestamp.relative}": "a few seconds ago",
};

function renderVariables(value: string) {
  return Object.entries(sampleVariables).reduce((text, [variable, sample]) => text.split(variable).join(sample), value);
}

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="mb-1 mt-2 text-lg font-bold leading-tight first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-1 mt-2 text-base font-bold leading-tight first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-1 mt-2 text-sm font-bold leading-tight first:mt-0">{children}</h3>,
  p: ({ children }) => <p className="min-w-0 whitespace-pre-wrap break-words leading-5">{children}</p>,
  blockquote: ({ children }) => <blockquote className="my-1 border-l-[3px] border-strong pl-3 text-foreground">{children}</blockquote>,
  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="text-muted-foreground">{children}</del>,
  a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="text-discord underline underline-offset-2">{children}</a>,
  code: ({ children }) => <code className="rounded-sm bg-background px-1 py-0.5 font-mono text-[.9em] text-foreground">{children}</code>,
  pre: ({ children }) => <pre className="my-2 max-w-full overflow-x-auto rounded-sm bg-background p-3 font-mono text-[10px] leading-4">{children}</pre>,
  ul: ({ children }) => <ul className="my-1 list-disc space-y-0.5 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="my-1 list-decimal space-y-0.5 pl-5">{children}</ol>,
  hr: () => <hr className="my-2 border-border" />,
};

function DiscordMarkdown({ value, className = "" }: { value: string; className?: string }) {
  return <div className={`discord-markdown min-w-0 break-words ${className}`}><ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>{renderVariables(value)}</ReactMarkdown></div>;
}

function buildAdoreCode(
  mode: Mode,
  message: string,
  embed: EmbedState,
  containerColor: string,
  blocks: Block[],
  buttons: MessageButton[]
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
        parts.push(`field: ${trim(f.name) || "\u200b"} && ${trim(f.value) || "\u200b"}${f.inline ? " && true" : ""}`);
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

function parseAdoreCode(code: string): {
  mode: Mode;
  message?: string;
  embed?: Partial<EmbedState>;
  containerColor?: string;
  blocks?: Block[];
  buttons?: MessageButton[];
} | null {
  let raw = code.trim();
  if (/^[,\/!.]createembed\s+/i.test(raw)) {
    raw = raw.replace(/^[,\/!.]createembed\s+/i, "").trim();
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
          embed: data["embed"] && typeof data["embed"] === "object" ? (data["embed"] as Partial<EmbedState>) : undefined,
          containerColor:
            data["container"] && typeof data["container"] === "object" && typeof (data["container"] as { color?: unknown }).color === "string"
              ? ((data["container"] as { color: string }).color)
              : undefined,
          blocks:
            data["container"] && typeof data["container"] === "object" && Array.isArray((data["container"] as { components?: unknown }).components)
              ? ((data["container"] as { components: Block[] }).components)
              : undefined,
          buttons: Array.isArray(data["buttons"]) ? (data["buttons"] as MessageButton[]) : undefined,
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
        const urls = val.split("&&").map((s) => s.trim()).filter(Boolean);
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

export function MessageBuilder() {
  const [mode, setMode] = useState<Mode>("embed");
  const [message, setMessage] = useState("");
  const [embed, setEmbed] = useState<EmbedState>(initialEmbed);
  const [blocks, setBlocks] = useState<Block[]>([{ id: 1, type: "text", text: "Welcome to **{guild.name}**." }]);
  const [buttons, setButtons] = useState<MessageButton[]>([]);
  const [webhook, setWebhook] = useState("");
  const [containerColor, setContainerColor] = useState("#8b8d92");
  const [activeTarget, setActiveTarget] = useState<"message" | "title" | "description" | "footer">("description");
  const [variableSearch, setVariableSearch] = useState("");
  const [codeDraft, setCodeDraft] = useState("");
  const [codeDirty, setCodeDirty] = useState(false);
  const [notice, setNotice] = useState("");
  const [nextId, setNextId] = useState(10);

  const generatedCode = useMemo(
    () => buildAdoreCode(mode, message, embed, containerColor, blocks, buttons),
    [mode, message, embed, containerColor, blocks, buttons]
  );
  const shownCode = codeDirty ? codeDraft : generatedCode;

  function flash(text: string) { setNotice(text); window.setTimeout(() => setNotice(""), 2200); }
  function freshId() { const id = nextId; setNextId((value) => value + 1); return id; }
  function updateEmbed<K extends keyof EmbedState>(key: K, value: EmbedState[K]) { setEmbed((current) => ({ ...current, [key]: value })); }
  function clearAll() { setMessage(""); setEmbed({ ...initialEmbed, fields: [] }); setBlocks([]); setButtons([]); setWebhook(""); setCodeDirty(false); flash("Builder cleared"); }
  function insertVariable(variable: string) {
    if (activeTarget === "message") setMessage((value) => value + variable);
    else if (activeTarget === "title") updateEmbed("title", embed.title + variable);
    else if (activeTarget === "footer") updateEmbed("footer", embed.footer + variable);
    else updateEmbed("description", embed.description + variable);
  }
  function moveItem<T>(items: T[], index: number, direction: -1 | 1) { const target = index + direction; if (target < 0 || target >= items.length) return items; const current = items[index]; const replacement = items[target]; if (current === undefined || replacement === undefined) return items; const copy = [...items]; copy[index] = replacement; copy[target] = current; return copy; }

  async function copyToClipboard(text: string, label: string) {
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback below
    }

    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      flash(`${label} copied to clipboard!`);
    } else {
      flash("Could not copy to clipboard");
    }
  }

  function loadCode() {
    const parsed = parseAdoreCode(shownCode);
    if (!parsed) {
      flash("Code could not be parsed");
      return;
    }
    setMode(parsed.mode);
    if (parsed.message !== undefined) setMessage(parsed.message);
    if (parsed.embed) {
      setEmbed((current) => ({
        ...current,
        ...parsed.embed,
        fields: parsed.embed?.fields || current.fields,
      }));
    }
    if (parsed.containerColor) setContainerColor(parsed.containerColor);
    if (parsed.blocks && parsed.blocks.length > 0) setBlocks(parsed.blocks);
    if (parsed.buttons) setButtons(parsed.buttons);
    setCodeDirty(false);
    flash("Code loaded into builder!");
  }

  return <div className="mx-auto max-w-[1500px] px-3 pb-20 sm:px-6 sm:pb-28">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-0 items-center gap-1 rounded-md border border-border bg-surface p-1 shadow-panel">
          <Button type="button" size="sm" variant={mode === "embed" ? "secondary" : "ghost"} onClick={() => setMode("embed")} className="min-w-0 flex-1 sm:flex-none">Embed</Button>
          <Button type="button" size="sm" variant={mode === "container" ? "secondary" : "ghost"} onClick={() => setMode("container")} className="min-w-0 flex-1 sm:flex-none">Container</Button>
        </div>
        <Button
          type="button"
          size="sm"
          className="gap-1.5 bg-foreground font-bold text-background hover:opacity-90 shadow-panel"
          onClick={() => copyToClipboard(shownCode, mode === "embed" ? "Embed code" : "Container code")}
        >
          <Copy className="size-3.5" /> Copy {mode === "embed" ? "Embed" : "Container"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1.5 shadow-panel"
          onClick={() => copyToClipboard(`,createembed ${shownCode}`, "Command")}
        >
          <Clipboard className="size-3.5" /> Copy ,createembed
        </Button>
      </div>
      <Button type="button" size="sm" variant="outline" onClick={clearAll}><RotateCcw /> <span className="sr-only sm:not-sr-only">Clear builder</span></Button>
    </div>

    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(26rem,.95fr)]">
      <div className="grid min-w-0 gap-4">
        <EditorSection title="Message" count={`${message.length} / 2000`}>
          <TextArea label="Content above the rich message" value={message} maxLength={2000} rows={4} onFocus={() => setActiveTarget("message")} onChange={setMessage} placeholder="Optional message content" />
        </EditorSection>

        {mode === "embed" ? <EmbedEditor embed={embed} updateEmbed={updateEmbed} activeTarget={activeTarget} setActiveTarget={setActiveTarget} freshId={freshId} moveItem={moveItem} /> : <ContainerEditor color={containerColor} setColor={setContainerColor} blocks={blocks} setBlocks={setBlocks} freshId={freshId} moveItem={moveItem} />}

        <EditorSection title="Buttons" count={`${buttons.length} / 5`}>
          <div className="grid gap-3">{buttons.map((button, index) => <div key={button.id} className="grid grid-cols-[minmax(0,.65fr)_minmax(0,1fr)_auto] gap-2">
            <input aria-label={`Button ${index + 1} label`} value={button.label} onChange={(event) => setButtons((items) => items.map((item) => item.id === button.id ? { ...item, label: event.target.value } : item))} placeholder="Label" className={`${inputClass} h-10`} />
            <input aria-label={`Button ${index + 1} URL`} value={button.url} onChange={(event) => setButtons((items) => items.map((item) => item.id === button.id ? { ...item, url: event.target.value } : item))} placeholder="https://" className={`${inputClass} h-10`} />
            <IconButton label="Remove button" onClick={() => setButtons((items) => items.filter((item) => item.id !== button.id))}><Trash2 /></IconButton>
          </div>)}</div>
          <Button type="button" size="sm" variant="outline" disabled={buttons.length >= 5} onClick={() => setButtons((items) => [...items, { id: freshId(), label: "Visit Adore website", url: "https://adore.rest" }])} className="mt-3"><Plus /> Add button</Button>
        </EditorSection>

        <details className={panelClass}><summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-xs font-bold"><ChevronRight className="size-4 [[open]>&]:rotate-90" />Send to a webhook<span className="ml-auto font-normal text-muted-foreground">optional</span></summary><div className="border-t border-border p-4"><Field label="Webhook URL" value={webhook} onChange={setWebhook} placeholder="https://discord.com/api/webhooks/..." /><p className="mt-2 text-[10px] leading-4 text-muted-foreground">Saved only in this browser session. This preview does not send the message.</p></div></details>
      </div>

      <aside className="grid min-w-0 gap-4 xl:sticky xl:top-28">
        <Preview
          mode={mode}
          message={message}
          embed={embed}
          blocks={blocks}
          buttons={buttons}
          color={containerColor}
          onCopy={() => copyToClipboard(shownCode, mode === "embed" ? "Embed code" : "Container code")}
        />
        <section className={`${panelClass} p-4 sm:p-5`}>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <h2 className="truncate font-display text-sm font-bold">Adore Code</h2>
              <p className="mt-1 text-[9px] uppercase text-muted-foreground">{mode} format</p>
            </div>
            <div className="flex flex-wrap shrink-0 gap-2">
              <Button type="button" size="sm" className="gap-1.5 bg-foreground font-bold text-background hover:opacity-90" onClick={() => copyToClipboard(shownCode, mode === "embed" ? "Embed code" : "Container code")}>
                <Copy className="size-3.5" /> Copy Embed
              </Button>
              <Button type="button" size="sm" variant="outline" className="gap-1.5" onClick={() => copyToClipboard(`,createembed ${shownCode}`, "Command")}>
                <Clipboard className="size-3.5" /> Copy ,createembed
              </Button>
              <Button type="button" size="sm" variant="secondary" className="gap-1.5" onClick={loadCode}>
                <Code2 className="size-3.5" /> Load
              </Button>
            </div>
          </div>
          <textarea
            aria-label="Generated message code"
            value={shownCode}
            onChange={(event) => { setCodeDraft(event.target.value); setCodeDirty(true); }}
            rows={10}
            spellCheck={false}
            className={`${inputClass} mt-4 w-full resize-y p-3 font-mono text-xs leading-5`}
          />
          <p className="mt-3 text-[10px] leading-5 text-muted-foreground">
            Paste into <code className="text-foreground">,createembed</code>. Works directly with Adore&apos;s embed parser.
          </p>
        </section>
        <VariableBrowser search={variableSearch} setSearch={setVariableSearch} insert={insertVariable} activeTarget={activeTarget} />
      </aside>
    </div>
    {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-nav px-4 py-2 text-xs shadow-nav"><Check className="size-3.5" />{notice}</div>}
  </div>;
}

function EmbedEditor({ embed, updateEmbed, setActiveTarget, freshId, moveItem }: { embed: EmbedState; updateEmbed: <K extends keyof EmbedState>(key: K, value: EmbedState[K]) => void; activeTarget: string; setActiveTarget: (value: "message" | "title" | "description" | "footer") => void; freshId: () => number; moveItem: <T>(items: T[], index: number, direction: -1 | 1) => T[] }) {
  return <EditorSection title="Embed">
    <div className="grid gap-4">
      <Field label="Title" value={embed.title} maxLength={256} onFocus={() => setActiveTarget("title")} onChange={(value) => updateEmbed("title", value)} />
      <TextArea label="Description" value={embed.description} maxLength={4096} rows={7} onFocus={() => setActiveTarget("description")} onChange={(value) => updateEmbed("description", value)} />
      <ColorField label="Accent colour" value={embed.color} onChange={(value) => updateEmbed("color", value)} />
      <FieldGrid title="Author"><Field label="Name" value={embed.authorName} onChange={(value) => updateEmbed("authorName", value)} /><Field label="Icon URL" value={embed.authorIcon} onChange={(value) => updateEmbed("authorIcon", value)} placeholder="https://" /><Field label="Link URL" value={embed.authorUrl} onChange={(value) => updateEmbed("authorUrl", value)} placeholder="https://" wide /></FieldGrid>
      <FieldGrid title="Media"><Field label="Thumbnail URL" value={embed.thumbnail} onChange={(value) => updateEmbed("thumbnail", value)} placeholder="https://" /><Field label="Image URL" value={embed.image} onChange={(value) => updateEmbed("image", value)} placeholder="https://" /></FieldGrid>
      <FieldGrid title="Footer"><Field label="Text" value={embed.footer} onFocus={() => setActiveTarget("footer")} onChange={(value) => updateEmbed("footer", value)} /><Field label="Icon URL" value={embed.footerIcon} onChange={(value) => updateEmbed("footerIcon", value)} placeholder="https://" /></FieldGrid>
      <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={embed.timestamp} onChange={(event) => updateEmbed("timestamp", event.target.checked)} className="size-4 accent-current" />Show timestamp</label>
      <div className="border-t border-border pt-4"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center"><h3 className="text-xs font-bold">Fields</h3><span className="text-[10px] text-muted-foreground">{embed.fields.length} / 25</span></div>
        <div className="mt-3 grid gap-3">{embed.fields.map((field, index) => <div key={field.id} className="rounded-md border border-border bg-background p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><div className="grid min-w-0 gap-2"><input aria-label={`Field ${index + 1} name`} value={field.name} onChange={(event) => updateEmbed("fields", embed.fields.map((item) => item.id === field.id ? { ...item, name: event.target.value } : item))} placeholder="Field name" className={`${inputClass} h-9`} /><textarea aria-label={`Field ${index + 1} value`} value={field.value} onChange={(event) => updateEmbed("fields", embed.fields.map((item) => item.id === field.id ? { ...item, value: event.target.value } : item))} placeholder="Field value" rows={2} className={`${inputClass} resize-none p-3`} /></div><MoveControls index={index} total={embed.fields.length} up={() => updateEmbed("fields", moveItem(embed.fields, index, -1))} down={() => updateEmbed("fields", moveItem(embed.fields, index, 1))} remove={() => updateEmbed("fields", embed.fields.filter((item) => item.id !== field.id))} /></div>
          <label className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground"><input type="checkbox" checked={field.inline} onChange={(event) => updateEmbed("fields", embed.fields.map((item) => item.id === field.id ? { ...item, inline: event.target.checked } : item))} />Display inline</label>
        </div>)}</div>
        <Button type="button" size="sm" variant="outline" disabled={embed.fields.length >= 25} onClick={() => updateEmbed("fields", [...embed.fields, { id: freshId(), name: "New field", value: "Field value", inline: false }])} className="mt-3"><Plus /> Add field</Button>
      </div>
    </div>
  </EditorSection>;
}

function ContainerEditor({ color, setColor, blocks, setBlocks, freshId, moveItem }: { color: string; setColor: (value: string) => void; blocks: Block[]; setBlocks: (value: Block[] | ((items: Block[]) => Block[])) => void; freshId: () => number; moveItem: <T>(items: T[], index: number, direction: -1 | 1) => T[] }) {
  function updateBlock(id: number, patch: Partial<Block>) { setBlocks((items) => items.map((item) => item.id === id ? { ...item, ...patch } as Block : item)); }
  function addBlock(type: Block["type"]) { const id = freshId(); const block: Block = type === "text" ? { id, type, text: "New text block" } : type === "section" ? { id, type, text: "Section text", accessory: "thumbnail", url: "", label: "Open" } : type === "separator" ? { id, type } : type === "image" ? { id, type, url: "", description: "" } : { id, type, images: [{ id: freshId(), url: "", description: "" }] }; setBlocks((items) => [...items, block]); }
  return <EditorSection title="Container" count={`${blocks.length} components`}>
    <ColorField label="Accent colour" value={color} onChange={setColor} />
    <div className="mt-5 grid gap-3">{blocks.map((block, index) => <div key={block.id} className="rounded-md border border-border bg-background p-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"><p className="truncate text-[10px] font-bold uppercase text-muted-foreground">{block.type}</p><MoveControls index={index} total={blocks.length} up={() => setBlocks(moveItem(blocks, index, -1))} down={() => setBlocks(moveItem(blocks, index, 1))} remove={() => setBlocks(blocks.filter((item) => item.id !== block.id))} /></div>
      {block.type === "text" && <textarea value={block.text} onChange={(event) => updateBlock(block.id, { text: event.target.value })} rows={4} className={`${inputClass} mt-3 w-full resize-y p-3`} />}
      {block.type === "section" && <div className="mt-3 grid gap-3"><textarea value={block.text} onChange={(event) => updateBlock(block.id, { text: event.target.value })} rows={4} className={`${inputClass} resize-y p-3`} /><label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">Accessory<select value={block.accessory} onChange={(event) => updateBlock(block.id, { accessory: event.target.value as "thumbnail" | "button" })} className={`${inputClass} h-10 normal-case`}><option value="thumbnail">Thumbnail</option><option value="button">Link button</option></select></label><Field label={block.accessory === "thumbnail" ? "Thumbnail URL" : "Button URL"} value={block.url} onChange={(value) => updateBlock(block.id, { url: value })} placeholder="https://" />{block.accessory === "button" && <Field label="Button label" value={block.label} onChange={(value) => updateBlock(block.id, { label: value })} />}</div>}
      {block.type === "separator" && <div className="my-5 border-t border-border" />}
      {block.type === "image" && <div className="mt-3 grid gap-3"><Field label="Image URL" value={block.url} onChange={(value) => updateBlock(block.id, { url: value })} placeholder="https://" /><Field label="Description" value={block.description} onChange={(value) => updateBlock(block.id, { description: value })} /></div>}
      {block.type === "gallery" && <div className="mt-3 grid gap-2">{block.images.map((image, imageIndex) => <div key={image.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"><div className="grid min-w-0 gap-2"><input aria-label={`Gallery image ${imageIndex + 1} URL`} value={image.url} onChange={(event) => updateBlock(block.id, { images: block.images.map((item) => item.id === image.id ? { ...item, url: event.target.value } : item) })} placeholder="Image URL" className={`${inputClass} h-9`} /><input aria-label={`Gallery image ${imageIndex + 1} description`} value={image.description} onChange={(event) => updateBlock(block.id, { images: block.images.map((item) => item.id === image.id ? { ...item, description: event.target.value } : item) })} placeholder="Description" className={`${inputClass} h-9`} /></div><IconButton label="Remove gallery image" onClick={() => updateBlock(block.id, { images: block.images.filter((item) => item.id !== image.id) })}><X /></IconButton></div>)}<Button type="button" size="sm" variant="outline" onClick={() => updateBlock(block.id, { images: [...block.images, { id: freshId(), url: "", description: "" }] })}><Plus /> Add image</Button></div>}
    </div>)}</div>
    {blocks.length === 0 && <p className="mt-4 rounded-md border border-dashed border-border p-5 text-center text-xs text-muted-foreground">Add a component to begin your container.</p>}
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5"><AddBlock icon={<Type />} label="Text" onClick={() => addBlock("text")} /><AddBlock icon={<Link2 />} label="Section" onClick={() => addBlock("section")} /><AddBlock icon={<SeparatorHorizontal />} label="Separator" onClick={() => addBlock("separator")} /><AddBlock icon={<ImageIcon />} label="Image" onClick={() => addBlock("image")} /><AddBlock icon={<ImageIcon />} label="Gallery" onClick={() => addBlock("gallery")} /></div>
  </EditorSection>;
}

function Preview({
  mode,
  message,
  embed,
  blocks,
  buttons,
  color,
  onCopy,
}: {
  mode: Mode;
  message: string;
  embed: EmbedState;
  blocks: Block[];
  buttons: MessageButton[];
  color: string;
  onCopy?: () => void;
}) {
  const hasContent = message || (mode === "embed" ? embed.title || embed.description : blocks.length);
  return (
    <section className={`${panelClass} p-4 sm:p-5`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="truncate font-display text-sm font-bold">Discord preview</h2>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase text-emerald-500">Live</span>
        </div>
        {onCopy && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={onCopy}
            className="h-8 gap-1.5 px-3 text-xs font-semibold transition-colors hover:bg-foreground hover:text-background"
          >
            <Copy className="size-3.5" /> Copy {mode === "embed" ? "Embed" : "Container"}
          </Button>
        )}
      </div>
      <div className="mt-6 flex items-start gap-3">
        <img
          src={ADORE_AVATAR}
          alt="Adore Bot"
          onError={(e) => {
            e.currentTarget.src = "/adore-profile.png";
          }}
          className="size-10 shrink-0 rounded-full border border-border object-cover shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs">
            <strong>adore</strong> <span className="rounded-sm bg-discord px-1 py-0.5 text-[9px] font-medium text-white">APP</span> <span className="text-muted-foreground">Today at 10:53 AM</span>
          </p>
          {!hasContent && <p className="mt-2 text-xs italic text-muted-foreground">Nothing here yet. Your message appears as you build it.</p>}
          {message && <DiscordMarkdown value={message} className="mt-2 text-xs" />}
          {mode === "embed" && (embed.title || embed.description) && <EmbedPreview embed={embed} />}
          {mode === "container" && blocks.length > 0 && <ContainerPreview blocks={blocks} color={color} />}
          {buttons.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {buttons.map((button) => (
                <a
                  key={button.id}
                  href={button.url || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-elevated px-3 text-[10px] font-bold hover:bg-secondary"
                >
                  {button.label || "Button"}<Link2 className="size-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EmbedPreview({ embed }: { embed: EmbedState }) {
  return <article className="relative mt-2 overflow-hidden rounded-sm bg-preview p-4 pl-5" style={{ borderLeft: `4px solid ${embed.color}` }}>
    {embed.authorName && <div className="mb-2 flex items-center gap-2">{embed.authorIcon && <img src={embed.authorIcon} alt="" className="size-5 rounded-full object-cover" />}<span className="text-[10px] font-bold">{renderVariables(embed.authorName)}</span></div>}
    {embed.thumbnail && <img src={embed.thumbnail} alt="Embed thumbnail" className="ml-3 size-16 float-right rounded-sm object-cover sm:size-20" />}
    {embed.title && <DiscordMarkdown value={embed.title} className="text-sm font-bold" />}
    {embed.description && <DiscordMarkdown value={embed.description} className="mt-2 text-xs text-muted-foreground" />}
    {embed.fields.length > 0 && <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{embed.fields.map((field) => <div key={field.id} className={field.inline ? "min-w-0" : "min-w-0 sm:col-span-2"}><DiscordMarkdown value={field.name} className="text-[10px] font-bold" /><DiscordMarkdown value={field.value} className="mt-1 text-[10px] text-muted-foreground" /></div>)}</div>}
    {embed.image && <img src={embed.image} alt="Embed attachment" className="mt-4 max-h-72 w-full rounded-sm object-cover" />}
    {(embed.footer || embed.timestamp) && <div className="mt-4 flex items-center gap-2 text-[9px] text-muted-foreground">{embed.footerIcon && <img src={embed.footerIcon} alt="" className="size-4 rounded-full object-cover" />}<span>{renderVariables(embed.footer)}{embed.footer && embed.timestamp ? " • " : ""}{embed.timestamp ? "Today at 10:53 AM" : ""}</span></div>}
  </article>;
}

function ContainerPreview({ blocks, color }: { blocks: Block[]; color: string }) {
  return <article className="mt-2 overflow-hidden rounded-sm bg-preview p-4" style={{ borderLeft: `4px solid ${color}` }}><div className="grid gap-3">{blocks.map((block) => {
    if (block.type === "text") return <DiscordMarkdown key={block.id} value={block.text} className="text-xs" />;
    if (block.type === "separator") return <div key={block.id} className="border-t border-border" />;
    if (block.type === "image") return block.url ? <img key={block.id} src={block.url} alt={block.description || "Container image"} className="max-h-72 w-full rounded-sm object-cover" /> : <MediaPlaceholder key={block.id} label="Image" />;
    if (block.type === "gallery") return <div key={block.id} className="grid grid-cols-2 gap-1.5">{block.images.map((image) => image.url ? <img key={image.id} src={image.url} alt={image.description || "Gallery image"} className="aspect-video w-full rounded-sm object-cover" /> : <MediaPlaceholder key={image.id} label="Gallery image" />)}</div>;
    return <div key={block.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><DiscordMarkdown value={block.text} className="text-xs" />{block.accessory === "thumbnail" ? block.url ? <img src={block.url} alt="Section thumbnail" className="size-16 shrink-0 rounded-sm object-cover" /> : <MediaPlaceholder label="Thumbnail" compact /> : <a href={block.url || undefined} className="shrink-0 rounded-sm border border-border bg-elevated px-3 py-2 text-[10px] font-bold">{block.label || "Open"}</a>}</div>;
  })}</div></article>;
}

function VariableBrowser({ search, setSearch, insert, activeTarget }: { search: string; setSearch: (value: string) => void; insert: (value: string) => void; activeTarget: string }) {
  const groups = Object.entries(variableGroups).map(([name, variables]) => [name, variables.filter((variable) => variable.toLowerCase().includes(search.toLowerCase()))] as const).filter(([, variables]) => variables.length);
  return <section className={`${panelClass} p-4 sm:p-5`}><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><div className="min-w-0"><h2 className="truncate font-display text-sm font-bold">Variables</h2><p className="mt-1 text-[9px] text-muted-foreground">Insert into {activeTarget}</p></div><input aria-label="Search variables" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className={`${inputClass} h-9 w-28 sm:w-40`} /></div><div className="mt-4 grid gap-2">{groups.map(([name, variables], index) => <details key={name} open={index === 0}><summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center py-2 text-[10px] font-bold uppercase"><span className="truncate">{name}</span><span className="text-muted-foreground">{variables.length}</span></summary><div className="flex flex-wrap gap-1.5 pb-3">{variables.map((variable) => <Button key={variable} type="button" size="sm" variant="secondary" onClick={() => insert(variable)} className="h-7 px-2 font-mono text-[9px]">{variable}</Button>)}</div></details>)}</div></section>;
}

function EditorSection({ title, count, children }: { title: string; count?: string; children: React.ReactNode }) { return <section className={`${panelClass} p-4 sm:p-5`}><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h2 className="truncate font-display text-sm font-bold">{title}</h2>{count && <span className="shrink-0 text-[9px] text-muted-foreground">{count}</span>}</div><div className="mt-4">{children}</div></section>; }
function FieldGrid({ title, children }: { title: string; children: React.ReactNode }) { return <fieldset className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2"><legend className="mb-3 text-[10px] font-bold uppercase text-muted-foreground">{title}</legend>{children}</fieldset>; }
function Field({ label, value, onChange, placeholder, maxLength, onFocus, wide }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; maxLength?: number; onFocus?: () => void; wide?: boolean }) { return <label className={`grid min-w-0 gap-1.5 text-[10px] uppercase text-muted-foreground ${wide ? "sm:col-span-2" : ""}`}>{label}<input value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} placeholder={placeholder} maxLength={maxLength} className={`${inputClass} h-10 normal-case`} /></label>; }
function TextArea({ label, value, onChange, placeholder, maxLength, rows, onFocus }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; maxLength?: number; rows: number; onFocus?: () => void }) { return <label className="grid min-w-0 gap-1.5 text-[10px] uppercase text-muted-foreground">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} onFocus={onFocus} placeholder={placeholder} maxLength={maxLength} rows={rows} className={`${inputClass} resize-y p-3 normal-case leading-5`} /></label>; }
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">{label}<span className="grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2"><input value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} h-10 normal-case`} /><span className="relative grid size-10 cursor-pointer place-items-center rounded-md border border-border bg-background shadow-panel"><span className="size-5 rounded-sm border border-border" style={{ backgroundColor: value }} /><input type="color" aria-label={`${label} picker`} value={value} onChange={(event) => onChange(event.target.value)} className="absolute inset-0 cursor-pointer opacity-0" /></span></span></label>; }
function IconButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) { return <Button type="button" size="icon" variant="ghost" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="size-8">{children}</Button>; }
function MoveControls({ index, total, up, down, remove }: { index: number; total: number; up: () => void; down: () => void; remove: () => void }) { return <div className="flex shrink-0 items-center"><IconButton label="Move up" disabled={index === 0} onClick={up}><ArrowUp /></IconButton><IconButton label="Move down" disabled={index === total - 1} onClick={down}><ArrowDown /></IconButton><IconButton label="Remove" onClick={remove}><Trash2 /></IconButton></div>; }
function AddBlock({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) { return <Button type="button" size="sm" variant="outline" onClick={onClick} className="min-w-0 px-2">{icon}<span className="truncate">{label}</span></Button>; }
function MediaPlaceholder({ label, compact }: { label: string; compact?: boolean }) { return <div className={`grid shrink-0 place-items-center rounded-sm border border-dashed border-border text-[9px] text-muted-foreground ${compact ? "size-16" : "aspect-video w-full"}`}>{label}</div>; }
