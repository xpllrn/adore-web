import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Copy,
  ExternalLink,
  Flame,
  KeyRound,
  ListMusic,
  Music2,
  Radio,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro, supportUrl } from "@/components/site-chrome";

type LastfmSearch = {
  token?: string | undefined;
};

export const Route = createFileRoute("/lastfm")({
  validateSearch: (search: Record<string, unknown>): LastfmSearch => {
    const rawToken = search["token"];
    return {
      token: typeof rawToken === "string" ? rawToken : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Last.fm Authorization | Adore" },
      {
        name: "description",
        content: "Authorize and connect your Last.fm account to the Adore Discord bot.",
      },
      { property: "og:title", content: "Last.fm Authorization | Adore" },
      {
        property: "og:description",
        content: "Authorize and connect your Last.fm account to the Adore Discord bot.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/lastfm" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/lastfm" }],
  }),
  component: LastfmPage,
});

function LastfmPage() {
  const search = Route.useSearch();
  const [token, setToken] = useState<string>(() => search.token ?? "");
  const [manualInput, setManualInput] = useState<string>("");
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  useEffect(() => {
    if (search.token) {
      setToken(search.token);
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      if (urlToken) {
        setToken(urlToken);
      }
    }
  }, [search.token]);

  const activeToken = token.trim();
  const botCommand = `,lastfm login ${activeToken}`;

  const copyToClipboard = async (text: string, type: "token" | "command") => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      if (type === "token") {
        setCopiedToken(true);
        setTimeout(() => setCopiedToken(false), 2000);
      } else {
        setCopiedCommand(true);
        setTimeout(() => setCopiedCommand(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    try {
      if (manualInput.includes("token=")) {
        const parsed = new URL(
          manualInput.startsWith("http") ? manualInput : `https://${manualInput}`,
        );
        const extracted = parsed.searchParams.get("token");
        if (extracted) {
          setToken(extracted);
          return;
        }
      }
    } catch {
      // Treat as raw token if not a valid URL
    }

    setToken(manualInput.trim());
  };

  return (
    <>
      <PageIntro
        eyebrow="Last.fm Integration"
        title="Last.fm Authorization"
        description="Connect your Last.fm profile to Adore to track scrobbles, showcase what you're playing, and compete for server crowns."
      />

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 sm:pb-28">
        {activeToken ? (
          <div className="space-y-6">
            {/* Main Token Box */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-panel sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-success" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Authorization Token Ready
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1 text-xs text-muted-foreground">
                  <Music2 className="size-3.5 text-primary" />
                  <span>Last.fm</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="token-box"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Your Authorization Token
                  </label>
                  <span className="hidden text-[0.6875rem] text-muted-foreground sm:inline">
                    Click to select all
                  </span>
                </div>
                <div className="relative mt-2">
                  <div
                    id="token-box"
                    className="flex min-h-14 items-center break-all rounded-lg border border-border bg-background/90 p-4 font-mono text-sm font-semibold tracking-wide text-foreground select-all sm:pr-40 sm:text-base"
                  >
                    {activeToken}
                  </div>
                  <div className="mt-3 sm:absolute sm:right-2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(activeToken, "token")}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:w-auto ${
                        copiedToken
                          ? "bg-success text-success-foreground shadow-md"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                      }`}
                    >
                      {copiedToken ? (
                        <>
                          <Check className="size-4 stroke-[2.5]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          <span>Copy Token</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bot Command Box */}
              <div className="mt-6 rounded-lg border border-border/80 bg-elevated/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Quick Command (Run in Discord)
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(botCommand, "command")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="size-3.5 text-success" />
                        <span className="text-success">Command Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-2 overflow-x-auto rounded border border-border/50 bg-background/60 p-2.5 font-mono text-xs text-foreground sm:text-sm">
                  <code>{botCommand}</code>
                </pre>
              </div>

              <div className="mt-6 hidden items-start gap-3 rounded-lg border border-border/60 bg-elevated/40 p-4 text-xs leading-5 text-muted-foreground sm:flex">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                <p>
                  This token allows Adore to authenticate with your Last.fm account. Only share or
                  send this token directly to Adore in Discord.
                </p>
              </div>

              {/* Mobile Support Link */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-6 sm:hidden">
                <p className="text-xs text-muted-foreground">Need help?</p>
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-elevated px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <span>Adore Support</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* How to complete connection - hidden on phone to keep it clean and minimal */}
            <div className="hidden rounded-xl border border-border bg-surface p-6 shadow-panel sm:block sm:p-8">
              <h2 className="font-display text-base font-bold sm:text-lg">How to complete login</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex size-7 items-center justify-center rounded-full bg-elevated font-mono text-xs font-bold text-foreground">
                    1
                  </div>
                  <h3 className="mt-3 font-display text-xs font-bold sm:text-sm">
                    Copy Your Token
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    Click the "Copy Token" or "Copy Command" button above.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex size-7 items-center justify-center rounded-full bg-elevated font-mono text-xs font-bold text-foreground">
                    2
                  </div>
                  <h3 className="mt-3 font-display text-xs font-bold sm:text-sm">Open Discord</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    Go to any Discord server where Adore is active, or message Adore in direct
                    messages.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex size-7 items-center justify-center rounded-full bg-elevated font-mono text-xs font-bold text-foreground">
                    3
                  </div>
                  <h3 className="mt-3 font-display text-xs font-bold sm:text-sm">Paste & Send</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    Send{" "}
                    <code className="break-all rounded bg-elevated px-1 py-0.5 font-mono text-[0.6875rem] text-foreground">
                      {botCommand}
                    </code>{" "}
                    in chat to finalize the link.
                  </p>
                </div>
              </div>

              {/* Commands to try next */}
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Commands to try once linked
                </h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Radio className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,lastfm now
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Displays your currently playing track
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <ListMusic className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,lastfm recent
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Lists your recent scrobbles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Flame className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,lastfm topartists
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Shows your top artists across timeframes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Trophy className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,lastfm crowns
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Compete for crowns with other members
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <p className="text-xs text-muted-foreground">
                  Need help or having trouble connecting?
                </p>
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-elevated px-4 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <span>Adore Support</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Empty / No Token State */
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-panel sm:p-10">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-elevated text-muted-foreground">
                <KeyRound className="size-6 text-foreground" />
              </div>

              <h2 className="mt-4 font-display text-lg font-bold sm:text-xl">
                No authorization token found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                To link your Last.fm account, start by using the{" "}
                <code className="rounded bg-elevated px-1.5 py-0.5 font-mono text-xs text-foreground">
                  ,lastfm login
                </code>{" "}
                command in Discord.
              </p>

              {/* 3-step walkthrough - visible on desktop, hidden on phone to avoid clutter */}
              <div className="mt-8 hidden gap-4 text-left sm:grid sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex size-6 items-center justify-center rounded-full bg-elevated font-mono text-xs font-bold text-foreground">
                    1
                  </div>
                  <h3 className="mt-2.5 text-xs font-bold">Start in Discord</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Type{" "}
                    <code className="rounded bg-elevated px-1 font-mono text-[0.625rem]">
                      ,lastfm login
                    </code>{" "}
                    in chat.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex size-6 items-center justify-center rounded-full bg-elevated font-mono text-xs font-bold text-foreground">
                    2
                  </div>
                  <h3 className="mt-2.5 text-xs font-bold">Authorize on Last.fm</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click the authorization link generated by Adore.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="flex size-6 items-center justify-center rounded-full bg-elevated font-mono text-xs font-bold text-foreground">
                    3
                  </div>
                  <h3 className="mt-2.5 text-xs font-bold">Return with Token</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last.fm will redirect you back here with your token.
                  </p>
                </div>
              </div>

              {/* Manual Token Input Fallback */}
              <div className="mt-6 border-t border-border pt-6 text-left sm:mt-8 sm:pt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Have a token or callback URL?
                </h3>
                <form
                  onSubmit={handleManualSubmit}
                  className="mt-3 flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Paste token or https://adore.rest/lastfm?token=..."
                    className="h-10 flex-1 rounded-md border border-input bg-background px-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Load Token
                  </button>
                </form>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href={supportUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <span>Need assistance? Join our support server</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
