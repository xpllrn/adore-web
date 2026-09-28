import {
  ArrowDown,
  ArrowUp,
  CircleAlert,
  Check,
  Code2,
  Copy,
  Images,
  ImageIcon,
  Link2,
  Plus,
  RotateCcw,
  SeparatorHorizontal,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Block, EmbedState, MessageButton, Mode } from "@/types/embed";
import { initialEmbed } from "@/types/embed";
import { buildAdoreCode, parseAdoreCode } from "@/lib/adore-code";
import { copyText } from "@/lib/clipboard";
import { Preview, variableGroups } from "@/components/embed-preview";
import { EmbedFieldsEditor } from "@/components/embed-fields-editor";

type InsertTarget = "message" | "title" | "description" | "footer";

const DEFAULT_COLOR = "#8b8d92";
// "Clear builder" should leave an empty embed, not the sample content from initialEmbed.
const EMPTY_EMBED: EmbedState = { ...initialEmbed, title: "", description: "", footer: "" };

/** `<input type="color">` only accepts #rrggbb; anything else would warn and show black. */
function toColorInputValue(value: string) {
  const hex = value.trim().replace(/^0x/i, "#");
  if (/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const short = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
  return DEFAULT_COLOR;
}

// Re-export core types and extracted utilities for consumers
export type { Block, EmbedField, EmbedState, MessageButton, Mode } from "@/types/embed";
export { initialEmbed } from "@/types/embed";
export { buildAdoreCode, parseAdoreCode } from "@/lib/adore-code";
export {
  ContainerPreview,
  DiscordMarkdown,
  DiscordMessagePreview,
  EmbedPreview,
  Preview,
  renderVariables,
  sampleVariables,
  variableGroups,
} from "@/components/embed-preview";
export { EmbedFieldListEditor, EmbedFieldsEditor } from "@/components/embed-fields-editor";

const inputClass =
  "min-w-0 rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";
const panelClass = "rounded-md border border-border bg-surface shadow-panel";

export function MessageBuilder() {
  const [mode, setMode] = useState<Mode>("embed");
  const [message, setMessage] = useState("");
  const [embed, setEmbed] = useState<EmbedState>(initialEmbed);
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, type: "text", text: "Welcome to **{guild.name}**." },
  ]);
  const [buttons, setButtons] = useState<MessageButton[]>([]);
  const [containerColor, setContainerColor] = useState(DEFAULT_COLOR);
  const [activeTarget, setActiveTarget] = useState<InsertTarget>("description");
  const [variableSearch, setVariableSearch] = useState("");
  const [codeDraft, setCodeDraft] = useState("");
  const [codeDirty, setCodeDirty] = useState(false);
  const [notice, setNotice] = useState<{ text: string; ok: boolean } | null>(null);
  const noticeTimer = useRef<number | undefined>(undefined);
  // A ref (not state) so several ids requested in one event are still unique.
  const nextId = useRef(1000);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  const generatedCode = useMemo(
    () => buildAdoreCode(mode, message, embed, containerColor, blocks, buttons),
    [mode, message, embed, containerColor, blocks, buttons],
  );
  const shownCode = codeDirty ? codeDraft : generatedCode;
  // Container mode hides the embed fields, so variables go into the message content there.
  const insertTarget: InsertTarget = mode === "container" ? "message" : activeTarget;

  function flash(text: string, ok = true) {
    window.clearTimeout(noticeTimer.current);
    setNotice({ text, ok });
    noticeTimer.current = window.setTimeout(() => setNotice(null), 2200);
  }
  function freshId() {
    nextId.current += 1;
    return nextId.current;
  }
  function updateEmbed<K extends keyof EmbedState>(key: K, value: EmbedState[K]) {
    setEmbed((current) => ({ ...current, [key]: value }));
  }
  function clearAll() {
    setMessage("");
    setEmbed(EMPTY_EMBED);
    setBlocks([]);
    setButtons([]);
    setContainerColor(DEFAULT_COLOR);
    setCodeDirty(false);
    flash("Builder cleared");
  }
  function insertVariable(variable: string) {
    if (insertTarget === "message") {
      setMessage((value) => value + variable);
      return;
    }
    setEmbed((current) => ({ ...current, [insertTarget]: current[insertTarget] + variable }));
  }
  function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return items;
    const current = items[index];
    const replacement = items[target];
    if (current === undefined || replacement === undefined) return items;
    const copy = [...items];
    copy[index] = replacement;
    copy[target] = current;
    return copy;
  }

  async function copyToClipboard(text: string, label: string) {
    if (await copyText(text)) flash(`${label} copied to clipboard`);
    else flash("Could not copy to clipboard", false);
  }

  // Loading replaces the whole builder rather than merging into it: the other mode is reset
  // too, so switching modes later can't resurrect content the loaded code never described.
  // Every item is re-keyed so ids from pasted code can't collide with the builder's own.
  function loadCode() {
    const parsed = parseAdoreCode(shownCode);
    if (!parsed) {
      flash("Code could not be parsed", false);
      return;
    }
    setMode(parsed.mode);
    setMessage(parsed.message ?? "");
    if (parsed.mode === "embed") {
      setEmbed({
        ...EMPTY_EMBED,
        ...parsed.embed,
        fields: (parsed.embed?.fields ?? []).map((field) => ({ ...field, id: freshId() })),
      });
      setBlocks([]);
      setContainerColor(DEFAULT_COLOR);
    } else {
      setEmbed(EMPTY_EMBED);
      setContainerColor(parsed.containerColor ?? DEFAULT_COLOR);
      setBlocks(
        (parsed.blocks ?? []).map((block) =>
          block.type === "gallery"
            ? {
                ...block,
                id: freshId(),
                images: block.images.map((image) => ({ ...image, id: freshId() })),
              }
            : { ...block, id: freshId() },
        ),
      );
    }
    setButtons((parsed.buttons ?? []).map((button) => ({ ...button, id: freshId() })));
    setCodeDirty(false);
    flash("Code loaded into builder");
  }

  return (
    <div className="mx-auto max-w-[93.75rem] px-3 pb-20 sm:px-6 sm:pb-28">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-0 items-center gap-1 rounded-md border border-border bg-surface p-1 shadow-panel">
            <Button
              type="button"
              size="sm"
              variant={mode === "embed" ? "secondary" : "ghost"}
              onClick={() => setMode("embed")}
              className="min-w-0 flex-1 sm:flex-none"
            >
              Embed
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mode === "container" ? "secondary" : "ghost"}
              onClick={() => setMode("container")}
              className="min-w-0 flex-1 sm:flex-none"
            >
              Container
            </Button>
          </div>
          <Button
            type="button"
            size="sm"
            className="gap-1.5 bg-foreground font-bold text-background hover:opacity-90 shadow-panel"
            onClick={() =>
              copyToClipboard(shownCode, mode === "embed" ? "Embed code" : "Container code")
            }
          >
            <Copy className="size-3.5" /> Copy {mode === "embed" ? "Embed" : "Container"}
          </Button>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={clearAll}>
          <RotateCcw /> <span className="sr-only sm:not-sr-only">Clear builder</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(26rem,.95fr)]">
        <div className="grid min-w-0 grid-cols-1 gap-4">
          <EditorSection title="Message" count={`${message.length} / 2000`}>
            <TextArea
              label="Content above the rich message"
              value={message}
              maxLength={2000}
              rows={4}
              onFocus={() => setActiveTarget("message")}
              onChange={setMessage}
              placeholder="Optional message content"
            />
          </EditorSection>

          {mode === "embed" ? (
            <EmbedEditor
              embed={embed}
              updateEmbed={updateEmbed}
              setActiveTarget={setActiveTarget}
              freshId={freshId}
            />
          ) : (
            <ContainerEditor
              color={containerColor}
              setColor={setContainerColor}
              blocks={blocks}
              setBlocks={setBlocks}
              freshId={freshId}
              moveItem={moveItem}
            />
          )}

          <EditorSection title="Buttons" count={`${buttons.length} / 5`}>
            <div className="grid gap-3">
              {buttons.map((button, index) => (
                <div
                  key={button.id}
                  className="grid grid-cols-[minmax(0,.65fr)_minmax(0,1fr)_auto] gap-2"
                >
                  <input
                    aria-label={`Button ${index + 1} label`}
                    value={button.label}
                    onChange={(event) =>
                      setButtons((items) =>
                        items.map((item) =>
                          item.id === button.id ? { ...item, label: event.target.value } : item,
                        ),
                      )
                    }
                    placeholder="Label"
                    className={`${inputClass} h-10`}
                  />
                  <input
                    aria-label={`Button ${index + 1} URL`}
                    value={button.url ?? ""}
                    onChange={(event) =>
                      setButtons((items) =>
                        items.map((item) =>
                          item.id === button.id ? { ...item, url: event.target.value } : item,
                        ),
                      )
                    }
                    placeholder="https://"
                    className={`${inputClass} h-10`}
                  />
                  <IconButton
                    label={`Remove button ${index + 1}`}
                    onClick={() =>
                      setButtons((items) => items.filter((item) => item.id !== button.id))
                    }
                  >
                    <Trash2 />
                  </IconButton>
                </div>
              ))}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={buttons.length >= 5}
              onClick={() => {
                // Take the id outside the updater: updaters must stay pure.
                const id = freshId();
                setButtons((items) => [
                  ...items,
                  { id, label: "Visit Adore website", url: "https://adore.rest" },
                ]);
              }}
              className="mt-3"
            >
              <Plus /> Add button
            </Button>
          </EditorSection>
        </div>

        <aside className="grid min-w-0 grid-cols-1 gap-4 lg:sticky lg:top-28">
          <Preview
            mode={mode}
            message={message}
            embed={embed}
            blocks={blocks}
            buttons={buttons}
            color={containerColor}
            onCopy={() =>
              copyToClipboard(shownCode, mode === "embed" ? "Embed code" : "Container code")
            }
          />
          <section className={`${panelClass} p-4 sm:p-5`}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <h2 className="truncate font-display text-sm font-bold">Adore Code</h2>
                <p className="mt-1 text-[0.625rem] uppercase text-muted-foreground">
                  {mode} format{codeDirty ? " · edited" : ""}
                </p>
              </div>
              <div className="flex flex-wrap shrink-0 gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="gap-1.5 bg-foreground font-bold text-background hover:opacity-90"
                  onClick={() =>
                    copyToClipboard(shownCode, mode === "embed" ? "Embed code" : "Container code")
                  }
                >
                  <Copy className="size-3.5" /> Copy {mode === "embed" ? "Embed" : "Container"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="gap-1.5"
                  onClick={loadCode}
                >
                  <Code2 className="size-3.5" /> Load
                </Button>
              </div>
            </div>
            <textarea
              aria-label="Generated message code"
              value={shownCode}
              onChange={(event) => {
                setCodeDraft(event.target.value);
                setCodeDirty(true);
              }}
              rows={10}
              spellCheck={false}
              className={`${inputClass} mt-4 w-full resize-y p-3 font-mono text-xs leading-5`}
            />
            {codeDirty && (
              // Once the code is hand-edited, builder changes stop flowing into it; say so.
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-elevated px-3 py-2 text-xs text-muted-foreground">
                <span>
                  Showing your edited code. Press Load to apply it, or reset to the builder.
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  onClick={() => setCodeDirty(false)}
                >
                  <RotateCcw className="size-3.5" /> Reset
                </Button>
              </div>
            )}
            <p className="mt-3 text-[0.625rem] leading-5 text-muted-foreground">
              Paste into <code className="text-foreground">,createembed</code>. Works directly with
              Adore&apos;s embed parser.
            </p>
          </section>
          <VariableBrowser
            search={variableSearch}
            setSearch={setVariableSearch}
            insert={insertVariable}
            activeTarget={insertTarget}
          />
        </aside>
      </div>
      {notice && (
        <div
          role={notice.ok ? "status" : "alert"}
          className="fixed bottom-5 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-nav px-4 py-2 text-xs shadow-nav"
        >
          {notice.ok ? (
            <Check className="size-3.5 shrink-0 text-success" />
          ) : (
            <CircleAlert className="size-3.5 shrink-0 text-destructive" />
          )}
          {notice.text}
        </div>
      )}
    </div>
  );
}

function EmbedEditor({
  embed,
  updateEmbed,
  setActiveTarget,
  freshId,
}: {
  embed: EmbedState;
  updateEmbed: <K extends keyof EmbedState>(key: K, value: EmbedState[K]) => void;
  setActiveTarget: (value: "message" | "title" | "description" | "footer") => void;
  freshId: () => number;
}) {
  return (
    <EditorSection title="Embed">
      <div className="grid gap-4">
        <Field
          label="Title"
          value={embed.title}
          maxLength={256}
          onFocus={() => setActiveTarget("title")}
          onChange={(value) => updateEmbed("title", value)}
        />
        <TextArea
          label="Description"
          value={embed.description}
          maxLength={4096}
          rows={7}
          onFocus={() => setActiveTarget("description")}
          onChange={(value) => updateEmbed("description", value)}
        />
        <ColorField
          label="Accent colour"
          value={embed.color}
          onChange={(value) => updateEmbed("color", value)}
        />
        <FieldGrid title="Author">
          <Field
            label="Name"
            value={embed.authorName}
            onChange={(value) => updateEmbed("authorName", value)}
          />
          <Field
            label="Icon URL"
            value={embed.authorIcon}
            onChange={(value) => updateEmbed("authorIcon", value)}
            placeholder="https://"
          />
          <Field
            label="Link URL"
            value={embed.authorUrl}
            onChange={(value) => updateEmbed("authorUrl", value)}
            placeholder="https://"
            wide
          />
        </FieldGrid>
        <FieldGrid title="Media">
          <Field
            label="Thumbnail URL"
            value={embed.thumbnail}
            onChange={(value) => updateEmbed("thumbnail", value)}
            placeholder="https://"
          />
          <Field
            label="Image URL"
            value={embed.image}
            onChange={(value) => updateEmbed("image", value)}
            placeholder="https://"
          />
        </FieldGrid>
        <FieldGrid title="Footer">
          <Field
            label="Text"
            value={embed.footer}
            onFocus={() => setActiveTarget("footer")}
            onChange={(value) => updateEmbed("footer", value)}
          />
          <Field
            label="Icon URL"
            value={embed.footerIcon}
            onChange={(value) => updateEmbed("footerIcon", value)}
            placeholder="https://"
          />
        </FieldGrid>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={embed.timestamp}
            onChange={(event) => updateEmbed("timestamp", event.target.checked)}
            className="size-4 accent-current"
          />
          Show timestamp
        </label>
        <EmbedFieldsEditor
          fields={embed.fields}
          onChange={(fields) => updateEmbed("fields", fields)}
          createFieldId={freshId}
        />
      </div>
    </EditorSection>
  );
}

function ContainerEditor({
  color,
  setColor,
  blocks,
  setBlocks,
  freshId,
  moveItem,
}: {
  color: string;
  setColor: (value: string) => void;
  blocks: Block[];
  setBlocks: (value: Block[] | ((items: Block[]) => Block[])) => void;
  freshId: () => number;
  moveItem: <T>(items: T[], index: number, direction: -1 | 1) => T[];
}) {
  function updateBlock(id: number, patch: Partial<Block>) {
    setBlocks((items) =>
      items.map((item) => (item.id === id ? ({ ...item, ...patch } as Block) : item)),
    );
  }
  function addBlock(type: Block["type"]) {
    const id = freshId();
    const block: Block =
      type === "text"
        ? { id, type, text: "New text block" }
        : type === "section"
          ? { id, type, text: "Section text", accessory: "thumbnail", url: "", label: "Open" }
          : type === "separator"
            ? { id, type }
            : type === "image"
              ? { id, type, url: "", description: "" }
              : { id, type, images: [{ id: freshId(), url: "", description: "" }] };
    setBlocks((items) => [...items, block]);
  }
  return (
    <EditorSection
      title="Container"
      count={`${blocks.length} ${blocks.length === 1 ? "component" : "components"}`}
    >
      <ColorField label="Accent colour" value={color} onChange={setColor} />
      <div className="mt-5 grid gap-3">
        {blocks.map((block, index) => (
          <div key={block.id} className="rounded-md border border-border bg-background p-3">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <p className="truncate text-[0.625rem] font-bold uppercase text-muted-foreground">
                {block.type}
              </p>
              <MoveControls
                index={index}
                total={blocks.length}
                up={() => setBlocks(moveItem(blocks, index, -1))}
                down={() => setBlocks(moveItem(blocks, index, 1))}
                remove={() => setBlocks(blocks.filter((item) => item.id !== block.id))}
              />
            </div>
            {block.type === "text" && (
              <textarea
                aria-label={`Text component ${index + 1}`}
                value={block.text}
                onChange={(event) => updateBlock(block.id, { text: event.target.value })}
                rows={4}
                className={`${inputClass} mt-3 w-full resize-y p-3`}
              />
            )}
            {block.type === "section" && (
              <div className="mt-3 grid gap-3">
                <textarea
                  aria-label={`Section component ${index + 1} text`}
                  value={block.text}
                  onChange={(event) => updateBlock(block.id, { text: event.target.value })}
                  rows={4}
                  className={`${inputClass} resize-y p-3`}
                />
                <label className="grid gap-1.5 text-[0.625rem] uppercase text-muted-foreground">
                  Accessory
                  <select
                    value={block.accessory}
                    onChange={(event) =>
                      updateBlock(block.id, {
                        accessory: event.target.value as "thumbnail" | "button",
                      })
                    }
                    className={`${inputClass} h-10 normal-case`}
                  >
                    <option value="thumbnail">Thumbnail</option>
                    <option value="button">Link button</option>
                  </select>
                </label>
                <Field
                  label={block.accessory === "thumbnail" ? "Thumbnail URL" : "Button URL"}
                  value={block.url}
                  onChange={(value) => updateBlock(block.id, { url: value })}
                  placeholder="https://"
                />
                {block.accessory === "button" && (
                  <Field
                    label="Button label"
                    value={block.label}
                    onChange={(value) => updateBlock(block.id, { label: value })}
                  />
                )}
              </div>
            )}
            {block.type === "separator" && <div className="my-5 border-t border-border" />}
            {block.type === "image" && (
              <div className="mt-3 grid gap-3">
                <Field
                  label="Image URL"
                  value={block.url}
                  onChange={(value) => updateBlock(block.id, { url: value })}
                  placeholder="https://"
                />
                <Field
                  label="Description"
                  value={block.description}
                  onChange={(value) => updateBlock(block.id, { description: value })}
                />
              </div>
            )}
            {block.type === "gallery" && (
              <div className="mt-3 grid gap-2">
                {block.images.map((image, imageIndex) => (
                  <div key={image.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                    <div className="grid min-w-0 gap-2">
                      <input
                        aria-label={`Gallery image ${imageIndex + 1} URL`}
                        value={image.url}
                        onChange={(event) =>
                          updateBlock(block.id, {
                            images: block.images.map((item) =>
                              item.id === image.id ? { ...item, url: event.target.value } : item,
                            ),
                          })
                        }
                        placeholder="Image URL"
                        className={`${inputClass} h-9`}
                      />
                      <input
                        aria-label={`Gallery image ${imageIndex + 1} description`}
                        value={image.description}
                        onChange={(event) =>
                          updateBlock(block.id, {
                            images: block.images.map((item) =>
                              item.id === image.id
                                ? { ...item, description: event.target.value }
                                : item,
                            ),
                          })
                        }
                        placeholder="Description"
                        className={`${inputClass} h-9`}
                      />
                    </div>
                    <IconButton
                      label={`Remove gallery image ${imageIndex + 1}`}
                      onClick={() =>
                        updateBlock(block.id, {
                          images: block.images.filter((item) => item.id !== image.id),
                        })
                      }
                    >
                      <X />
                    </IconButton>
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const id = freshId();
                    updateBlock(block.id, {
                      images: [...block.images, { id, url: "", description: "" }],
                    });
                  }}
                >
                  <Plus /> Add image
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {blocks.length === 0 && (
        <p className="mt-4 rounded-md border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
          Add a component to begin your container.
        </p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2 @sm:grid-cols-3 @lg:grid-cols-5">
        <AddBlock icon={<Type />} label="Text" onClick={() => addBlock("text")} />
        <AddBlock icon={<Link2 />} label="Section" onClick={() => addBlock("section")} />
        <AddBlock
          icon={<SeparatorHorizontal />}
          label="Separator"
          onClick={() => addBlock("separator")}
        />
        <AddBlock icon={<ImageIcon />} label="Image" onClick={() => addBlock("image")} />
        <AddBlock icon={<Images />} label="Gallery" onClick={() => addBlock("gallery")} />
      </div>
    </EditorSection>
  );
}

function VariableBrowser({
  search,
  setSearch,
  insert,
  activeTarget,
}: {
  search: string;
  setSearch: (value: string) => void;
  insert: (value: string) => void;
  activeTarget: string;
}) {
  const groups = Object.entries(variableGroups)
    .map(
      ([name, variables]) =>
        [
          name,
          variables.filter((variable) => variable.toLowerCase().includes(search.toLowerCase())),
        ] as const,
    )
    .filter(([, variables]) => variables.length);
  return (
    <section className={`${panelClass} p-4 sm:p-5`}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-sm font-bold">Variables</h2>
          <p className="mt-1 text-[0.625rem] text-muted-foreground">Insert into {activeTarget}</p>
        </div>
        <input
          aria-label="Search variables"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search"
          className={`${inputClass} h-9 w-28 sm:w-40`}
        />
      </div>
      <div className="mt-4 grid gap-2">
        {groups.length === 0 && (
          <p className="py-4 text-center text-xs text-muted-foreground">
            No variables match &ldquo;{search}&rdquo;.
          </p>
        )}
        {groups.map(([name, variables], index) => (
          // Keyed by the search so the first match group opens again when results change.
          <details key={`${name}-${search ? "search" : "all"}`} open={index === 0 || !!search}>
            <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center py-2 text-[0.625rem] font-bold uppercase">
              <span className="truncate">{name}</span>
              <span className="text-muted-foreground">{variables.length}</span>
            </summary>
            <div className="flex flex-wrap gap-1.5 pb-3">
              {variables.map((variable) => (
                <Button
                  key={variable}
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => insert(variable)}
                  className="h-7 px-2 font-mono text-[0.625rem]"
                >
                  {variable}
                </Button>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function EditorSection({
  title,
  count,
  children,
}: {
  title: string;
  count?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${panelClass} @container p-4 sm:p-5`}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate font-display text-sm font-bold">{title}</h2>
        {count && <span className="shrink-0 text-[0.625rem] text-muted-foreground">{count}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FieldGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
      <legend className="mb-3 text-[0.625rem] font-bold uppercase text-muted-foreground">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  onFocus,
  wide,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  onFocus?: () => void;
  wide?: boolean;
}) {
  return (
    <label
      className={`grid min-w-0 gap-1.5 text-[0.625rem] uppercase text-muted-foreground ${wide ? "sm:col-span-2" : ""}`}
    >
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${inputClass} h-10 normal-case`}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  rows,
  onFocus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows: number;
  onFocus?: () => void;
}) {
  return (
    <label className="grid min-w-0 gap-1.5 text-[0.625rem] uppercase text-muted-foreground">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`${inputClass} resize-y p-3 normal-case leading-5`}
      />
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-[0.625rem] uppercase text-muted-foreground">
      {label}
      <span className="grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} h-10 normal-case`}
        />
        <span className="relative grid size-10 cursor-pointer place-items-center rounded-md border border-border bg-background shadow-panel focus-within:ring-2 focus-within:ring-ring">
          <span
            className="size-5 rounded-sm border border-border"
            style={{ backgroundColor: toColorInputValue(value) }}
          />
          <input
            type="color"
            aria-label={`${label} picker`}
            value={toColorInputValue(value)}
            onChange={(event) => onChange(event.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </span>
      </span>
    </label>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="size-8"
    >
      {children}
    </Button>
  );
}

function MoveControls({
  index,
  total,
  up,
  down,
  remove,
}: {
  index: number;
  total: number;
  up: () => void;
  down: () => void;
  remove: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center">
      <IconButton label="Move up" disabled={index === 0} onClick={up}>
        <ArrowUp />
      </IconButton>
      <IconButton label="Move down" disabled={index === total - 1} onClick={down}>
        <ArrowDown />
      </IconButton>
      <IconButton label="Remove" onClick={remove}>
        <Trash2 />
      </IconButton>
    </div>
  );
}

function AddBlock({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button type="button" size="sm" variant="outline" onClick={onClick} className="min-w-0 px-2">
      {icon}
      <span className="truncate">{label}</span>
    </Button>
  );
}
