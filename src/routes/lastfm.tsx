import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Check,
  Copy,
  ExternalLink,
  Flame,
  KeyRound,
  ListMusic,
  Music2,
  Radio,
  RotateCcw,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageIntro } from "@/components/site-chrome";
import { extractAuthParam } from "@/lib/auth-params";
import { copyText } from "@/lib/clipboard";
import { supportUrl } from "@/lib/links";

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
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(() => search.token ?? "");
  const [manualInput, setManualInput] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<{ target: "token" | "command"; ok: boolean } | null>(
    null,
  );
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  useEffect(() => {
    if (search.token) setToken(search.token);
  }, [search.token]);

  const activeToken = token.trim();
  const botCommand = `,lastfm login ${activeToken}`;
  const copiedToken = copyStatus?.target === "token" && copyStatus.ok;
  const copiedCommand = copyStatus?.target === "command" && copyStatus.ok;
  const copyFailed = copyStatus !== null && !copyStatus.ok;

  const copyToClipboard = async (text: string, target: "token" | "command") => {
    const ok = await copyText(text);
    window.clearTimeout(copyTimer.current);
    setCopyStatus({ target, ok });
    copyTimer.current = window.setTimeout(() => setCopyStatus(null), ok ? 2000 : 5000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setToken(extractAuthParam(manualInput, "token").value);
  };

  const startOver = () => {
    setToken("");
    setManualInput("");
    setCopyStatus(null);
    void navigate({ to: "/lastfm", search: {}, replace: true });
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
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Authorization Token
                  </p>
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
                      onClick={() => void copyToClipboard(activeToken, "token")}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:w-auto ${
                        copiedToken
                          ? "bg-success text-background shadow-panel"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                      }`}
                    >
                      {copiedToken ? (
                        <>
                          <Check className="size-4 stroke-[2.5]" />
                          <span>Copied</span>
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
                    onClick={() => void copyToClipboard(botCommand, "command")}
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

              {copyFailed ? (
                <p role="alert" className="mt-3 text-xs text-destructive">
                  Couldn't copy automatically. Select the token or command and copy it manually.
                </p>
              ) : null}

              {/* Shown on every screen size: anyone who sends this token first can link it. */}
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border/60 bg-elevated/40 p-4 text-xs leading-5 text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                <p>
                  This token links your Last.fm account. Send it to Adore in a{" "}
                  <strong className="text-foreground">direct message</strong>, not in a server
                  channel, and don't share it with anyone else.
                </p>
              </div>

              {/* Mobile Support Link */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 sm:hidden">
                <button
                  type="button"
                  onClick={startOver}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Use a different token</span>
                </button>
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
                  <h3 className="mt-3 font-display text-xs font-bold sm:text-sm">
                    Open your DMs with Adore
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    Message Adore directly in Discord. Keep the token out of server channels.
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
                    in that DM to finish linking.
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
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={startOver}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Use a different token</span>
                  </button>
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

              {/* 3-step walkthrough (same layout as the Spotify page) */}
              <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 text-left">
                <div className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-sm font-bold text-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Start in Discord</h3>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      Type{" "}
                      <code className="rounded-sm bg-elevated px-1 font-mono text-[0.6875rem]">
                        ,lastfm login
                      </code>{" "}
                      in chat.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-sm font-bold text-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Authorize on Last.fm</h3>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      Click the link Adore sends you.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-sm font-bold text-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Return with Token</h3>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      Last.fm will redirect you back here.
                    </p>
                  </div>
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
                    aria-label="Authorization token or callback URL"
                    autoComplete="off"
                    spellCheck={false}
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
