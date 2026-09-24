import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, supportUrl } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy | Adore" }, { name: "description", content: "How the Adore website handles browser preferences and links to official support." },
    { property: "og:title", content: "Privacy | Adore" }, { property: "og:description", content: "Privacy information for the Adore public website." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/privacy" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/privacy" }] }), component: PrivacyPage,
});

function PrivacyPage() {
  return <>
    <PageIntro eyebrow="Privacy" title="Clear, minimal, and readable." description="This public site stores only your cookie preference in your browser. Discord and external services apply their own policies when you follow their links." />
    <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="divide-y divide-border border-y border-border">{[
        ["Browser preference", "When you accept or reject cookies, that choice is saved locally so the notice does not keep returning."],
        ["External links", "Inviting Adore, opening support, or using Discord takes you to services outside this website. Their privacy terms apply there."],
        ["No account data here", "This public frontend does not create accounts, process payments, or store submitted embed drafts."],
        ["Questions", "For account, bot, or data questions, contact the official Adore support community."],
      ].map(([title, text]) => <article key={title} className="grid gap-3 py-8 sm:grid-cols-[11rem_minmax(0,1fr)]"><h2 className="font-display text-sm font-bold">{title}</h2><p className="text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div>
      <a href={supportUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-11 items-center rounded-sm border border-border px-5 text-sm hover:bg-secondary">Contact official support</a>
    </section>
  </>;
}