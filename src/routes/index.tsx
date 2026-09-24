import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowDown, ArrowRight, Gauge, Headphones, LockKeyhole, MessageCircle, Play, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { inviteUrl, SectionLabel, supportUrl } from "@/components/site-chrome";
import { integrations, smallFeatures } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Adore | The all-in-one Discord app" },
    { name: "description", content: "Moderation, security, music, analytics, games, and 710+ commands for your Discord community." },
    { property: "og:title", content: "Adore | The all-in-one Discord app" },
    { property: "og:description", content: "One Discord app for safer, livelier communities." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});

function Index() {
  const marqueeItems = ["Anti-nuke", "Anti-raid", "Fake permissions", "Tickets", "VoiceMaster", "High-quality music", "Social feeds", "Giveaways", "Levels", "80+ TTS voices", "Image tools", ...integrations];

  return <>
    <section className="relative flex min-h-svh items-center overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="relative mx-auto w-full max-w-4xl text-center">
        <h1 className="mx-auto max-w-3xl font-display text-7xl font-black leading-none sm:text-8xl lg:text-9xl">Adore<span className="sr-only">, the all-in-one Discord app</span></h1>
        <p className="mx-auto mt-5 max-w-xl font-mono text-xs leading-6 text-muted-foreground sm:mt-6 sm:text-sm sm:leading-7">Powerful moderation, security, integrations, music, and community tools, brought together in one focused app.</p>
        <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3">
          <a href={inviteUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground px-3 text-[13px] font-bold text-background sm:px-5 sm:text-sm"><Plus className="size-4 shrink-0" /> Add to Discord</a>
          <Link to="/status" className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-surface px-3 text-[13px] shadow-panel hover:bg-elevated sm:px-5 sm:text-sm"><Gauge className="size-4 shrink-0" /> System status</Link>
          <a href={supportUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-surface px-3 text-[13px] shadow-panel hover:bg-elevated sm:px-5 sm:text-sm"><MessageCircle className="size-4 shrink-0" /> Support server</a>
          <Link to="/commands" className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-surface px-3 text-[13px] shadow-panel hover:bg-elevated sm:px-5 sm:text-sm">View commands <ArrowRight className="size-4 shrink-0" /></Link>

        </div>
        <div className="mx-auto mt-10 grid max-w-md grid-cols-3 sm:mt-12">
          {[['1,195', 'servers'], ['232,371', 'users'], ['1,600+', 'commands']].map(([value, label], index) => <div key={label} className={`min-w-0 px-2 py-1 text-center sm:px-7 ${index > 0 ? "border-l border-border" : ""}`}><strong className="block truncate font-display text-base font-bold sm:text-xl">{value}</strong><p className="mt-2 truncate font-mono text-[8px] uppercase text-muted-foreground sm:text-[10px]">{label}</p></div>)}
        </div>
      </div>
      <ArrowDown className="absolute bottom-5 left-1/2 size-4 -translate-x-1/2 text-muted-foreground" aria-hidden="true" />
    </section>

    <section className="scroll-reveal py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><SectionLabel>One bot, no compromises</SectionLabel><h2 className="mt-4 font-display text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">Built for every moment in your server.</h2></div><p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">From the first suspicious join to the song everyone queues at midnight, Adore keeps the essential tools close and the noise out.</p></div>
        <div className="mt-10 grid auto-rows-[minmax(14rem,auto)] gap-3 md:grid-cols-2 lg:grid-cols-3">
          <article className="relative overflow-hidden rounded-md border border-border bg-surface p-6 shadow-panel md:row-span-2 lg:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase text-muted-foreground">Protection</span><ShieldCheck className="size-5" /></div><h3 className="mt-10 max-w-xs font-display text-2xl font-black sm:mt-14 sm:text-3xl">Your server stays yours.</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">Anti-nuke and anti-raid controls react before damage spreads.</p><div className="mt-10 space-y-1">{["Suspicious join blocked", "Role escalation stopped", "Channel deletion reversed"].map((item, index) => <div key={item} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3"><span className="size-1.5 rounded-full bg-success"/><span className="truncate text-xs">{item}</span><span className="font-mono text-[9px] text-muted-foreground">{index + 1}s</span></div>)}</div></article>
          <article className="rounded-md border border-border bg-surface p-6 shadow-panel lg:col-span-2 lg:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase text-muted-foreground">Live activity</span><Activity className="size-5" /></div><div className="mt-10 flex h-20 items-end gap-1.5 sm:h-24">{[35,58,42,78,52,88,64,95,72,84,62,91,76,100,82,94].map((height,index)=><span key={index} className="min-w-0 flex-1 rounded-t-sm bg-strong transition-colors hover:bg-foreground" style={{height:`${height}%`}} />)}</div><div className="mt-4 flex items-center justify-between"><strong className="font-display text-xl">12,842 actions</strong><span className="font-mono text-[9px] uppercase text-muted-foreground">Last 24 hours</span></div></article>
          <article className="rounded-md border border-border bg-surface p-6 shadow-panel lg:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase text-muted-foreground">Now playing</span><Headphones className="size-5" /></div><div className="mt-12 flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-foreground text-background"><Play className="size-4 fill-current" /></span><div className="min-w-0"><p className="truncate text-sm font-bold">Community radio</p><p className="mt-1 truncate text-xs text-muted-foreground">High quality audio</p></div></div><div className="mt-7 h-1 overflow-hidden rounded-full bg-elevated"><div className="h-full w-2/3 rounded-full bg-foreground" /></div></article>
          <article className="rounded-md border border-border bg-surface p-6 shadow-panel lg:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase text-muted-foreground">Community</span><Sparkles className="size-5" /></div><div className="mt-10 grid grid-cols-3 gap-2 text-center">{[["24","levels"],["8","events"],["326","rewards"]].map(([value,label])=><div key={label} className="min-w-0 py-3"><strong className="font-display text-lg">{value}</strong><p className="mt-1 truncate font-mono text-[8px] uppercase text-muted-foreground">{label}</p></div>)}</div><p className="mt-5 text-sm leading-6 text-muted-foreground">Levels, games, giveaways, and rewards keep everyone involved.</p></article>
        </div>
      </div>
    </section>

    <section className="scroll-reveal overflow-hidden py-10 sm:py-16" aria-label="Adore capabilities">
      <div className="feature-marquee flex w-max">
        {[0, 1].map((copy) => <div key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 ? "true" : undefined}>
          {marqueeItems.map((item) => <span key={`${copy}-${item}`} className="shrink-0 rounded-full border border-border bg-surface px-5 py-3 text-xs text-muted-foreground shadow-panel">{item}</span>)}
        </div>)}
      </div>
    </section>

    <section className="scroll-reveal py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6"><div className="overflow-hidden rounded-md border border-border bg-surface shadow-panel"><div className="grid lg:grid-cols-[0.9fr_1.1fr]"><div className="p-6 sm:p-9 lg:p-12"><SectionLabel>Control center</SectionLabel><h2 className="mt-5 font-display text-2xl font-black leading-tight sm:text-4xl">Powerful tools that still feel simple.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Turn protection on, tune the limits, and let Adore handle the routine work while your team stays in control.</p><div className="mt-9 flex flex-wrap gap-2">{["Anti-nuke","AutoMod","Join gate","Fake permissions"].map(item=><span key={item} className="rounded-full border border-border px-3 py-2 text-[10px] text-muted-foreground">{item}</span>)}</div></div><div className="border-t border-border p-4 sm:p-6 lg:border-l lg:border-t-0"><div className="flex items-center justify-between border-b border-border px-2 pb-4"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-success"/><span className="text-xs font-bold">Protection active</span></div><LockKeyhole className="size-4 text-muted-foreground"/></div>{[["Anti-nuke","Enabled"],["Join velocity","12 / min"],["Risky accounts","Auto quarantine"],["Staff override","2 members"]].map(([name,value])=><div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-2 py-5 last:border-0"><span className="text-xs text-muted-foreground">{name}</span><strong className="text-right text-xs">{value}</strong></div>)}</div></div></div></div>
    </section>

    <section className="scroll-reveal py-16 sm:py-24 lg:py-32"><div className="mx-auto max-w-6xl px-4 sm:px-6"><SectionLabel>Countless more features</SectionLabel><div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">{smallFeatures.map((feature) => <article key={feature.title} className="rounded-md border border-border bg-surface p-5 shadow-panel sm:p-6"><feature.icon className="size-5" /><h3 className="mt-10 font-display text-lg font-bold sm:mt-14 sm:text-xl lg:mt-16">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p></article>)}</div><Link to="/commands" className="mt-4 grid min-h-28 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 rounded-md border border-border bg-surface p-5 shadow-panel hover:bg-elevated sm:min-h-32 sm:p-6"><div className="min-w-0"><span className="font-mono text-[10px] uppercase text-muted-foreground">Library</span><h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">Over 710 commands</h3></div><ArrowRight className="size-5 shrink-0" /></Link></div></section>

    <section className="scroll-reveal py-20 sm:py-28 lg:py-36"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><SectionLabel>Ready when you are</SectionLabel><h2 className="mt-5 font-display text-3xl font-black sm:mt-6 sm:text-5xl lg:text-6xl">Get Adore in your server today.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground">Join communities using one focused app for daily operations and everything members enjoy.</p><a href={inviteUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-sm bg-foreground px-6 text-sm font-bold text-background sm:mt-8 sm:w-auto"><Plus className="size-4" /> Add to Discord</a></div></section>
  </>;
}
