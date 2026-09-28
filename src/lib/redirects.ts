import { API_ORIGIN, DASHBOARD_URL, inviteUrl, supportUrl } from "./links";

/*
 * Shortlinks, OAuth return paths, and the /api proxy.
 *
 * These used to live in public/_redirects, but Cloudflare Pages skips that file for
 * every request the worker handles, and this app's worker handles all routes
 * (dist/_routes.json includes "/*"). Serving them from the server entry makes them
 * work in production and in `vite dev`.
 */

type RedirectTarget = {
  to: string;
  /** Carry the incoming query string over (needed for ?code= / ?token= OAuth returns). */
  keepQuery: boolean;
};

const EXACT_REDIRECTS: Record<string, RedirectTarget> = {
  "/invite": { to: inviteUrl, keepQuery: false },
  "/support": { to: supportUrl, keepQuery: false },
  "/discord": { to: supportUrl, keepQuery: false },
  // There is no /tos page yet; this keeps the old shortlink pointing where it will live.
  "/terms": { to: "/tos", keepQuery: true },
  "/spotify/verify": { to: "/spotify", keepQuery: true },
  "/spotify/callback": { to: "/spotify", keepQuery: true },
  "/lastfm/verify": { to: "/lastfm", keepQuery: true },
  "/lastfm/callback": { to: "/lastfm", keepQuery: true },
  "/dashboard": { to: DASHBOARD_URL, keepQuery: true },
};

const DASHBOARD_PREFIX = "/dashboard/";

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function redirectResponse(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: { location, "cache-control": "no-store" },
  });
}

/** Returns a 302 response when the URL is a known shortlink, otherwise null. */
export function matchRedirect(url: URL): Response | null {
  const path = normalizePath(url.pathname);
  const rule = EXACT_REDIRECTS[path.toLowerCase()];
  if (rule) {
    const target = new URL(rule.to, url.origin);
    if (rule.keepQuery && url.search) {
      new URLSearchParams(url.search).forEach((value, key) => target.searchParams.append(key, value));
    }
    // Keep same-site redirects relative so they work on any host (preview, custom domain).
    const location =
      target.origin === url.origin ? `${target.pathname}${target.search}` : target.toString();
    return redirectResponse(location);
  }

  if (url.pathname.toLowerCase().startsWith(DASHBOARD_PREFIX)) {
    const splat = url.pathname.slice(DASHBOARD_PREFIX.length);
    return redirectResponse(`${DASHBOARD_URL}/${splat}${url.search}`);
  }

  return null;
}

export function isApiPath(pathname: string): boolean {
  return pathname === "/api" || pathname.startsWith("/api/");
}

// Hop-by-hop and host headers must not be forwarded to the upstream.
const STRIPPED_REQUEST_HEADERS = ["host", "connection", "keep-alive", "upgrade", "te", "trailer"];
// fetch() hands back a decoded body, so these would no longer describe it.
const STRIPPED_RESPONSE_HEADERS = ["content-encoding", "content-length", "transfer-encoding"];

/** Transparent proxy: /api/<path> -> https://api.adore.rest/api/<path>. */
export async function proxyApi(request: Request, url: URL): Promise<Response> {
  const upstream = new URL(`${url.pathname}${url.search}`, API_ORIGIN);
  const headers = new Headers(request.headers);
  for (const name of STRIPPED_REQUEST_HEADERS) headers.delete(name);
  headers.set("x-forwarded-host", url.host);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const init: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers,
    redirect: "manual",
  };
  if (hasBody) {
    init.body = request.body;
    init.duplex = "half";
  }

  try {
    const response = await fetch(upstream, init);
    const responseHeaders = new Headers(response.headers);
    for (const name of STRIPPED_RESPONSE_HEADERS) responseHeaders.delete(name);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("API proxy request failed", error);
    return new Response(JSON.stringify({ error: "Bad gateway" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
