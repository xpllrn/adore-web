import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Bot, ExternalLink, Headphones, Shield, SlidersHorizontal } from "lucide-react";
import { PageIntro } from "@/components/site-chrome";
import { OFFICIAL_DOCS_URL, useLiveStatus } from "@/lib/uptime";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation | Adore" },
      { name: "description", content: "Start using Adore and learn its moderation, music, community, and customization tools." },
      { property: "og:title", content: "Documentation | Adore" },
      { property: "og:description", content: "Setup and feature guidance for the Adore Discord app." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/docs" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/docs" }],
  }),
  component: DocsPage,
});

function DocsPage() {
  const { uptime } = useLiveStatus();
  const docs = [
    {
      icon: Bot,
      title: "Getting started",
      text: "Invite Adore, choose its permissions, and run your first command.",
      link: `${OFFICIAL_DOCS_URL}/docs/configuration/setup`,
      steps: [
        "Invite Adore to a server you manage",
        "Confirm the requested Discord permissions",
        "Open the command catalogue and choose a feature",
      ],
    },
    {
      icon: Shield,
      title: "Moderation & security",
      text: "Configure filters, anti-raid protection, action limits, and moderation history.",
      link: `${OFFICIAL_DOCS_URL}/docs/security/overview`,
      steps: [
        "Set automod filters for links, invites, spam, and words",
        "Choose anti-nuke limits for sensitive actions",
        "Review warnings, mutes, kicks, and bans in case history",
      ],
    },
    {
      icon: Headphones,
      title: "Music & integrations",
      text: "Connect listening profiles, play music, and track social accounts.",
      link: `${OFFICIAL_DOCS_URL}/docs/features/music`,
      steps: [
        "Join a voice channel before starting playback",
        "Connect Last.fm for listening commands",
        "Select channels for social post notifications",
      ],
    },
    {
      icon: SlidersHorizontal,
      title: "Community setup",
      text: "Set up levels, welcomes, tickets, voice rooms, and automatic replies.",
      link: `${OFFICIAL_DOCS_URL}/docs/configuration/autorole`,
      steps: [
        "Create staff-facing support ticket categories",
        "Configure welcome and role messages",
        "Use VoiceMaster for personal voice channels",
      ],
    },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Adore docs"
        title="From invite to indispensable."
        description="Practical guidance for setting up Adore and putting its core systems to work in your community."
      />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        {/* Live status bar with live ticking uptime */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-3 shadow-panel">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="size-2 rounded-full bg-success" />
            <span className="font-semibold text-foreground">All systems operational</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Uptime: <strong className="font-mono text-foreground">{uptime}</strong>
            </span>
          </div>
          <Link
            to="/status"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View live status →
          </Link>
        </div>

        {/* Official Documentation Portal Card */}
        <div className="mb-8 rounded-lg border border-border bg-surface p-6 shadow-panel sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-success" />
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Official Documentation
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Explore the Complete Wiki &amp; Docs
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Comprehensive documentation covering Adore security, antinuke, tickets, role management, music, embed scripting, and configuration is hosted on our official wiki.
              </p>
            </div>
            <a
              href={OFFICIAL_DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-bold text-background shadow-panel transition-opacity hover:opacity-90"
            >
              Open wiki.adore.rest <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {docs.map((doc) => (
            <article key={doc.title} className="flex flex-col rounded-md border border-border bg-surface p-6 shadow-panel sm:p-8">
              <doc.icon className="size-5" />
              <h2 className="mt-8 font-display text-xl font-bold">{doc.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{doc.text}</p>
              <ol className="mt-6 grid gap-3">
                {doc.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 text-xs leading-5">
                    <span className="font-mono text-muted-foreground">0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-6">
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:underline"
                >
                  Read full guide on wiki <ExternalLink className="size-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 rounded-md border border-border bg-elevated p-6 shadow-panel sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <BookOpen className="size-5" />
            <h2 className="mt-5 font-display text-xl font-bold">Need a specific command?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Search the categorized command catalogue.</p>
          </div>
          <Link
            to="/commands"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-foreground px-5 text-sm font-bold text-background"
          >
            Browse commands <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}