import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Code2,
  Copy,
  Download,
  FileCode,
  FileText,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { useId, useMemo, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { EmbedFieldsEditor } from "@/components/embed-fields-editor";
import { Preview, embedToCv2Blocks, parseButtonsFromNote } from "@/components/embed-preview";
import { buildAdoreCode } from "@/lib/adore-code";
import {
  parseEmbedMarkdown,
  serializeEmbeds,
  type ParsedEmbed,
  type ParsedEmbedField,
} from "@/lib/embed-md";
import type { EmbedField, EmbedState, Mode } from "@/types/embed";

export const Route = createFileRoute("/adminembedbuilder")({
  head: () => ({
    meta: [
      { title: "Admin Embed Builder | Adore" },
      {
        name: "description",
        content:
          "Import, edit, preview, and export Discord embeds from markdown reference documents.",
      },
      { property: "og:title", content: "Admin Embed Builder | Adore" },
      {
        property: "og:description",
        content: "Manage Discord embed references with live preview and code export.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/adminembedbuilder" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/adminembedbuilder" }],
  }),
  component: AdminEmbedBuilderPage,
});

const inputClass =
  "min-w-0 rounded-md border border-border bg-background px-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";
const panelClass = "rounded-md border border-border bg-surface shadow-panel";

export interface EditableEmbed extends ParsedEmbed {
  id: string;
  authorIcon?: string | undefined;
  authorUrl?: string | undefined;
  footerIcon?: string | undefined;
  timestamp?: boolean | undefined;
  mode?: Mode | undefined;
}

const SAMPLE_MARKDOWN = `# Server Embed Reference

## Welcome Embed
**Current:**
- Title: Welcome to the Community!
- Description: Make yourself at home. Read the rules and assign your server roles.
- Color: 0x9DD2A8
- Author: Adore Community
- Thumbnail/Image: https://cdn.discordapp.com/avatars/1510215071559847946/a2026a29a580b7c34f0b9ab736021aab.png
- Footer: Powered by adore • adore.rest
- Fields:
  - \`Rules\` → \`Read and follow our community guidelines\` (inline)
  - \`Roles\` → \`Pick notifications and cosmetic roles in #roles\` (inline)
  - \`Support\` → \`Open a ticket if you need assistance\`
- Buttons/View: [Website](https://adore.rest)

### Your redesign:

## Verification Notice
**Current:**
- Title: Verification Required
- Description: Please complete verification to gain access to member channels.
- Color: 0x5865F2
- Author: Security
- Thumbnail/Image: none
- Footer: Automated Security
- Fields:
  - \`Step 1\` → \`Click the Verify button below\` (inline)
  - \`Step 2\` → \`Solve the captcha in your direct messages\` (inline)
- Buttons/View: Verify Button

### Your redesign:
`;

function AdminEmbedBuilderPage() {
  const [embeds, setEmbeds] = useState<EditableEmbed[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [originalMarkdown, setOriginalMarkdown] = useState<string>("");
  const [importedFileName, setImportedFileName] = useState<string>("embeds.md");
  const [pasteInput, setPasteInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<"all" | "embed" | "cv2">("all");
  const [importStats, setImportStats] = useState<{
    parsedCount: number;
    skippedCount: number;
    skippedSections: string[];
  } | null>(null);
  const [notice, setNotice] = useState<string>("");
  const [showImportPanel, setShowImportPanel] = useState<boolean>(true);
  const fileInputId = useId();

  function flash(text: string) {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function handleImportText(text: string, filename?: string) {
    if (!text.trim()) {
      flash("Please provide markdown content to import");
      return;
    }
    const result = parseEmbedMarkdown(text);
    if (result.embeds.length === 0) {
      flash("No parseable embed sections found in markdown");
      setImportStats({
        parsedCount: 0,
        skippedCount: result.skippedCount,
        skippedSections: result.skippedSections,
      });
      return;
    }

    const editableList: EditableEmbed[] = result.embeds.map((emb, idx) => ({
      ...emb,
      id: `embed-${idx}-${Date.now()}`,
      authorIcon: emb.authorIcon || "",
      authorUrl: "",
      footerIcon: "",
      timestamp: false,
      mode: emb.isCv2 ? "container" : "embed",
    }));

    setEmbeds(editableList);
    setSelectedIndex(0);
    setOriginalMarkdown(text);
    if (filename) setImportedFileName(filename);
    setImportStats({
      parsedCount: result.parsedCount,
      skippedCount: result.skippedCount,
      skippedSections: result.skippedSections,
    });
    setShowImportPanel(false);
    flash(`Imported ${result.parsedCount} embeds (${result.skippedCount} sections skipped)`);
  }

  async function loadCupiEconomyTemplate() {
    try {
      const response = await fetch("/cupi-economy-embeds.md");
      if (!response.ok) throw new Error("File not found");
      const text = await response.text();
      handleImportText(text, "cupi-economy-embeds.md");
    } catch {
      flash("Failed to load Cupi economy template");
    }
  }

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleImportText(content, file.name);
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  const activeEmbed = embeds[selectedIndex] ?? null;

  function updateActiveEmbed(patch: Partial<EditableEmbed>) {
    if (selectedIndex < 0 || selectedIndex >= embeds.length) return;
    setEmbeds((current) =>
      current.map((item, idx) => (idx === selectedIndex ? { ...item, ...patch } : item)),
    );
  }

  function updateActiveFields(fields: EmbedField[]) {
    const parsedFields: ParsedEmbedField[] = fields.map((f) => ({
      name: f.name,
      value: f.value,
      inline: f.inline,
    }));
    updateActiveEmbed({ fields: parsedFields });
  }

  function addNewEmbed() {
    const newEmbed: EditableEmbed = {
      id: `embed-${Date.now()}`,
      name: `New Embed ${embeds.length + 1}`,
      title: "New Embed Title",
      description: "Embed description content goes here.",
      color: "#8b8d92",
      fields: [],
      footer: "Powered by adore",
      authorName: "",
      thumbnail: "",
      image: "",
      buttonsNote: "",
      authorIcon: "",
      authorUrl: "",
      footerIcon: "",
      timestamp: false,
    };
    setEmbeds((current) => [...current, newEmbed]);
    setSelectedIndex(embeds.length);
    flash("Added new embed");
  }

  function deleteCurrentEmbed() {
    if (!activeEmbed) return;
    const confirmed = window.confirm(`Delete "${activeEmbed.name}"?`);
    if (!confirmed) return;
    const nextList = embeds.filter((_, idx) => idx !== selectedIndex);
    setEmbeds(nextList);
    setSelectedIndex((prev) => Math.max(0, Math.min(prev, nextList.length - 1)));
    flash(`Deleted embed`);
  }

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

  function downloadMarkdown() {
    if (embeds.length === 0) {
      flash("No embeds to export");
      return;
    }
    const outputMd = serializeEmbeds(embeds, {
      originalMarkdown: originalMarkdown || undefined,
      colorFormat: "0x",
    });
    const blob = new Blob([outputMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = importedFileName || "embeds.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    flash("Downloaded markdown file!");
  }

  const activeEmbedState: EmbedState | null = useMemo(() => {
    if (!activeEmbed) return null;
    return {
      title: activeEmbed.title,
      description: activeEmbed.description,
      color: activeEmbed.color || "#8b8d92",
      authorName: activeEmbed.authorName,
      authorIcon: activeEmbed.authorIcon || "",
      authorUrl: activeEmbed.authorUrl || "",
      thumbnail: activeEmbed.thumbnail,
      image: activeEmbed.image,
      footer: activeEmbed.footer,
      footerIcon: activeEmbed.footerIcon || "",
      timestamp: Boolean(activeEmbed.timestamp),
      fields: activeEmbed.fields.map((f, i) => ({
        id: i + 1,
        name: f.name,
        value: f.value,
        inline: f.inline,
      })),
    };
  }, [activeEmbed]);

  const activeMode: Mode = activeEmbed?.mode || (activeEmbed?.isCv2 ? "container" : "embed");

  const activeButtons = useMemo(() => {
    return parseButtonsFromNote(activeEmbed?.buttonsNote || "");
  }, [activeEmbed?.buttonsNote]);

  const activeBlocks = useMemo(() => {
    if (activeMode !== "container" || !activeEmbedState) return [];
    return embedToCv2Blocks(activeEmbedState, activeEmbed?.buttonsNote);
  }, [activeMode, activeEmbedState, activeEmbed?.buttonsNote]);

  const activeAdoreCode = useMemo(() => {
    if (!activeEmbedState) return "";
    if (activeMode === "container") {
      return buildAdoreCode(
        "container",
        "",
        activeEmbedState,
        activeEmbed?.color || "#8b8d92",
        activeBlocks,
        activeButtons,
      );
    }
    return buildAdoreCode("embed", "", activeEmbedState, "", [], activeButtons);
  }, [activeMode, activeEmbedState, activeEmbed?.color, activeBlocks, activeButtons]);

  const cv2Count = useMemo(
    () => embeds.filter((e) => e.isCv2 || e.mode === "container").length,
    [embeds],
  );
  const standardEmbedCount = embeds.length - cv2Count;

  const filteredEmbeds = useMemo(() => {
    let list = embeds;
    if (filterType === "embed") {
      list = list.filter((e) => !e.isCv2 && e.mode !== "container");
    } else if (filterType === "cv2") {
      list = list.filter((e) => e.isCv2 || e.mode === "container");
    }
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query),
    );
  }, [embeds, searchQuery, filterType]);

  return (
    <div className="mx-auto max-w-[1700px] px-3 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-36">
      {/* Top Header & Global Actions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Internal Admin Tool
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase text-emerald-500">
              Live Editor
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-4xl">
            Markdown Embed Builder
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Import reference markdown files, edit embeds with real-time Discord preview, and export
            back to Markdown or Adore code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowImportPanel((prev) => !prev)}
            className="gap-1.5 shadow-panel"
          >
            <Upload className="size-3.5" />
            {showImportPanel ? "Hide Import" : "Import Markdown"}
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={downloadMarkdown}
            disabled={embeds.length === 0}
            className="gap-1.5 bg-foreground font-bold text-background shadow-panel hover:opacity-90 disabled:opacity-50"
          >
            <Download className="size-3.5" /> Download .md
          </Button>
        </div>
      </div>

      {/* (1) Import Panel */}
      {showImportPanel && (
        <section className={`${panelClass} mb-6 p-4 sm:p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="size-4 text-discord" />
              <h2 className="font-display text-sm font-bold sm:text-base">
                Import Reference Markdown
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={loadCupiEconomyTemplate}
                className="h-8 gap-1.5 text-xs font-bold text-foreground hover:bg-elevated"
              >
                <Sparkles className="size-3.5 text-amber-400" /> Load Cupi Economy
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => handleImportText(SAMPLE_MARKDOWN, "sample-embeds.md")}
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="size-3.5" /> Sample
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setShowImportPanel(false)}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {/* File Upload Dropzone */}
            <div className="flex flex-col justify-between rounded-md border border-dashed border-border bg-background p-5 text-center">
              <div className="my-auto py-4">
                <div className="mx-auto grid size-12 place-items-center rounded-full border border-border bg-elevated text-muted-foreground">
                  <Upload className="size-6" />
                </div>
                <h3 className="mt-3 font-display text-sm font-bold">Upload .md file</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select a Markdown file containing embed reference sections
                </p>
                <input
                  id={fileInputId}
                  type="file"
                  accept=".md,.markdown,text/markdown,text/plain"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              <label
                htmlFor={fileInputId}
                className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-foreground px-4 text-xs font-bold text-background shadow-panel transition-opacity hover:opacity-90"
              >
                Browse Markdown File
              </label>
            </div>

            {/* Paste Fallback Textarea */}
            <div className="flex flex-col">
              <label
                htmlFor="markdown-paste-area"
                className="mb-1 text-xs font-semibold text-muted-foreground"
              >
                Or paste Markdown text directly:
              </label>
              <textarea
                id="markdown-paste-area"
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                placeholder="Paste markdown content with ## <Section> and **Current:** blocks here..."
                rows={6}
                className={`${inputClass} w-full flex-1 resize-y p-3 font-mono text-xs leading-5`}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => handleImportText(pasteInput)}
                disabled={!pasteInput.trim()}
                className="mt-3 gap-1.5"
              >
                <RefreshCw className="size-3.5" /> Parse &amp; Load Embeds
              </Button>
            </div>
          </div>

          {/* Parsed / Skipped Counts Notice */}
          {importStats && (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-border bg-elevated p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                <Check className="size-4" />
                <span>{importStats.parsedCount} embeds parsed</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="text-muted-foreground">
                <span>{importStats.skippedCount} non-embed sections skipped</span>
              </div>
              {importStats.skippedSections.length > 0 && (
                <span className="truncate text-[10px] text-muted-foreground/80">
                  (Skipped: {importStats.skippedSections.join(", ")})
                </span>
              )}
            </div>
          )}
        </section>
      )}

      {/* Main Workspace: (2) Sidebar + (3) Editor + (4) Preview */}
      {embeds.length === 0 ? (
        <div className={`${panelClass} p-12 text-center`}>
          <FileText className="mx-auto size-12 text-muted-foreground/50" />
          <h2 className="mt-4 font-display text-lg font-bold">No Embeds Loaded</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted-foreground">
            Import an existing Markdown reference file, paste markdown content above, or click below
            to load a sample template to start editing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              onClick={loadCupiEconomyTemplate}
              className="gap-2 bg-foreground font-bold text-background hover:opacity-90 shadow-panel"
            >
              <Sparkles className="size-4 text-amber-400" /> Load Cupi Economy Reference
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleImportText(SAMPLE_MARKDOWN, "sample-embeds.md")}
              className="gap-2"
            >
              Load Sample Template
            </Button>
            <Button type="button" variant="outline" onClick={addNewEmbed} className="gap-2">
              <Plus className="size-4" /> Create Blank Embed
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* (2) Sidebar: Listing every parsed embed */}
          <aside className={`${panelClass} flex flex-col p-4`}>
            <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <h2 className="font-display text-sm font-bold">Parsed Embeds</h2>
                <span className="text-[10px] text-muted-foreground">
                  {embeds.length} total • #{selectedIndex + 1} active
                </span>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={addNewEmbed}
                title="Add new embed"
                className="size-8 p-0"
              >
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Filter Pills */}
            <div className="mt-3 grid grid-cols-3 gap-1 rounded-md border border-border bg-background p-1 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setFilterType("all")}
                className={`rounded px-1.5 py-1 text-center transition-colors ${
                  filterType === "all"
                    ? "bg-secondary text-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({embeds.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType("embed")}
                className={`rounded px-1.5 py-1 text-center transition-colors ${
                  filterType === "embed"
                    ? "bg-secondary text-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Embeds ({standardEmbedCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterType("cv2")}
                className={`rounded px-1.5 py-1 text-center transition-colors ${
                  filterType === "cv2"
                    ? "bg-secondary text-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                CV2 ({cv2Count})
              </button>
            </div>

            {/* Sidebar Search */}
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search embeds..."
                className={`${inputClass} h-8 w-full pl-8`}
              />
            </div>

            {/* Embed List */}
            <nav
              aria-label="Embed sections"
              className="mt-3 flex max-h-[70vh] flex-col gap-1.5 overflow-y-auto pr-1"
            >
              {filteredEmbeds.map((emb) => {
                const originalIndex = embeds.findIndex((e) => e.id === emb.id);
                const isSelected = originalIndex === selectedIndex;
                const isItemCv2 = emb.isCv2 || emb.mode === "container";
                return (
                  <button
                    key={emb.id}
                    type="button"
                    onClick={() => setSelectedIndex(originalIndex)}
                    className={`group flex items-start gap-2.5 rounded-md p-2.5 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-secondary text-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-elevated hover:text-foreground"
                    }`}
                  >
                    <span
                      className="mt-1 size-2.5 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: emb.color || "#8b8d92" }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate leading-tight font-medium text-foreground">
                        {emb.name || "Untitled Section"}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {emb.title || emb.description || "Empty embed"}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        {isItemCv2 ? (
                          <span className="rounded bg-indigo-500/20 px-1 py-0.2 text-[9px] font-bold text-indigo-400">
                            CV2
                          </span>
                        ) : (
                          <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-bold text-emerald-400">
                            EMBED
                          </span>
                        )}
                        {emb.fields.length > 0 && (
                          <span className="rounded-xs bg-background/80 px-1 py-0.2 text-[9px] text-muted-foreground">
                            {emb.fields.length} {emb.fields.length === 1 ? "field" : "fields"}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className="mt-1 size-3.5 shrink-0 text-foreground" />
                    )}
                  </button>
                );
              })}

              {filteredEmbeds.length === 0 && (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  No embeds match &quot;{searchQuery}&quot;
                </p>
              )}
            </nav>
          </aside>

          {/* Main Editing & Preview Columns */}
          {activeEmbed && activeEmbedState ? (
            <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(26rem,.95fr)]">
              {/* (3) Editor Panel */}
              <div className="grid min-w-0 gap-4">
                <section className={`${panelClass} p-4 sm:p-5`}>
                  <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor="section-heading-input"
                        className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        Section Heading
                      </label>
                      <input
                        id="section-heading-input"
                        value={activeEmbed.name}
                        onChange={(e) => updateActiveEmbed({ name: e.target.value })}
                        placeholder="Section Name (e.g. Welcome Embed)"
                        className={`${inputClass} mt-1.5 h-9 w-full font-display text-sm font-bold`}
                      />
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2.5 pt-1 sm:pt-4">
                      {/* Mode Switcher */}
                      <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-panel">
                        <button
                          type="button"
                          onClick={() => updateActiveEmbed({ mode: "embed" })}
                          className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                            activeMode === "embed"
                              ? "bg-secondary text-foreground shadow-xs font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <FileText className="size-3.5 text-emerald-500" />
                          Embed
                        </button>
                        <button
                          type="button"
                          onClick={() => updateActiveEmbed({ mode: "container" })}
                          className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                            activeMode === "container"
                              ? "bg-secondary text-foreground shadow-xs font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Box className="size-3.5 text-indigo-400" />
                          Components V2
                        </button>
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={deleteCurrentEmbed}
                        title="Delete this embed"
                        className="h-9 gap-1.5 border-destructive/40 bg-destructive/10 text-xs font-semibold text-destructive shadow-xs transition-colors hover:border-destructive hover:bg-destructive hover:text-destructive-foreground active:scale-[0.98]"
                      >
                        <Trash2 className="size-3.5" /> Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    {/* Title */}
                    <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                      Title
                      <input
                        value={activeEmbed.title}
                        maxLength={256}
                        onChange={(e) => updateActiveEmbed({ title: e.target.value })}
                        placeholder="Embed title"
                        className={`${inputClass} h-10 normal-case`}
                      />
                    </label>

                    {/* Description */}
                    <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                      Description
                      <textarea
                        value={activeEmbed.description}
                        maxLength={4096}
                        rows={6}
                        onChange={(e) => updateActiveEmbed({ description: e.target.value })}
                        placeholder="Embed description (markdown supported)"
                        className={`${inputClass} resize-y p-3 normal-case leading-5`}
                      />
                    </label>

                    {/* Color Picker + Hex Input */}
                    <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                      Accent Colour
                      <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2">
                        <input
                          value={activeEmbed.color}
                          onChange={(e) => updateActiveEmbed({ color: e.target.value })}
                          placeholder="#8b8d92 or 0x9DD2A8"
                          className={`${inputClass} h-10 normal-case font-mono`}
                        />
                        <div className="relative grid size-10 cursor-pointer place-items-center rounded-md border border-border bg-background shadow-panel">
                          <span
                            className="size-5 rounded-sm border border-border"
                            style={{ backgroundColor: activeEmbed.color || "#8b8d92" }}
                          />
                          <input
                            type="color"
                            aria-label="Accent colour picker"
                            value={
                              activeEmbed.color.startsWith("#") ? activeEmbed.color : "#8b8d92"
                            }
                            onChange={(e) => updateActiveEmbed({ color: e.target.value })}
                            className="absolute inset-0 cursor-pointer opacity-0"
                          />
                        </div>
                      </div>
                    </label>

                    {/* Author Fields */}
                    <fieldset className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
                      <legend className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">
                        Author
                      </legend>
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        Author Name
                        <input
                          value={activeEmbed.authorName}
                          onChange={(e) => updateActiveEmbed({ authorName: e.target.value })}
                          placeholder="Author name"
                          className={`${inputClass} h-10 normal-case`}
                        />
                      </label>
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        Author Icon URL
                        <input
                          value={activeEmbed.authorIcon || ""}
                          onChange={(e) => updateActiveEmbed({ authorIcon: e.target.value })}
                          placeholder="https://"
                          className={`${inputClass} h-10 normal-case`}
                        />
                      </label>
                    </fieldset>

                    {/* Media: Thumbnail / Image */}
                    <fieldset className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
                      <legend className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">
                        Media Assets
                      </legend>
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        Thumbnail URL
                        <input
                          value={activeEmbed.thumbnail}
                          onChange={(e) => updateActiveEmbed({ thumbnail: e.target.value })}
                          placeholder="https://"
                          className={`${inputClass} h-10 normal-case`}
                        />
                      </label>
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        Image URL
                        <input
                          value={activeEmbed.image}
                          onChange={(e) => updateActiveEmbed({ image: e.target.value })}
                          placeholder="https://"
                          className={`${inputClass} h-10 normal-case`}
                        />
                      </label>
                    </fieldset>

                    {/* Footer */}
                    <fieldset className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
                      <legend className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">
                        Footer
                      </legend>
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        Footer Text
                        <input
                          value={activeEmbed.footer}
                          onChange={(e) => updateActiveEmbed({ footer: e.target.value })}
                          placeholder="Footer text"
                          className={`${inputClass} h-10 normal-case`}
                        />
                      </label>
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        Footer Icon URL
                        <input
                          value={activeEmbed.footerIcon || ""}
                          onChange={(e) => updateActiveEmbed({ footerIcon: e.target.value })}
                          placeholder="https://"
                          className={`${inputClass} h-10 normal-case`}
                        />
                      </label>
                    </fieldset>

                    {/* Timestamp Checkbox */}
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={Boolean(activeEmbed.timestamp)}
                        onChange={(e) => updateActiveEmbed({ timestamp: e.target.checked })}
                        className="size-4 accent-current"
                      />
                      Show timestamp
                    </label>

                    {/* Fields List Editor (Reused component) */}
                    <EmbedFieldsEditor
                      fields={activeEmbedState.fields}
                      onChange={updateActiveFields}
                    />

                    {/* Buttons / View (Read-only Note) */}
                    <div className="border-t border-border pt-4">
                      <label className="grid gap-1.5 text-[10px] uppercase text-muted-foreground">
                        <span>Buttons / View Note (Readonly)</span>
                        <div
                          className={`${inputClass} flex min-h-10 items-center bg-elevated/40 text-xs text-muted-foreground`}
                        >
                          {activeEmbed.buttonsNote ? (
                            <span className="font-mono text-foreground">
                              {activeEmbed.buttonsNote}
                            </span>
                          ) : (
                            <span className="italic text-muted-foreground/60">
                              None specified in markdown
                            </span>
                          )}
                        </div>
                      </label>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        From <code className="text-foreground">- Buttons/View:</code> line in the
                        reference markdown document.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* (4) Live Discord-Style Preview & (5) Code Export */}
              <aside className="grid min-w-0 gap-4 xl:sticky xl:top-28">
                {/* Live Preview */}
                <Preview
                  mode={activeMode}
                  message=""
                  embed={activeEmbedState}
                  blocks={activeBlocks}
                  buttons={activeButtons}
                  color={activeEmbed.color || "#8b8d92"}
                />

                {/* (5) Per-embed Adore Code Export */}
                <section className={`${panelClass} p-4 sm:p-5`}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-display text-sm font-bold">
                          {activeMode === "container"
                            ? "Components V2 Container Code"
                            : "Adore Embed Code"}
                        </h3>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                            activeMode === "container"
                              ? "bg-indigo-500/20 text-indigo-400"
                              : "bg-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {activeMode === "container" ? "CV2" : "EMBED"}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[9px] uppercase text-muted-foreground">
                        Active Item: {activeEmbed.name}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Button
                        type="button"
                        size="sm"
                        className="gap-1.5 bg-foreground font-bold text-background shadow-panel hover:opacity-90 active:scale-[0.98]"
                        onClick={() =>
                          copyToClipboard(
                            activeAdoreCode,
                            `"${activeEmbed.name}" ${activeMode === "container" ? "Container" : "Embed"} code`,
                          )
                        }
                      >
                        <Copy className="size-3.5" /> Copy Code
                      </Button>
                    </div>
                  </div>

                  <textarea
                    aria-label="Generated message code"
                    value={activeAdoreCode}
                    readOnly
                    rows={7}
                    spellCheck={false}
                    className={`${inputClass} mt-4 w-full resize-y p-3 font-mono text-xs leading-5`}
                  />
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    Generated using <code className="text-foreground">buildAdoreCode</code>. Ready
                    to paste into Discord.
                  </p>
                </section>
              </aside>
            </div>
          ) : null}
        </div>
      )}

      {/* Floating Status Notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-nav px-4 py-2 text-xs shadow-nav"
        >
          <Check className="size-3.5 text-emerald-500" />
          <span>{notice}</span>
        </div>
      )}
    </div>
  );
}
