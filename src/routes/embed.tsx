import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-chrome";
import { MessageBuilder } from "@/components/message-builder";

export const Route = createFileRoute("/embed")({
  head: () => ({ meta: [
    { title: "Embed Builder | Adore" }, { name: "description", content: "Compose and preview a rich Discord embed for Adore." },
    { property: "og:title", content: "Embed Builder | Adore" }, { property: "og:description", content: "Draft polished Discord messages with Adore's embed builder." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/embed" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/embed" }] }), component: EmbedPage,
});

function EmbedPage() {
  return <>
    <PageIntro eyebrow="Message studio" title="Build every part of your message." description="Design a classic embed or a Components V2 container, preview it live, then copy the generated code into Adore." />
    <MessageBuilder />
  </>;
}