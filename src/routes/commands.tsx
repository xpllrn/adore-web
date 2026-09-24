import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Check, Copy, Gamepad2, Gavel, LoaderCircle, Music2, Search, ShieldCheck, Star, UsersRound, Wrench } from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { PageIntro } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

type CommandEntry = [name: string, text: string, args: string, perms: string, premium?: boolean];

const tokenize = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).map((token) => token.replace(/^[<[(\[]+|[>)\]]+$/g, ""));

type CommandGroup = { name: string; commands: CommandEntry[] };

const groupIcons: Record<string, ComponentType<{ className?: string }>> = {
  Moderation: Gavel,
  Security: ShieldCheck,
  Music: Music2,
  Community: UsersRound,
  "Fun & economy": Gamepad2,
  Utility: Wrench,
};

export const Route = createFileRoute("/commands")({
  head: () => ({
    meta: [
      { title: "Commands | Adore" },
      { name: "description", content: "Search Adore's moderation, security, music, community, economy, and utility commands." },
      { property: "og:title", content: "Commands | Adore" },
      { property: "og:description", content: "Explore the command library for the Adore Discord app." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/commands" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/commands" }],
  }),
  component: CommandsPage,
});

function CommandsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [commandGroups, setCommandGroups] = useState<CommandGroup[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(60);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDisplayCount(60);
  }, [category, query]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(new URL("commands.json", window.location.origin), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load commands");
        return response.json() as Promise<CommandGroup[]>;
      })
      .then(setCommandGroups)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(true);
      });
    return () => controller.abort();
  }, []);

  const totalAllCommands = useMemo(
    () => commandGroups.reduce((acc, group) => acc + group.commands.length, 0),
    [commandGroups]
  );

  const categories = ["All", ...commandGroups.map((group) => group.name)];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: totalAllCommands };
    for (const group of commandGroups) {
      counts[group.name] = group.commands.length;
    }
    return counts;
  }, [commandGroups, totalAllCommands]);

  const filtered = useMemo(
    () =>
      commandGroups
        .filter((group) => category === "All" || group.name === category)
        .map((group) => ({
          ...group,
          commands: group.commands.filter(([name, text]) =>
            `${name} ${text}`.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((group) => group.commands.length),
    [commandGroups, query, category]
  );

  const allFilteredCommands = useMemo(() => {
    return filtered.flatMap((group) =>
      group.commands.map((command) => ({ group: group.name, command }))
    );
  }, [filtered]);

  const visibleCommands = useMemo(() => {
    if (query) return allFilteredCommands;
    return allFilteredCommands.slice(0, displayCount);
  }, [allFilteredCommands, displayCount, query]);

  function copyCommand(name: string) {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(`,${name}`);
      setCopiedCommand(name);
      setTimeout(() => setCopiedCommand(null), 1500);
    }
  }

  const desktopSidebar = (
    <aside
      className="group fixed left-4 top-1/2 z-30 hidden h-[29.5rem] w-16 -translate-y-1/2 overflow-hidden rounded-md border border-border bg-nav/95 p-2 shadow-nav backdrop-blur-xl transition-[width] duration-300 ease-out hover:w-64 focus-within:w-64 lg:block"
      aria-label="Command tools"
    >
      <div className="flex h-full w-60 flex-col gap-1">
        <label className="grid h-12 shrink-0 grid-cols-[3rem_minmax(0,1fr)] items-center rounded-full text-muted-foreground transition-colors focus-within:bg-elevated focus-within:text-foreground">
          <Search className="mx-auto size-5" />
          <span className="sr-only">Search commands</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands..."
            className="h-12 min-w-0 bg-transparent pr-3 text-xs text-foreground opacity-0 outline-none transition-opacity placeholder:text-muted-foreground group-hover:opacity-100 group-focus-within:opacity-100"
          />
        </label>
        <div className="my-1 h-px w-full bg-border" />
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
          <div className="grid gap-1">
            {categories.map((name) => {
              const Icon = name === "All" ? Boxes : groupIcons[name] ?? Boxes;
              const active = category === name;
              const count = categoryCounts[name] ?? 0;
              return (
                <Button
                  key={name}
                  type="button"
                  variant="ghost"
                  onClick={() => setCategory(name)}
                  className={`relative grid h-12 w-full shrink-0 grid-cols-[3rem_minmax(0,1fr)] justify-start rounded-full p-0 text-left transition-colors ${active ? "" : "text-muted-foreground hover:bg-elevated hover:text-foreground"}`}
                  aria-label={`${name} commands`}
                  title={`${name} (${count})`}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-[0.25rem] top-1/2 z-0 h-10 w-10 -translate-y-1/2 rounded-full bg-foreground transition-all duration-300 ease-out group-hover:left-2 group-hover:h-[calc(100%-0.5rem)] group-hover:w-[calc(100%-1rem)] group-hover:rounded-xl group-focus-within:left-2 group-focus-within:h-[calc(100%-0.5rem)] group-focus-within:w-[calc(100%-1rem)] group-focus-within:rounded-xl"
                    />
                  )}
                  <Icon className={`relative z-10 mx-auto size-5 ${active ? "text-background" : ""}`} />
                  <span
                    className={`relative z-10 flex items-center justify-between pr-3 text-xs opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${active ? "text-background" : ""}`}
                  >
                    <span className="truncate">{name}</span>
                    <span className={`font-mono text-[10px] ${active ? "text-background/80" : "text-muted-foreground"}`}>
                      {count}
                    </span>
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {mounted ? createPortal(desktopSidebar, document.body) : desktopSidebar}
      <PageIntro
        eyebrow={`${totalAllCommands || "710+"} ways to work`}
        title="Every command. One search."
        description="Find the tools your staff and members need, from anti-raid controls to music, analytics, and ranked games."
      />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        {/* Mobile categories & search bar */}
        <div className="sticky top-20 z-20 rounded-md border border-border bg-nav/95 p-1.5 shadow-nav backdrop-blur-xl lg:hidden">
          <div className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto">
            <label className="flex h-10 min-w-32 shrink-0 items-center gap-2 rounded-sm px-2.5 focus-within:bg-elevated sm:min-w-48">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <span className="sr-only">Search commands</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="h-10 min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </label>
            <div className="h-6 w-px shrink-0 bg-border" />
            {categories.map((name) => {
              const Icon = name === "All" ? Boxes : groupIcons[name] ?? Boxes;
              const count = categoryCounts[name] ?? 0;
              return (
                <Button
                  key={name}
                  type="button"
                  variant="ghost"
                  onClick={() => setCategory(name)}
                  className={`h-10 shrink-0 touch-pan-x gap-1.5 rounded-full px-3.5 transition-colors ${category === name ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "text-muted-foreground hover:bg-elevated hover:text-foreground"}`}
                  aria-label={`${name} commands`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="text-xs">{name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Category & results header */}
        {!!allFilteredCommands.length && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>
              Showing <strong className="text-foreground">{visibleCommands.length}</strong> of{" "}
              <strong className="text-foreground">{allFilteredCommands.length}</strong> commands in{" "}
              <span className="font-semibold text-foreground">{category}</span>
              {query && ` matching "${query}"`}
            </p>
          </div>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCommands.map(({ group, command: [name, text, args, perms, premium] }) => (
            <article key={`${group}-${name}`} className="flex flex-col rounded-md border border-border bg-surface p-6 shadow-panel">
              <div className="flex items-center gap-2">
                {premium && <Star className="size-4 shrink-0 fill-foreground text-foreground" aria-label="Premium command" />}
                <h2 className="break-all font-display text-base font-bold text-foreground">{name}</h2>
                <button
                  type="button"
                  onClick={() => copyCommand(name)}
                  className="ml-auto shrink-0 rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                  aria-label={`Copy ,${name}`}
                  title="Copy command"
                >
                  {copiedCommand === name ? (
                    <Check className="size-4 text-success" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              <div className="mt-5 grid flex-1 content-start gap-4 border-t border-border pt-4">
                <div className="grid gap-1.5">
                  <span className="text-sm text-muted-foreground">arguments</span>
                  {args && args !== "none" ? (
                    <div className="flex flex-wrap gap-1.5">
                      {tokenize(args).map((token) => (
                        <code key={token} className="rounded-sm bg-elevated px-2.5 py-1 text-xs italic text-foreground">
                          {token}
                        </code>
                      ))}
                    </div>
                  ) : (
                    <code className="text-sm text-muted-foreground">none</code>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <span className="text-sm text-muted-foreground">permissions</span>
                  {perms && perms !== "none" ? (
                    <div className="flex flex-wrap gap-1.5">
                      <code className="rounded-sm bg-elevated px-2.5 py-1 text-xs font-bold text-foreground">
                        {perms}
                      </code>
                    </div>
                  ) : (
                    <code className="text-sm text-muted-foreground">none</code>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more controls when there are remaining commands */}
        {allFilteredCommands.length > visibleCommands.length && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">
              Showing {visibleCommands.length} of {allFilteredCommands.length} commands
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDisplayCount((prev) => prev + 60)}
                className="h-10 px-6 font-semibold"
              >
                Load 60 more
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDisplayCount(allFilteredCommands.length)}
                className="h-10 px-6 font-semibold"
              >
                Show all ({allFilteredCommands.length})
              </Button>
            </div>
          </div>
        )}

        {!commandGroups.length && !loadError && (
          <p className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" /> Loading commands
          </p>
        )}
        {loadError && (
          <p className="py-24 text-center text-sm text-muted-foreground">Commands could not be loaded.</p>
        )}
        {!!commandGroups.length && !filtered.length && (
          <p className="py-24 text-center text-sm text-muted-foreground">No commands match “{query}”.</p>
        )}
      </section>
    </>
  );
}