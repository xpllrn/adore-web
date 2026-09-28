import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  KeyRound,
  ListMusic,
  Music2,
  Pause,
  Play,
  Radio,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageIntro } from "@/components/site-chrome";
import { extractAuthParam } from "@/lib/auth-params";
import { copyText } from "@/lib/clipboard";
import { supportUrl } from "@/lib/links";

type SpotifySearch = {
  code?: string | undefined;
  state?: string | undefined;
  error?: string | undefined;
};

export const Route = createFileRoute("/spotify")({
  validateSearch: (search: Record<string, unknown>): SpotifySearch => ({
    code: typeof search["code"] === "string" ? search["code"] : undefined,
    state: typeof search["state"] === "string" ? search["state"] : undefined,
    error: typeof search["error"] === "string" ? search["error"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Spotify Authorization | Adore" },
      {
        name: "description",
        content: "Authorize and connect your Spotify account to the Adore Discord bot.",
      },
      { property: "og:title", content: "Spotify Authorization | Adore" },
      {
        property: "og:description",
        content: "Authorize and connect your Spotify account to the Adore Discord bot.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/spotify" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/spotify" }],
  }),
  component: SpotifyPage,
});

function SpotifyPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>(() => search.code ?? "");
  const [authState, setAuthState] = useState<string | undefined>(() => search.state);
  const [error, setError] = useState<string>(() => search.error ?? "");
  const [manualInput, setManualInput] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<{ target: "code" | "url"; ok: boolean } | null>(
    null,
  );
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  useEffect(() => {
    if (search.code) {
      setCode(search.code);
      setAuthState(search.state);
    } else if (window.location.hash.includes("code=")) {
      // Some clients hand the code back in the fragment instead of the query string.
      const fromHash = extractAuthParam(window.location.hash, "code");
      setCode(fromHash.value);
      setAuthState(fromHash.state);
    }
    if (search.error) setError(search.error);
  }, [search.code, search.state, search.error]);

  const activeCode = code.trim();
  const copiedCode = copyStatus?.target === "code" && copyStatus.ok;
  const copiedUrl = copyStatus?.target === "url" && copyStatus.ok;
  const copyFailed = copyStatus !== null && !copyStatus.ok;

  // The bot accepts the whole redirect URL, so rebuild it with the code even when the code
  // arrived through the hash or the paste form (the address bar then has no ?code=).
  const redirectUrl = () => {
    const current = new URL(window.location.href);
    if (current.searchParams.get("code") === activeCode) return current.toString();
    const url = new URL("/spotify", window.location.origin);
    url.searchParams.set("code", activeCode);
    if (authState) url.searchParams.set("state", authState);
    return url.toString();
  };

  const copyToClipboard = async (text: string, target: "code" | "url") => {
    const ok = await copyText(text);
    window.clearTimeout(copyTimer.current);
    setCopyStatus({ target, ok });
    copyTimer.current = window.setTimeout(() => setCopyStatus(null), ok ? 2000 : 5000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    const parsed = extractAuthParam(manualInput, "code");
    setCode(parsed.value);
    setAuthState(parsed.state);
    setError("");
  };

  const startOver = () => {
    setCode("");
    setAuthState(undefined);
    setManualInput("");
    setCopyStatus(null);
    void navigate({ to: "/spotify", search: {}, replace: true });
  };

  return (
    <>
      <PageIntro
        eyebrow="Spotify Integration"
        title="Spotify Authorization"
        description="Connect your Spotify account to Adore to control playback, track what you're listening to, and stream music in voice."
      />

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 sm:pb-28">
        {activeCode ? (
          <div className="space-y-6">
            {/* Main Code Box */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-panel sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-success" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Authorization Code Ready
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1 text-xs text-muted-foreground">
                  <Music2 className="size-3.5 text-primary" />
                  <span>Spotify</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p
                    id="code-box-label"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Your Authorization Code
                  </p>
                  <span className="hidden text-[0.6875rem] text-muted-foreground sm:inline">
                    Click to select all
                  </span>
                </div>
                <div className="relative mt-2">
                  <div
                    id="code-box"
                    className="flex min-h-14 items-center break-all rounded-lg border border-border bg-background/90 p-4 font-mono text-sm font-semibold tracking-wide text-foreground select-all sm:pr-40 sm:text-base"
                  >
                    {activeCode}
                  </div>
                  <div className="mt-3 sm:absolute sm:right-2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(activeCode, "code")}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:w-auto ${
                        copiedCode
                          ? "bg-success text-background shadow-panel"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                      }`}
                    >
                      {copiedCode ? (
                        <>
                          <Check className="size-4 stroke-[2.5]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {copyFailed ? (
                  <p role="alert" className="mt-2 text-xs text-destructive">
                    Couldn't copy automatically. Select the code above and copy it manually.
                  </p>
                ) : null}
              </div>

              {/* Bot Instructions / Full Redirect URL Box */}
              <div className="mt-6 rounded-lg border border-border bg-elevated/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Next Step in Discord
                  </span>
                  <button
                    type="button"
                    onClick={() => void copyToClipboard(redirectUrl(), "url")}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    {copiedUrl ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copiedUrl ? "Copied URL" : "Copy Full URL"}</span>
                  </button>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="sm:hidden">
                    In your Discord DM with <strong>Adore</strong>, tap{" "}
                    <strong className="text-foreground">Paste Redirect URL</strong> and paste your
                    code or URL.
                  </span>
                  <span className="hidden sm:inline">
                    Go to your Direct Messages with <strong>Adore</strong>, click the green{" "}
                    <strong className="text-foreground">Paste Redirect URL</strong> button, and
                    paste your redirect URL or code into the modal to finish connecting!
                  </span>
                </p>
              </div>

              {/* Feature Highlights / Commands to try - Clean desktop showcase, hidden on phone */}
              <div className="mt-8 hidden border-t border-border pt-6 sm:block">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Commands to try once linked
                </h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Play className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify play
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Play any track, album, or playlist on Spotify
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Pause className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify pause
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Toggle pause and resume on your active device
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <ListMusic className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify toptracks
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        View your top 50 Spotify tracks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Radio className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify vc
                      </code>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Stream your active Spotify music in your voice channel
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
                    <span>Use a different code</span>
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
          /* Empty / No Code State */
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-panel sm:p-10">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-elevated text-muted-foreground">
                <KeyRound className="size-6 text-foreground" />
              </div>

              {error ? (
                <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>Authorization encountered an error ({error}). Please try again.</span>
                </div>
              ) : null}

              <h2 className="mt-4 font-display text-lg font-bold sm:text-xl">
                No authorization code found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                To link your Spotify account, start by using the{" "}
                <code className="rounded bg-elevated px-1.5 py-0.5 font-mono text-xs text-foreground">
                  ,spotify login
                </code>{" "}
                command in Discord.
              </p>

              {/* 3-step walkthrough */}
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
                        ,spotify login
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
                    <h3 className="text-sm font-semibold">Authorize on Spotify</h3>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      Click the link generated in your DMs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-sm font-bold text-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Return with Code</h3>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      Spotify will redirect you back here.
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual Code Input Fallback */}
              <div className="mt-6 border-t border-border pt-6 text-left sm:mt-8 sm:pt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Have a code or callback URL?
                </h3>
                <form
                  onSubmit={handleManualSubmit}
                  className="mt-3 flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Paste code or https://adore.rest/spotify?code=..."
                    aria-label="Authorization code or callback URL"
                    autoComplete="off"
                    spellCheck={false}
                    className="h-10 flex-1 rounded-md border border-input bg-background px-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Load Code
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
