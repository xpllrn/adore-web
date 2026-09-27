import type { ReactNode } from "react";
import { Copy, Link2 } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { ADORE_AVATAR } from "./site-chrome";
import { Button } from "@/components/ui/button";
import type { Block, EmbedField, EmbedState, MessageButton, Mode } from "@/types/embed";
import { initialEmbed } from "@/types/embed";

export const panelClass = "rounded-md border border-border bg-surface shadow-panel";

import { renderVariables, sampleVariables, variableGroups } from "@/lib/discord-variables";

export { renderVariables, sampleVariables, variableGroups } from "@/lib/discord-variables";

export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-1 mt-2 text-lg font-bold leading-tight first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-1 mt-2 text-base font-bold leading-tight first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1 mt-2 text-sm font-bold leading-tight first:mt-0">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="min-w-0 whitespace-pre-wrap break-words leading-5">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-1 border-l-[3px] border-strong pl-3 text-foreground">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="text-muted-foreground">{children}</del>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-discord underline underline-offset-2"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-background px-1 py-0.5 font-mono text-[.9em] text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-2 max-w-full overflow-x-auto rounded-sm bg-background p-3 font-mono text-[10px] leading-4">
      {children}
    </pre>
  ),
  ul: ({ children }) => <ul className="my-1 list-disc space-y-0.5 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="my-1 list-decimal space-y-0.5 pl-5">{children}</ol>,
  hr: () => <hr className="my-2 border-border" />,
};

export function DiscordMarkdown({ value, className = "" }: { value: string; className?: string }) {
  const rendered = renderVariables(value);
  const parts = rendered.split(/<(a)?:([A-Za-z0-9_~-]+):(\d+)>/);

  if (parts.length === 1) {
    return (
      <div className={`discord-markdown min-w-0 break-words ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
          {rendered}
        </ReactMarkdown>
      </div>
    );
  }

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 4) {
    const text = parts[i];
    if (text) {
      nodes.push(
        <ReactMarkdown
          key={`text-${i}`}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={markdownComponents}
        >
          {text}
        </ReactMarkdown>,
      );
    }
    if (i + 3 < parts.length) {
      const isAnimated = parts[i + 1] === "a";
      const name = parts[i + 2] ?? "";
      const id = parts[i + 3] ?? "";
      const ext = isAnimated ? "gif" : "png";
      nodes.push(
        <img
          key={`emote-${i}`}
          src={`https://cdn.discordapp.com/emojis/${id}.${ext}`}
          alt={name}
          className="inline-block size-[1.15em] align-[-0.2em] object-contain"
          style={{ width: "1.15em", height: "1.15em", verticalAlign: "-0.2em" }}
        />,
      );
    }
  }

  return (
    <div className={`discord-markdown min-w-0 break-words [&>p]:inline ${className}`}>
      {nodes}
    </div>
  );
}

export function MediaPlaceholder({ label, compact }: { label: string; compact?: boolean }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-sm border border-dashed border-border text-[9px] text-muted-foreground ${
        compact ? "size-16" : "aspect-video w-full"
      }`}
    >
      {label}
    </div>
  );
}

export function EmbedPreview({ embed }: { embed: EmbedState }) {
  return (
    <article
      className="relative mt-2 overflow-hidden rounded-sm bg-preview p-4 pl-5"
      style={{ borderLeft: `4px solid ${embed.color}` }}
    >
      {embed.authorName && (
        <div className="mb-2 flex items-center gap-2">
          {embed.authorIcon && (
            <img src={embed.authorIcon} alt="" className="size-5 rounded-full object-cover" />
          )}
          <span className="text-[10px] font-bold">{renderVariables(embed.authorName)}</span>
        </div>
      )}
      {embed.thumbnail && (
        <img
          src={embed.thumbnail}
          alt="Embed thumbnail"
          className="ml-3 size-16 float-right rounded-sm object-cover sm:size-20"
        />
      )}
      {embed.title && <DiscordMarkdown value={embed.title} className="text-sm font-bold" />}
      {embed.description && (
        <DiscordMarkdown value={embed.description} className="mt-2 text-xs text-muted-foreground" />
      )}
      {embed.fields.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {embed.fields.map((field) => (
            <div key={field.id} className={field.inline ? "min-w-0" : "min-w-0 sm:col-span-2"}>
              <DiscordMarkdown value={field.name} className="text-[10px] font-bold" />
              <DiscordMarkdown
                value={field.value}
                className="mt-1 text-[10px] text-muted-foreground"
              />
            </div>
          ))}
        </div>
      )}
      {embed.image && (
        <img
          src={embed.image}
          alt="Embed attachment"
          className="mt-4 max-h-72 w-full rounded-sm object-cover"
        />
      )}
      {(embed.footer || embed.timestamp) && (
        <div className="mt-4 flex items-center gap-2 text-[9px] text-muted-foreground">
          {embed.footerIcon && (
            <img src={embed.footerIcon} alt="" className="size-4 rounded-full object-cover" />
          )}
          <span>
            {renderVariables(embed.footer)}
            {embed.footer && embed.timestamp ? " • " : ""}
            {embed.timestamp ? "Today at 10:53 AM" : ""}
          </span>
        </div>
      )}
    </article>
  );
}

export function ContainerPreview({ blocks, color }: { blocks: Block[]; color: string }) {
  return (
    <article
      className="mt-2 overflow-hidden rounded-sm bg-preview p-4"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="grid gap-3">
        {blocks.map((block) => {
          if (block.type === "text")
            return <DiscordMarkdown key={block.id} value={block.text} className="text-xs" />;
          if (block.type === "separator")
            return <div key={block.id} className="border-t border-border" />;
          if (block.type === "image") {
            return block.url ? (
              <img
                key={block.id}
                src={block.url}
                alt={block.description || "Container image"}
                className="max-h-72 w-full rounded-sm object-cover"
              />
            ) : (
              <MediaPlaceholder key={block.id} label="Image" />
            );
          }
          if (block.type === "gallery") {
            return (
              <div key={block.id} className="grid grid-cols-2 gap-1.5">
                {block.images.map((image) =>
                  image.url ? (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.description || "Gallery image"}
                      className="aspect-video w-full rounded-sm object-cover"
                    />
                  ) : (
                    <MediaPlaceholder key={image.id} label="Gallery image" />
                  ),
                )}
              </div>
            );
          }
          return (
            <div key={block.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <DiscordMarkdown value={block.text} className="text-xs" />
              {block.accessory === "thumbnail" ? (
                block.url ? (
                  <img
                    src={block.url}
                    alt="Section thumbnail"
                    className="size-16 shrink-0 rounded-sm object-cover"
                  />
                ) : (
                  <MediaPlaceholder label="Thumbnail" compact />
                )
              ) : (
                <a
                  href={block.url || undefined}
                  className="shrink-0 rounded-sm border border-border bg-elevated px-3 py-2 text-[10px] font-bold"
                >
                  {block.label || "Open"}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export interface DiscordMessagePreviewProps {
  mode?: Mode;
  message?: string;
  embed?: EmbedState;
  blocks?: Block[];
  buttons?: MessageButton[];
  color?: string;
  onCopy?: () => void;
  showHeader?: boolean;
}

export function Preview({
  mode = "embed",
  message = "",
  embed = initialEmbed,
  blocks = [],
  buttons = [],
  color = "#8b8d92",
  onCopy,
  showHeader = true,
}: DiscordMessagePreviewProps) {
  const hasContent =
    message || (mode === "embed" ? embed.title || embed.description : blocks.length);
  return (
    <section className={`${panelClass} p-4 sm:p-5`}>
      {showHeader && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-display text-sm font-bold">Discord preview</h2>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase text-emerald-500">
              Live
            </span>
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
      )}
      <div className={`${showHeader ? "mt-6 " : ""}flex items-start gap-3`}>
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
            <strong>adore</strong>{" "}
            <span className="rounded-sm bg-discord px-1 py-0.5 text-[9px] font-medium text-white">
              APP
            </span>{" "}
            <span className="text-muted-foreground">Today at 10:53 AM</span>
          </p>
          {!hasContent && (
            <p className="mt-2 text-xs italic text-muted-foreground">
              Nothing here yet. Your message appears as you build it.
            </p>
          )}
          {message && <DiscordMarkdown value={message} className="mt-2 text-xs" />}
          {mode === "embed" && (embed.title || embed.description) && <EmbedPreview embed={embed} />}
          {mode === "container" && blocks.length > 0 && (
            <ContainerPreview blocks={blocks} color={color} />
          )}
          {buttons.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {buttons.map((button) => {
                const styleClasses =
                  button.style === "success"
                    ? "bg-[#248046] hover:bg-[#1a6334] text-white border-transparent"
                    : button.style === "danger"
                      ? "bg-[#DA373C] hover:bg-[#a1282c] text-white border-transparent"
                      : button.style === "primary"
                        ? "bg-[#5865F2] hover:bg-[#4752C4] text-white border-transparent"
                        : button.style === "secondary"
                          ? "bg-[#4E5058] hover:bg-[#6D6F78] text-white border-transparent"
                          : "border-border bg-elevated text-foreground hover:bg-secondary";

                return (
                  <a
                    key={button.id}
                    href={button.url || undefined}
                    target={button.url ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`inline-flex h-8 items-center gap-1.5 rounded-sm border px-3 text-[10px] font-bold transition-colors ${styleClasses}`}
                  >
                    {button.emoji && <span>{button.emoji}</span>}
                    <span>{renderVariables(button.label || "Button")}</span>
                    {button.url && <Link2 className="size-3 opacity-70" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function parseButtonsFromNote(note: string): MessageButton[] {
  if (!note || /^none$/i.test(note.trim())) return [];

  const linkMatches = [...note.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  if (linkMatches.length > 0) {
    return linkMatches.map((m, idx) => ({
      id: idx + 1,
      label: m[1]?.trim() || "Button",
      url: m[2]?.trim() || "",
      style: "link",
    }));
  }

  const parts = note.split(/\s*(?:\+|\band\b|,|\|)\s*/i).map((s) => s.trim()).filter(Boolean);
  const buttons: MessageButton[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    if (/(?:timeout|author-only|disabled|args:|buttons disable)/i.test(part)) continue;

    let style: MessageButton["style"] = "secondary";
    if (/green|confirm|success|accept|approve|win|yes|cash out|save|verified/i.test(part)) {
      style = "success";
    } else if (/red|cancel|danger|decline|deny|delete|no\b|reset/i.test(part)) {
      style = "danger";
    } else if (/blurple|blue|primary|view|info|verify|deposit|buy|join/i.test(part)) {
      style = "primary";
    }

    const cleanedLabel = part
      .replace(/\s*\([^)]*\)/g, "")
      .replace(/^[`"']+|[`"']+$/g, "")
      .trim();

    if (cleanedLabel && cleanedLabel.length <= 40) {
      buttons.push({
        id: i + 1,
        label: cleanedLabel,
        style,
      });
    }
  }

  return buttons;
}

export function embedToCv2Blocks(embed: Partial<EmbedState>, buttonsNote?: string): Block[] {
  const blocks: Block[] = [];
  let blockId = 1;

  if (embed.title) {
    blocks.push({
      id: blockId++,
      type: "text",
      text: `### ${embed.title}`,
    });
  }

  if (embed.description) {
    blocks.push({
      id: blockId++,
      type: "text",
      text: embed.description,
    });
  }

  if (embed.fields && embed.fields.length > 0) {
    blocks.push({ id: blockId++, type: "separator" });
    for (const field of embed.fields) {
      blocks.push({
        id: blockId++,
        type: "text",
        text: `**${field.name}**\n${field.value}`,
      });
    }
  }

  if (embed.image) {
    blocks.push({
      id: blockId++,
      type: "image",
      url: embed.image,
      description: "Attachment",
    });
  } else if (embed.thumbnail) {
    blocks.push({
      id: blockId++,
      type: "section",
      text: `**Asset View**`,
      accessory: "thumbnail",
      url: embed.thumbnail,
      label: "Preview",
    });
  }

  if (embed.footer) {
    blocks.push({ id: blockId++, type: "separator" });
    blocks.push({
      id: blockId++,
      type: "text",
      text: `-# ${embed.footer}`,
    });
  }

  return blocks;
}

export const DiscordMessagePreview = Preview;

export type { Block, EmbedField, EmbedState, MessageButton, Mode } from "@/types/embed";
export { initialEmbed } from "@/types/embed";

