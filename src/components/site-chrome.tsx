import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import profileAsset from "@/assets/adore-profile.png.asset.json";

const inspectorMessage = `

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠋⠁⠀⠉⠻⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠁⠀⠀⠀⠀⠀⠘⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇⠀⠀⠀⠀⠀⠀⠀⢹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣀⣤⣤⣤⣤⣤⣤⣄⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠞⠋⠉⠀⠀⢀⣀⣀⠀⠀⠈⠉⠙⠳⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⡴⢶⣤⣀⣤⣄⠀⠀⠀⠀⠀⠀⣿⣠⡴⠾⠛⠛⠉⠉⠉⠉⠛⠓⠶⣦⣄⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⡏⠀⠀⠈⠉⠀⠙⠛⠛⠳⣆⣠⠾⠋⠁⣀⢤⠀⠀⠀⠀⠀⠀⠀⠀⡤⣀⠉⠛⢶⣄⠀⠀⣼⠛⠻⣶⠞⠛⢶⡄⠀⠀
⠀⣠⣼⣷⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠁⠀⢠⠞⠁⠘⡇⠀⠀⠀⠀⠀⠀⢸⠁⠈⢳⡀⠀⠙⣷⡶⠟⠀⠀⠈⠀⠀⢠⡟⠀⠀
⣸⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⣿⠁⠀⠀⠘⠂⣄⣚⠁⠀⠀⠀⠀⠀⠀⠈⢓⣤⠔⠛⠀⢰⣏⠀⠀⠀⠀⠀⠀⠀⠙⠛⠻⣦
⠹⣦⣀⠀⠀⠀⠀⠀⠀⠀⣤⣤⠟⠀⠀⠀⣰⣿⣿⠉⣱⡄⠀⠀⠀⠀⢠⢾⣿⡏⠙⣆⠀⠀⢹⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽
⠀⣼⠏⠀⠀⠀⠀⠀⠀⠀⠉⣷⠀⢀⠤⢄⣻⡙⠿⠟⣩⠇⢀⣀⣀⠀⠸⣜⠻⠿⢋⣟⡠⠄⡘⢷⣤⡄⠀⠀⠀⠀⠀⣀⣴⠟
⠀⠹⢦⣴⠀⠀⠀⠀⠀⠠⣶⡟⢰⠁⠀⠀⢹⠉⠓⠛⣡⠞⠛⠉⠉⠛⢷⣌⠙⠚⠉⡏⠀⠀⠈⣿⡁⠀⠀⠀⠀⠀⠀⢻⡅⠀
⠀⠀⠀⢿⡀⠀⠀⠀⠀⠀⣸⠇⠈⠢⣀⣠⠜⠀⠀⣸⠏⠀⠀⠀⠀⠀⠀⢻⡆⠀⠀⠳⡄⠀⠜⠙⢳⡆⠀⠀⣀⣀⣀⣼⠃⠀
⠀⠀⠀⠈⠙⠛⠷⣤⡴⢾⣏⠀⠀⠀⡞⠉⠉⠓⠦⣿⡀⠀⠀⠀⠀⠀⠀⢸⣷⠖⠉⠉⠙⡆⠀⠀⠀⣿⣤⡾⠋⠉⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⣇⠀⠰⡀⠀⠈⢷⣄⠀⠀⠀⢀⣠⡟⠁⠀⡰⠃⠀⡎⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⡀⠀⠸⡄⠀⠙⢦⡀⠀⠉⠛⠳⠚⠛⠁⠀⢀⠜⠁⠀⡼⠁⠀⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠘⢦⡀⠀⠙⠲⢤⣀⣀⣀⣀⡤⠖⠁⠀⣠⠞⠁⠀⣴⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⡀⠙⠲⢄⣀⠀⠀⠀⠀⠀⠀⣀⡤⠚⠁⢀⣤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠶⣤⣀⣈⠉⠉⠉⠉⠉⠉⣀⣀⣤⠾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠛⠛⠛⠋⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀this u?

`;

export const ADORE_AVATAR =
  "https://cdn.discordapp.com/avatars/1510215071559847946/a2026a29a580b7c34f0b9ab736021aab.png?size=256";

export const inviteUrl =
  "https://discord.com/oauth2/authorize?client_id=1510215071559847946&permissions=8&integration_type=0&scope=bot";
export const supportUrl = "https://discord.gg/hbv97y5uxM";


export const DOCS_URL = "https://wiki.adore.rest";

export function SiteChrome({ children }: { children: ReactNode }) {
  const navItems: Array<{
    to?: "/" | "/commands" | "/premium" | "/embed" | "/status" | "/provably-fair";
    href?: string;
    label: string;
    mobile: boolean;
  }> = [
    { to: "/commands", label: "Commands", mobile: true },
    { to: "/provably-fair", label: "Fairness", mobile: true },
    { to: "/premium", label: "Premium", mobile: false },
    { to: "/embed", label: "Embed", mobile: false },
    { href: DOCS_URL, label: "Docs", mobile: false },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [popped, setPopped] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<"/" | "/commands" | "/premium" | "/embed" | "/docs" | "/status" | "/provably-fair" | null>(null);
  const navigate = useNavigate();

  function navigateKeepingScroll(to: "/" | "/commands" | "/premium" | "/embed" | "/docs" | "/status" | "/provably-fair") {
    setTapped(true);
    if (pathname !== to) setPendingRoute(to);
  }
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setPendingRoute(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const marker = "adore-inspector-message";
    const existing = Array.from(document.body.childNodes).find(
      (node) => node.nodeType === Node.COMMENT_NODE && node.textContent?.includes(marker),
    );
    if (existing) return;

    const comment = document.createComment(`${marker}${inspectorMessage}`);
    document.body.prepend(comment);
    return () => comment.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div data-scrolled={scrolled} className="island-shell mx-auto flex h-24 items-center justify-center px-3 sm:px-6">
          <nav
            aria-label="Main navigation"
            onAnimationEnd={(e) => {
              if (e.animationName === "island-pop") setPopped(true);
              if (e.animationName === "island-bounce") setTapped(false);
            }}
            className={`island-nav ${popped ? "" : "animate-island-pop"} pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border bg-nav/90 p-1.5 shadow-nav backdrop-blur-xl sm:gap-1 [scrollbar-width:none] ${tapped ? "animate-island-bounce" : ""}`}
          >
            <button
              type="button"
              onClick={() => navigateKeepingScroll("/")}
              aria-label="Home"
              className="shrink-0 rounded-full border border-border bg-elevated p-1 shadow-panel transition-colors hover:bg-secondary"
            >
              <img
                src={ADORE_AVATAR}
                onError={(e) => {
                  e.currentTarget.src = "/adore-profile.png";
                }}
                alt="Adore"
                className="size-7 rounded-full object-cover"
              />
            </button>
            {navItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${item.mobile ? "" : "hidden sm:inline-flex"} shrink-0 rounded-full px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:px-4 sm:text-xs`}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.to && navigateKeepingScroll(item.to)}
                  className={`${item.mobile ? "" : "hidden sm:inline-flex"} shrink-0 rounded-full px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:px-4 sm:text-xs ${pathname === item.to ? "bg-elevated text-foreground shadow-panel" : ""}`}
                >
                  {item.label}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => navigateKeepingScroll("/status")}
              className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:hidden ${pathname === "/status" ? "bg-elevated text-foreground shadow-panel" : ""}`}
            >
              Status
            </button>
            <span className="mx-1 h-5 w-px shrink-0 bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={() => navigateKeepingScroll("/status")}
              aria-label="Status and settings"
              title="Status"
              className={`shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground ${pathname === "/status" ? "bg-elevated text-foreground shadow-panel" : ""}`}
            >
              <Settings className="size-4" />
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div
          key={pathname}
          className={pendingRoute ? "page-transition-out" : "page-transition"}
          onAnimationEnd={(event) => {
            if (event.animationName !== "page-out" || !pendingRoute) return;
            void navigate({ to: pendingRoute });
          }}
        >
          {children}
        </div>
      </main>
      <CookieNotice />
    </div>
  );
}

function CookieNotice() {
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => {
    setChoice(window.localStorage.getItem("adore-cookie-choice"));
  }, []);

  function choose(value: string) {
    window.localStorage.setItem("adore-cookie-choice", value);
    setChoice(value);
  }

  if (choice) return null;
  return (
    <aside aria-label="Cookie preferences" className="fixed bottom-4 left-1/2 z-50 grid w-[min(92vw,42rem)] -translate-x-1/2 gap-4 rounded-md border border-border bg-nav/95 p-4 shadow-nav backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:items-center">
      <p className="text-xs leading-5 text-muted-foreground">
        We use cookies for analytics and ads. Read our <Link to="/privacy" className="text-foreground underline">privacy policy</Link>.
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => choose("rejected")} className="h-8 rounded-sm border border-border px-3 text-xs hover:bg-secondary">Reject</button>
        <button type="button" onClick={() => choose("accepted")} className="h-8 rounded-sm bg-foreground px-3 text-xs font-bold text-background hover:opacity-90">Accept all</button>
      </div>
    </aside>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
      <p className="font-mono text-xs uppercase text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl break-words font-display text-3xl font-black leading-tight sm:text-5xl lg:text-7xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:leading-7 lg:text-base">{description}</p>
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase text-muted-foreground">{children}</p>;
}