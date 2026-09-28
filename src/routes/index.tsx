import { createFileRoute, Link } from "@tanstack/react-router";
import { AdaptiveSlider } from "@/components/ui/adaptive-slider";
import { WaveformScrub } from "@/components/ui/waveform-scrub-base";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Gauge,
  Headphones,
  LockKeyhole,
  MessageCircle,
  SkipBack,
  SkipForward,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { inviteUrl, SectionLabel, supportUrl } from "@/components/site-chrome";
import { integrations, smallFeatures } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adore | The all-in-one Discord app" },
      {
        name: "description",
        content:
          "Moderation, security, music, analytics, games, and 710+ commands for your Discord community.",
      },
      { property: "og:title", content: "Adore | The all-in-one Discord app" },
      { property: "og:description", content: "One Discord app for safer, livelier communities." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

// Royalty-free demo tracks (CodeSkulptor public assets). Swap in your own hosted audio as needed.
const demoTracks = [
  {
    title: "The Neverwritten Role Playing Game",
    artist: "Kangaroo MusiQue",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
  },
  {
    title: "&nbsp;",
    artist: "Sevish",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
  },
  {
    title: "Galaxy Invaders",
    artist: "CodeSkulptor",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/GalaxyInvaders/theme_01.mp3",
  },
  {
    title: "Soundtrack",
    artist: "Sounddogs",
    src: "https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.mp3",
  },
];

function Index() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const marqueeItems = [
    "Anti-nuke",
    "Anti-raid",
    "Fake permissions",
    "Tickets",
    "VoiceMaster",
    "High-quality music",
    "Social feeds",
    "Giveaways",
    "Levels",
    "80+ TTS voices",
    "Image tools",
    ...integrations,
  ];

  const currentSong = demoTracks[currentSongIndex] ?? demoTracks[0]!;

  const nextSong = () => setCurrentSongIndex((i) => (i + 1) % demoTracks.length);
  const prevSong = () =>
    setCurrentSongIndex((i) => (i - 1 + demoTracks.length) % demoTracks.length);
  // Auto-advance to the next track and keep playing.
  const handleSongEnded = () => {
    nextSong();
    setIsPlaying(true);
  };

  return (
    <>
      <section className="relative flex min-h-svh items-center overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:py-32 short:pb-16 short:pt-24">
        <div className="relative mx-auto w-full max-w-7xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 short:gap-8 text-center lg:text-left">
          <div className="lg:max-w-2xl mx-auto lg:mx-0">
            {/* Height-aware so the wordmark doesn't swallow landscape phone screens. */}
            <h1 className="font-mono text-[clamp(4rem,min(15vw,20svh),8rem)] font-black tracking-[0.14em] leading-none uppercase text-foreground">
              Adore<span className="sr-only">, the all-in-one Discord app</span>
            </h1>
            <p className="mx-auto lg:mx-0 mt-5 max-w-xl text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed text-balance text-muted-foreground sm:mt-6">
              Powerful moderation, security, integrations, music, and community tools, brought
              together in one focused app.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-lg flex-col gap-8 lg:mx-0 lg:max-w-md">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <a
                href={inviteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap min-[360px]:gap-2 rounded-md bg-foreground px-2 text-[0.8125rem] min-[360px]:px-3 min-[360px]:text-[0.875rem] font-bold text-background sm:px-5 sm:text-[0.9375rem]"
              >
                <Plus className="size-4 shrink-0" /> Add to Discord
              </a>
              <Link
                to="/status"
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap min-[360px]:gap-2 rounded-md border border-border bg-surface px-2 text-[0.8125rem] min-[360px]:px-3 min-[360px]:text-[0.875rem] shadow-panel hover:bg-elevated sm:px-5 sm:text-[0.9375rem]"
              >
                <Gauge className="size-4 shrink-0" /> System status
              </Link>
              <a
                href={supportUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap min-[360px]:gap-2 rounded-md border border-border bg-surface px-2 text-[0.8125rem] min-[360px]:px-3 min-[360px]:text-[0.875rem] shadow-panel hover:bg-elevated sm:px-5 sm:text-[0.9375rem]"
              >
                <MessageCircle className="size-4 shrink-0" /> Support server
              </a>
              <Link
                to="/commands"
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap min-[360px]:gap-2 rounded-md border border-border bg-surface px-2 text-[0.8125rem] min-[360px]:px-3 min-[360px]:text-[0.875rem] shadow-panel hover:bg-elevated sm:px-5 sm:text-[0.9375rem]"
              >
                View commands <ArrowRight className="size-4 shrink-0" />
              </Link>
            </div>
            <div className="grid grid-cols-3">
              {[
                ["1,195", "servers"],
                ["232,371", "users"],
                ["1,600+", "commands"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`min-w-0 px-2 py-1 text-center sm:px-7 ${index > 0 ? "border-l border-border" : ""}`}
                >
                  <strong className="block truncate font-display text-base font-bold sm:text-xl">
                    {value}
                  </strong>
                  <p className="mt-2 truncate font-mono text-[0.5rem] uppercase text-muted-foreground sm:text-[0.625rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <ArrowDown className="size-4 text-muted-foreground animate-bounce" aria-hidden="true" />
        </div>
      </section>

      <section className="scroll-reveal py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <SectionLabel>One bot, no compromises</SectionLabel>
              <h2 className="mt-4 font-display text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Built for every moment in your server.
              </h2>
            </div>
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-balance text-muted-foreground lg:justify-self-end">
              From the first suspicious join to the song everyone queues at midnight, Adore keeps
              the essential tools close and the noise out.
            </p>
          </div>
          <div className="mt-10 grid auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <article className="relative overflow-hidden rounded-md border border-border bg-surface p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 md:row-span-2 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted-foreground leading-none">
                  Protection
                </span>
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-10 max-w-xs font-display text-2xl font-black sm:mt-14 sm:text-3xl">
                Your server stays yours.
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-balance text-muted-foreground">
                Anti-nuke and anti-raid controls react before damage spreads.
              </p>
              <div className="mt-10 space-y-1">
                {[
                  "Suspicious join blocked",
                  "Role escalation stopped",
                  "Channel deletion reversed",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3"
                  >
                    <span className="size-1.5 rounded-full bg-success" />
                    <span className="truncate text-xs">{item}</span>
                    <span className="font-mono text-[0.5625rem] text-muted-foreground">{index + 1}s</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-md border border-border bg-surface p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 lg:col-span-2 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted-foreground leading-none">
                  Live activity
                </span>
                <Activity className="size-5" />
              </div>
              <div className="mt-10 flex h-20 items-end gap-1.5 sm:h-24">
                {[35, 58, 42, 78, 52, 88, 64, 95, 72, 84, 62, 91, 76, 100, 82, 94].map(
                  (height, index) => (
                    <span
                      key={index}
                      className="min-w-0 flex-1 rounded-t-sm bg-strong transition-colors hover:bg-foreground"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <strong className="font-display text-xl">12,842 actions</strong>
                <span className="font-mono text-[0.5625rem] uppercase text-muted-foreground">
                  Last 24 hours
                </span>
              </div>
            </article>
            <article className="flex flex-col justify-between rounded-md border border-border bg-surface p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted-foreground leading-none">
                  Now playing
                </span>
                <Headphones className="size-5" />
              </div>
              <WaveformScrub
                className="mt-8 px-0 py-0"
                src={currentSong.src}
                fileName={currentSong.title}
                playing={isPlaying}
                onPlayingChange={setIsPlaying}
                onEnded={handleSongEnded}
              />
              <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
                <button
                  type="button"
                  onClick={prevSong}
                  aria-label="Previous track"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipBack className="size-4 fill-current" />
                </button>
                <div className="min-w-0 text-center">
                  <p className="truncate text-xs text-muted-foreground">{currentSong.artist}</p>
                  <p className="mt-1 font-mono text-[0.5625rem] uppercase text-muted-foreground">
                    Track {currentSongIndex + 1} of {demoTracks.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={nextSong}
                  aria-label="Next track"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward className="size-4 fill-current" />
                </button>
              </div>
            </article>
            <article className="rounded-md border border-border bg-surface p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 lg:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted-foreground leading-none">
                  Community
                </span>
                <Sparkles className="size-5" />
              </div>
              <div className="mt-10 grid grid-cols-3 gap-2 text-center">
                {[
                  ["24", "levels"],
                  ["8", "events"],
                  ["326", "rewards"],
                ].map(([value, label]) => (
                  <div key={label} className="min-w-0 py-3">
                    <strong className="font-display text-lg">{value}</strong>
                    <p className="mt-1 truncate font-mono text-[0.5rem] uppercase text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-balance text-muted-foreground">
                Levels, games, giveaways, and rewards keep everyone involved.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="scroll-reveal overflow-hidden py-10 sm:py-16"
        aria-label="Adore capabilities"
      >
        <div className="feature-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 gap-3 pr-3"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="shrink-0 rounded-full border border-border bg-surface px-5 py-3 text-xs text-muted-foreground shadow-panel"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-reveal py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-md border border-border bg-surface shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 sm:p-9 lg:p-12">
                <SectionLabel>Control center</SectionLabel>
                <h2 className="mt-5 font-display text-2xl font-black leading-tight sm:text-4xl">
                  Powerful tools that still feel simple.
                </h2>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-balance text-muted-foreground">
                  Turn protection on, tune the limits, and let Adore handle the routine work while
                  your team stays in control.
                </p>
                <div className="mt-9 flex flex-wrap gap-2">
                  {["Anti-nuke", "AutoMod", "Join gate", "Fake permissions"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-2 text-[0.625rem] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-border p-4 sm:p-6 lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between border-b border-border px-2 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-success" />
                    <span className="text-xs font-bold">Protection active</span>
                  </div>
                  <LockKeyhole className="size-4 text-muted-foreground" />
                </div>
                {[
                  ["Anti-nuke", "Enabled"],
                  ["Join velocity", "12 / min"],
                  ["Risky accounts", "Auto quarantine"],
                  ["Staff override", "2 members"],
                ].map(([name, value]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-2 py-5 last:border-0"
                  >
                    <span className="text-xs text-muted-foreground">{name}</span>
                    <strong className="text-right text-xs">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionLabel>Countless more features</SectionLabel>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {smallFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-md border border-border bg-surface p-5 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 sm:p-6"
              >
                <feature.icon className="size-5" />
                <h3 className="mt-10 font-display text-lg font-bold sm:mt-14 sm:text-xl lg:mt-16">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-balance text-muted-foreground">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
          <Link
            to="/commands"
            className="mt-4 grid min-h-28 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 rounded-md border border-border bg-surface p-5 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 hover:bg-elevated sm:min-h-32 sm:p-6"
          >
            <div className="min-w-0">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted-foreground leading-none">
                Library
              </span>
              <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">Over 710 commands</h3>
            </div>
            <ArrowRight className="size-5 shrink-0" />
          </Link>
        </div>
      </section>

      <section className="scroll-reveal py-20 sm:py-28 lg:py-36 short:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionLabel>Ready when you are</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-black sm:mt-6 sm:text-5xl lg:text-6xl">
            Get Adore in your server today.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-balance text-muted-foreground">
            Join communities using one focused app for daily operations and everything members
            enjoy.
          </p>
          <a
            href={inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-sm bg-foreground px-6 text-sm font-bold text-background sm:mt-8 sm:w-auto"
          >
            <Plus className="size-4" /> Add to Discord
          </a>
        </div>
      </section>
    </>
  );
}
