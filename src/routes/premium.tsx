import { createFileRoute } from "@tanstack/react-router";
import { Check, ExternalLink, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { inviteUrl, PageIntro, supportUrl } from "@/components/site-chrome";

export const Route = createFileRoute("/premium")({
  head: () => ({ meta: [
    { title: "Premium | Adore" }, { name: "description", content: "Unlock Adore's premium Discord community tools." },
    { property: "og:title", content: "Premium | Adore" }, { property: "og:description", content: "Premium security, music, and community tools for Adore." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/premium" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/premium" }] }), component: PremiumPage,
});

function PremiumPage() {
  const benefits = ["Personal prefix", "Personal aliases", "Voice transcription", "Image background removal", "Custom Last.fm embed", "Custom Last.fm trigger", "Priority support"];
  return <>
    <PageIntro eyebrow="Adore premium" title="More control. Less compromise." description="Unlock the deeper tools that help ambitious communities stay safe, active, and easy to run." />
    <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-[1fr_1.25fr]">
      <div className="grid gap-4">
        {[{ icon: ShieldCheck, title: "Protection", text: "More granular guardrails for raids, nukes, filters, and permissions." }, { icon: Zap, title: "Performance", text: "Keep daily staff workflows and member experiences in one dependable place." }, { icon: Sparkles, title: "Experience", text: "Give members premium audio, games, profiles, and richer community tools." }].map((item) => <article key={item.title} className="rounded-md border border-border bg-surface p-6 shadow-panel">
          <item.icon className="size-5" /><h2 className="mt-8 font-display text-lg font-bold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
        </article>)}
      </div>
      <article className="rounded-md border border-strong bg-elevated p-6 shadow-panel sm:p-9">
        <p className="font-mono text-xs uppercase text-muted-foreground">For your server</p>
        <h2 className="mt-4 font-display text-3xl font-black">Adore Premium</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">$10 / month.</strong> Perks follow your user account across servers. Checkout is handled through Adore’s official Discord community.</p>
        <ul className="my-10 grid gap-4">{benefits.map((benefit) => <li key={benefit} className="flex gap-3 text-sm"><Check className="size-4 shrink-0" />{benefit}</li>)}</ul>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href={supportUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-foreground px-4 text-sm font-bold text-background">Ask about Premium <ExternalLink className="size-4" /></a>
          <a href={inviteUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center rounded-sm border border-border px-4 text-sm hover:bg-secondary">Invite Adore</a>
        </div>
      </article>
    </section>
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28"><div className="grid gap-6 rounded-md border border-border bg-surface p-6 shadow-panel sm:grid-cols-[1fr_1.2fr] sm:p-9"><div><p className="font-mono text-xs uppercase text-muted-foreground">Custom instance</p><h2 className="mt-4 font-display text-2xl font-black sm:text-3xl">Your own Adore.</h2><p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">$25</strong> for your own custom instance.</p><a href={supportUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-border px-4 text-xs font-bold hover:bg-elevated">Get a custom instance <ExternalLink className="size-3.5" /></a></div><ul className="grid content-start gap-3 text-sm">{["Instance owner role", "Custom branding", "Dedicated bot instance and hosting", "24/7 priority support", "Three transfers included"].map((item) => <li key={item} className="flex gap-3"><Check className="size-4 shrink-0" />{item}</li>)}</ul></div></section>
  </>;
}