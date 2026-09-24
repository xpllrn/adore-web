import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Info,
  RefreshCw,
  ShieldCheck,
  XCircle,
  Code2,
  Calculator,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/provably-fair")({
  head: () => ({
    meta: [
      { title: "Provably Fair | Adore" },
      {
        name: "description",
        content:
          "Cryptographically verifiable bet outcomes. Verify seeds, rotate keys, and audit your game history.",
      },
      { property: "og:title", content: "Provably Fair | Adore" },
      {
        property: "og:description",
        content:
          "Verify seeds, rotate keys, and audit game outcomes cryptographically with SHA-256 and HMAC.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/provably-fair" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/provably-fair" }],
  }),
  component: ProvablyFairPage,
});

// ---------------------------------------------------------------------------
// Cryptographic Helpers (Web Crypto API)
// ---------------------------------------------------------------------------

async function computeSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function computeHmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const msgData = encoder.encode(message);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  const sigArray = Array.from(new Uint8Array(signature));
  return sigArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateRandomHex(bytes = 32): string {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const PYTHON_CODE_SNIPPET = `import hmac
import hashlib


def provably_fair_roll(server_seed: str, client_seed: str, nonce: int) -> tuple[float, float]:
    message = f"{client_seed}:{nonce}"
    digest = hmac.new(
        key=server_seed.encode(),
        msg=message.encode(),
        digestmod=hashlib.sha256,
    ).hexdigest()

    hex_chars = digest[:8]
    value = int(hex_chars, 16) / 2**32
    roll = round(value * 99.99, 2)

    return value, roll


if __name__ == "__main__":
    value, roll = provably_fair_roll(
        server_seed="61bca4f500d029bb9998bc891b54b50d3da74ff22f5b69a62d73e29caed0ca82",
        client_seed="default",
        nonce=1
    )
    print("Normalized value:", value)
    print("Roll (0–99.99):", roll)`;

function ProvablyFairPage() {
  // Active seed state
  const [serverSeed, setServerSeed] = useState(
    "61bca4f500d029bb9998bc891b54b50d3da74ff22f5b69a62d73e29caed0ca82"
  );
  const [seedHash, setSeedHash] = useState(
    "e8c0be57c70359a6d3c8596b51d602c2621082b84544bb87a86cb975d5d128b4"
  );
  const [clientSeed, setClientSeed] = useState("default");
  const [newClientSeedInput, setNewClientSeedInput] = useState("");
  const [nonce, setNonce] = useState(1);

  // Rotation history & revealed seed
  const [revealedServerSeed, setRevealedServerSeed] = useState<string | null>(null);
  const [revealedHash, setRevealedHash] = useState<string | null>(null);

  // Verification tool state
  const [verifyServerSeedInput, setVerifyServerSeedInput] = useState("");
  const [verifySeedHashInput, setVerifySeedHashInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<{
    tested: boolean;
    valid: boolean;
    computedHash: string;
  } | null>(null);

  // Interactive Live Bet Verifier state
  const [calcServerSeed, setCalcServerSeed] = useState(
    "61bca4f500d029bb9998bc891b54b50d3da74ff22f5b69a62d73e29caed0ca82"
  );
  const [calcClientSeed, setCalcClientSeed] = useState("default");
  const [calcNonce, setCalcNonce] = useState("1");
  const [calcResult, setCalcResult] = useState<{
    digest: string;
    hexChars: string;
    value: number;
    roll: number;
    coinflip: string;
    roulette: number;
  } | null>(null);

  // Copy feedback tracking
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Initialize hash for current server seed if not set
  useEffect(() => {
    computeSha256(serverSeed).then((hash) => {
      setSeedHash(hash);
    });
  }, [serverSeed]);

  // Rotate Server Seed handler
  const handleRotateSeed = async () => {
    const oldSeed = serverSeed;
    const oldHash = seedHash;
    const newSeed = generateRandomHex(32);
    const newHash = await computeSha256(newSeed);

    setRevealedServerSeed(oldSeed);
    setRevealedHash(oldHash);
    setServerSeed(newSeed);
    setSeedHash(newHash);
    setNonce(0);

    // Auto-fill verifier with revealed seed for convenience
    setVerifyServerSeedInput(oldSeed);
    setVerifySeedHashInput(oldHash);
    setVerifyResult(null);

    toast.success("Server seed rotated! Previous seed revealed.");
  };

  // Save new client seed
  const handleSaveClientSeed = () => {
    const trimmed = newClientSeedInput.trim();
    if (!trimmed) {
      toast.error("Please enter a valid client seed");
      return;
    }
    setClientSeed(trimmed);
    setNewClientSeedInput("");
    toast.success("Client seed updated!");
  };

  // Verify Previous Seed handler
  const handleVerifySeed = async () => {
    const trimmedSeed = verifyServerSeedInput.trim();
    const trimmedHash = verifySeedHashInput.trim().toLowerCase();

    if (!trimmedSeed || !trimmedHash) {
      toast.error("Please enter both the server seed and seed hash");
      return;
    }

    try {
      const computed = await computeSha256(trimmedSeed);
      const isMatch = computed.toLowerCase() === trimmedHash;
      setVerifyResult({
        tested: true,
        valid: isMatch,
        computedHash: computed,
      });
    } catch {
      toast.error("Failed to compute SHA-256 hash");
    }
  };

  // Live calculation of bet outcome
  const handleCalculateBet = useCallback(async () => {
    const sSeed = calcServerSeed.trim();
    const cSeed = calcClientSeed.trim();
    const n = parseInt(calcNonce.trim(), 10);

    if (!sSeed || !cSeed || isNaN(n) || n < 0) {
      toast.error("Invalid parameters for bet calculation");
      return;
    }

    try {
      const message = `${cSeed}:${n}`;
      const digest = await computeHmacSha256(sSeed, message);
      const hexChars = digest.slice(0, 8);
      const value = parseInt(hexChars, 16) / Math.pow(2, 32);
      const roll = Math.round(value * 99.99 * 100) / 100;
      const coinflip = roll < 50 ? "Heads" : "Tails";
      const roulette = Math.floor(value * 37);

      setCalcResult({
        digest,
        hexChars,
        value,
        roll,
        coinflip,
        roulette,
      });
    } catch {
      toast.error("Failed to compute HMAC outcome");
    }
  }, [calcServerSeed, calcClientSeed, calcNonce]);

  useEffect(() => {
    handleCalculateBet();
  }, [handleCalculateBet]);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f2f4f7] selection:bg-primary/20">
      <div className="mx-auto max-w-5xl px-4 pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Page Title & Intro */}
        <header className="mb-8">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-6 text-foreground" />
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              Provably Fair
            </h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-mono">
            Every bet is cryptographically verifiable. Verify seeds, rotate keys, and audit your
            game history.
          </p>
        </header>

        {/* Revealed Seed Notice (if recently rotated) */}
        {revealedServerSeed && (
          <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-emerald-300">
                  Previous Server Seed Revealed
                </h3>
                <p className="mt-1 text-xs text-emerald-200/70 font-mono break-all">
                  Seed: <span className="text-emerald-100">{revealedServerSeed}</span>
                </p>
                <p className="mt-0.5 text-xs text-emerald-200/70 font-mono break-all">
                  Hash: <span className="text-emerald-100">{revealedHash}</span>
                </p>
                <p className="mt-2 text-[11px] text-emerald-300/80">
                  This seed has been pre-filled into the "Verify a Previous Seed" form below. You can
                  now verify all past bets made with this seed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ========================================================================= */}
          {/* LEFT COLUMN */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6">
            {/* Active Seeds Card */}
            <section className="rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
              <h2 className="text-sm font-semibold tracking-wide text-foreground">
                Active Seeds
              </h2>

              <div className="mt-4 space-y-4">
                {/* Seed Hash */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                    SEED HASH (SHA-256)
                  </label>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2.5">
                    <span className="font-mono text-xs text-foreground/90 break-all select-all">
                      {seedHash}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(seedHash, "seedHash")}
                      className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Seed Hash"
                    >
                      {copiedKey === "seedHash" ? (
                        <Check className="size-4 text-emerald-400" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Client Seed */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                    CLIENT SEED
                  </label>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2.5">
                    <span className="font-mono text-xs text-foreground/90 break-all select-all">
                      {clientSeed}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(clientSeed, "clientSeed")}
                      className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Client Seed"
                    >
                      {copiedKey === "clientSeed" ? (
                        <Check className="size-4 text-emerald-400" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Nonce */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                    NONCE
                  </label>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2.5">
                    <span className="font-mono text-xs text-foreground/90">
                      {nonce}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(String(nonce), "nonce")}
                      className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Nonce"
                    >
                      {copiedKey === "nonce" ? (
                        <Check className="size-4 text-emerald-400" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground font-mono">
                The nonce increments with each bet. Each bet's outcome is derived from:{" "}
                <code className="text-foreground/90 bg-[#1c1e22] px-1 py-0.5 rounded">
                  HMAC_SHA256(server_seed, client_seed:nonce)
                </code>
                .
              </p>
            </section>

            {/* Rotate Server Seed Card */}
            <section className="rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
              <h2 className="text-sm font-semibold tracking-wide text-foreground">
                Rotate Server Seed
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                This reveals the current server seed so you can verify past bets, and generates a new
                one. Your nonce resets to 0.
              </p>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRotateSeed}
                  className="w-full flex items-center justify-center gap-2 border-border/80 bg-[#1c1e22] hover:bg-[#25282c] text-foreground text-xs sm:text-sm font-medium h-10 rounded-lg transition-all"
                >
                  <RefreshCw className="size-4" />
                  <span>Rotate Seed</span>
                </Button>
              </div>
            </section>

            {/* Change Client Seed Card */}
            <section className="rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
              <h2 className="text-sm font-semibold tracking-wide text-foreground">
                Change Client Seed
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Set your own client seed to influence bet outcomes. This proves you have control
                over the randomness input.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter new client seed"
                  value={newClientSeedInput}
                  onChange={(e) => setNewClientSeedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveClientSeed();
                  }}
                  className="flex-1 rounded-lg border border-border/70 bg-[#0e1011] px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveClientSeed}
                  className="h-9 px-4 rounded-lg bg-[#25282c] hover:bg-[#2e3237] text-xs font-semibold text-foreground border border-border/70"
                >
                  Save
                </Button>
              </div>
            </section>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6">
            {/* Verify a Previous Seed Card */}
            <section className="rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
              <h2 className="text-sm font-semibold tracking-wide text-foreground">
                Verify a Previous Seed
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                After rotating your seed, paste the revealed server seed here along with the seed
                hash to verify they match.
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                    SERVER SEED
                  </label>
                  <input
                    type="text"
                    placeholder="Enter revealed server seed"
                    value={verifyServerSeedInput}
                    onChange={(e) => setVerifyServerSeedInput(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                    SEED HASH
                  </label>
                  <input
                    type="text"
                    placeholder="Enter seed hash to verify against"
                    value={verifySeedHashInput}
                    onChange={(e) => setVerifySeedHashInput(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVerifySeed}
                  className="w-full flex items-center justify-center gap-2 border-border/80 bg-[#1c1e22] hover:bg-[#25282c] text-foreground text-xs sm:text-sm font-medium h-10 rounded-lg transition-all"
                >
                  <ShieldCheck className="size-4" />
                  <span>Verify</span>
                </Button>

                {/* Verification Outcome Alert */}
                {verifyResult && (
                  <div
                    className={`mt-3 rounded-lg border p-3.5 text-xs ${
                      verifyResult.valid
                        ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-300"
                        : "border-destructive/40 bg-destructive/10 text-destructive-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {verifyResult.valid ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                      ) : (
                        <XCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {verifyResult.valid
                            ? "Commitment Verified!"
                            : "Hash Mismatch Error!"}
                        </p>
                        <p className="mt-1 text-[11px] opacity-90">
                          {verifyResult.valid
                            ? "The SHA-256 digest of this server seed matches the committed hash exactly. The server did not alter the seed during play."
                            : "The computed SHA-256 hash does not match the provided commitment hash."}
                        </p>
                        <p className="mt-1.5 font-mono text-[10px] break-all opacity-75">
                          Computed: {verifyResult.computedHash}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* How It Works Card */}
            <section className="rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
              <h2 className="text-sm font-semibold tracking-wide text-foreground">
                How It Works
              </h2>

              <ol className="mt-3 space-y-2.5 text-xs text-muted-foreground font-mono leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-bold">1.</span>
                  <span>
                    Before you bet, the server commits to a seed by showing you its{" "}
                    <strong className="text-foreground">SHA-256</strong> hash.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-bold">2.</span>
                  <span>
                    Each bet uses{" "}
                    <code className="text-foreground bg-[#1c1e22] px-1 py-0.5 rounded">
                      HMAC_SHA256(server_seed, client_seed:nonce)
                    </code>{" "}
                    to compute the outcome.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-bold">3.</span>
                  <span>
                    The nonce increments with every bet, ensuring unique outcomes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-bold">4.</span>
                  <span>
                    When you rotate, the server reveals the old seed — hash it yourself to
                    confirm it matches.
                  </span>
                </li>
              </ol>
            </section>

            {/* How to Verify a Specific Bet Card */}
            <section className="rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-foreground">
                  How to Verify a Specific Bet
                </h2>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PYTHON_CODE_SNIPPET, "pythonCode")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedKey === "pythonCode" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Code2 className="size-3.5" />
                  )}
                  <span>{copiedKey === "pythonCode" ? "Copied!" : "Copy code"}</span>
                </button>
              </div>

              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Compute the following script to verify that any bet you placed was fair and not
                manipulated:
              </p>

              {/* Code Snippet Box */}
              <div className="mt-3 relative rounded-lg border border-border/60 bg-[#0a0b0d] p-3.5 font-mono text-[11px] leading-5 text-neutral-300 overflow-x-auto [scrollbar-width:thin]">
                <pre className="whitespace-pre">
                  <code>{PYTHON_CODE_SNIPPET}</code>
                </pre>
              </div>

              {/* Highlighted Example Callout */}
              <div className="mt-3 rounded-lg border border-sky-500/25 bg-sky-950/20 p-3.5 font-mono text-xs leading-relaxed text-sky-200">
                <p>
                  <strong className="text-sky-100">Example:</strong> If server seed is{" "}
                  <code className="text-sky-300 bg-sky-900/40 px-1 py-0.5 rounded">
                    b06df407e4..
                  </code>
                  , client seed is <strong className="text-sky-100">DEFAULT</strong>, and you want
                  to verify bet #3, compute:{" "}
                  <code className="text-sky-300 bg-sky-900/40 px-1 py-0.5 rounded">
                    provably_fair_roll("b06df407e4..", "default", 3)
                  </code>
                  . The house cannot fake this because the seed hash was locked before you bet.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE BET OUTCOME AUDITOR (Live in Browser) */}
        {/* ========================================================================= */}
        <section className="mt-8 rounded-xl border border-border/70 bg-[#141618] p-5 sm:p-6 shadow-panel">
          <div className="flex items-center gap-2">
            <Calculator className="size-5 text-foreground" />
            <h2 className="text-base font-semibold text-foreground">
              Interactive Bet Outcome Auditor
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Audit any historical bet outcome directly in your browser without needing to run Python.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                Server Seed
              </label>
              <input
                type="text"
                value={calcServerSeed}
                onChange={(e) => setCalcServerSeed(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                Client Seed
              </label>
              <input
                type="text"
                value={calcClientSeed}
                onChange={(e) => setCalcClientSeed(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                Nonce
              </label>
              <input
                type="number"
                value={calcNonce}
                onChange={(e) => setCalcNonce(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border/60 bg-[#0e1011] px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          {calcResult && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg border border-border/50 bg-[#0e1011] p-3">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  Hex Digest Prefix
                </span>
                <p className="mt-1 font-mono text-sm font-bold text-foreground">
                  {calcResult.hexChars}
                </p>
                <span className="text-[9px] font-mono text-muted-foreground">
                  First 8 chars
                </span>
              </div>
              <div className="rounded-lg border border-border/50 bg-[#0e1011] p-3">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  Normalized Float
                </span>
                <p className="mt-1 font-mono text-sm font-bold text-foreground">
                  {calcResult.value.toFixed(6)}
                </p>
                <span className="text-[9px] font-mono text-muted-foreground">
                  Range: 0.0 – 1.0
                </span>
              </div>
              <div className="rounded-lg border border-border/50 bg-[#0e1011] p-3">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  Dice / Game Roll
                </span>
                <p className="mt-1 font-mono text-sm font-bold text-emerald-400">
                  {calcResult.roll}
                </p>
                <span className="text-[9px] font-mono text-muted-foreground">
                  Range: 0.00 – 99.99
                </span>
              </div>
              <div className="rounded-lg border border-border/50 bg-[#0e1011] p-3">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  Coinflip / Roulette
                </span>
                <p className="mt-1 font-mono text-sm font-bold text-sky-400">
                  {calcResult.coinflip} / #{calcResult.roulette}
                </p>
                <span className="text-[9px] font-mono text-muted-foreground">
                  Deterministic outcome
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
