import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ExternalLink, Menu, Settings, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
    to?: "/" | "/commands" | "/premium" | "/embed" | "/status";
    href?: string;
    label: string;
    mobile: boolean;
  }> = [
    { to: "/commands", label: "Commands", mobile: true },
    { to: "/premium", label: "Premium", mobile: false },
    { to: "/embed", label: "Embed", mobile: false },
    { href: DOCS_URL, label: "Docs", mobile: false },
  ];

  // Phones only have room for a couple of links in the island, so every page is
  // also listed in a compact menu that opens below it.
  const menuItems = [...navItems, { to: "/status" as const, label: "Status", mobile: true }];

  const [scrolled, setScrolled] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [popped, setPopped] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [pendingRoute, setPendingRoute] = useState<
    "/" | "/commands" | "/premium" | "/embed" | "/docs" | "/status" | null
  >(null);
  const navigate = useNavigate();

  function navigateKeepingScroll(
    to: "/" | "/commands" | "/premium" | "/embed" | "/docs" | "/status",
  ) {
    setTapped(true);
    if (pathname !== to) setPendingRoute(to);
  }
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setPendingRoute(null);
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu on Escape, on a tap outside the island, or once the
  // screen is wide enough to show every link inline.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const wide = window.matchMedia("(min-width: 40rem)");
    const onWide = () => {
      if (wide.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

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
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div
          ref={shellRef}
          data-scrolled={scrolled}
          className="island-shell relative mx-auto flex h-24 items-center justify-center px-3 sm:px-6"
        >
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
                  className={`${item.mobile ? "" : "hidden sm:inline-flex"} shrink-0 rounded-full px-3 py-2 text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:px-4 sm:text-xs`}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.to && navigateKeepingScroll(item.to)}
                  aria-current={pathname === item.to ? "page" : undefined}
                  className={`${item.mobile ? "" : "hidden sm:inline-flex"} shrink-0 rounded-full px-3 py-2 text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:px-4 sm:text-xs ${pathname === item.to ? "bg-elevated text-foreground shadow-panel" : ""}`}
                >
                  {item.label}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => navigateKeepingScroll("/status")}
              aria-current={pathname === "/status" ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:hidden ${pathname === "/status" ? "bg-elevated text-foreground shadow-panel" : ""}`}
            >
              Status
            </button>
            <span className="mx-1 h-5 w-px shrink-0 bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={() => navigateKeepingScroll("/status")}
              aria-label="Status and settings"
              title="Status"
              className={`hidden shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:inline-flex ${pathname === "/status" ? "bg-elevated text-foreground shadow-panel" : ""}`}
            >
              <Settings className="size-4" />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:hidden ${menuOpen ? "bg-elevated text-foreground shadow-panel" : ""}`}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </nav>
          <nav
            id="site-menu"
            aria-label="Site menu"
            hidden={!menuOpen}
            className="animate-menu-in pointer-events-auto absolute inset-x-0 top-20 mx-auto w-[min(18rem,calc(100%-1.5rem))] rounded-3xl border border-border bg-nav/95 p-2 shadow-nav backdrop-blur-xl sm:hidden"
          >
            <ul className="grid gap-1">
              {menuItems.map((item) => {
                const itemClass =
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground";
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className={itemClass}
                      >
                        {item.label}
                        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          if (item.to) navigateKeepingScroll(item.to);
                        }}
                        aria-current={pathname === item.to ? "page" : undefined}
                        className={`${itemClass} ${pathname === item.to ? "bg-elevated text-foreground shadow-panel" : ""}`}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
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
    <aside
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-1/2 z-50 grid w-[min(92vw,42rem)] -translate-x-1/2 gap-4 rounded-md border border-border bg-nav/95 p-4 shadow-nav backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:items-center"
    >
      <p className="text-xs leading-5 text-muted-foreground">
        We use cookies for analytics and ads. Read our{" "}
        <Link to="/privacy" className="text-foreground underline">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="h-10 flex-1 rounded-sm border border-border px-3 text-xs hover:bg-secondary sm:h-8 sm:flex-none"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="h-10 flex-1 rounded-sm bg-foreground px-3 text-xs font-bold text-background hover:opacity-90 sm:h-8 sm:flex-none"
        >
          Accept all
        </button>
      </div>
    </aside>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-32 sm:px-6 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44 short:pb-8 short:pt-28">
      <p className="font-mono text-xs uppercase text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl break-words font-display text-3xl font-black leading-tight sm:text-5xl lg:text-7xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:leading-7 lg:text-base">
        {description}
      </p>
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.11em] text-muted-foreground leading-none">
      {children}
    </p>
  );
}
