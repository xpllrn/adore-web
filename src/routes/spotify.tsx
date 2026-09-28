import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Flame,
  KeyRound,
  ListMusic,
  Music2,
  Radio,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro, supportUrl } from "@/components/site-chrome";

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
  const [code, setCode] = useState<string>(() => search.code ?? "");
  const [error, setError] = useState<string>(() => search.error ?? "");
  const [manualInput, setManualInput] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (search.code) {
      setCode(search.code);
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCode = params.get("code");
      if (urlCode) {
        setCode(urlCode);
      } else if (window.location.hash.includes("code=")) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, "?"));
        const hashCode = hashParams.get("code");
        if (hashCode) setCode(hashCode);
      }

      const urlError = params.get("error");
      if (urlError) {
        setError(urlError);
      }
    }
  }, [search.code]);

  const activeCode = code.trim();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async (text: string, type: "code" | "url") => {
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

      if (type === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    try {
      if (manualInput.includes("code=")) {
        const parsed = new URL(
          manualInput.startsWith("http") ? manualInput : `https://${manualInput}`,
        );
        const extracted = parsed.searchParams.get("code");
        if (extracted) {
          setCode(extracted);
          return;
        }
      }
    } catch {
      // Treat as raw code if not a valid URL
    }

    setCode(manualInput.trim());
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
                  <label
                    htmlFor="code-box"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Your Authorization Code
                  </label>
                  <span className="hidden text-[11px] text-muted-foreground sm:inline">
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
                      onClick={() => copyToClipboard(activeCode, "code")}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:w-auto ${
                        copiedCode
                          ? "bg-success text-success-foreground shadow-md"
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
              </div>

              {/* Bot Instructions / Full Redirect URL Box */}
              <div className="mt-6 rounded-lg border border-border bg-elevated/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Next Step in Discord
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(currentUrl || activeCode, "url")}
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
                    <Radio className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify play
                      </code>
                      <p className="text-[11px] text-muted-foreground">
                        Play any track, album, or playlist on Spotify
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <ListMusic className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify pause
                      </code>
                      <p className="text-[11px] text-muted-foreground">
                        Toggle pause and resume on your active device
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Flame className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify toptracks
                      </code>
                      <p className="text-[11px] text-muted-foreground">
                        View your top 50 Spotify tracks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-elevated/40 p-3">
                    <Trophy className="size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <code className="font-mono text-xs font-bold text-foreground">
                        ,spotify vc
                      </code>
                      <p className="text-[11px] text-muted-foreground">
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
                    <h3 className="text-xs font-bold">Start in Discord</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Type{" "}
                      <code className="rounded bg-elevated px-1 font-mono text-[10px]">
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
                    <h3 className="text-xs font-bold">Authorize on Spotify</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Click the link generated in your DMs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-sm font-bold text-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">Return with Code</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
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
