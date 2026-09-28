/**
 * Pulls an OAuth value (Spotify `code`, Last.fm `token`) out of whatever the user pasted:
 * a full callback URL, a URL without scheme, a bare query string (`?code=…`, `code=…`), a
 * hash fragment, or the raw value itself.
 */
export function extractAuthParam(
  input: string,
  key: string,
): { value: string; state: string | undefined } {
  const trimmed = input.trim();
  const sources: URLSearchParams[] = [];

  // Only treat the input as a URL when it clearly is one (has a scheme, or a path/query after
  // a host). Otherwise "code=abc" would parse as a hostname and hide the parameter.
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) || /^[^\s?#=]+\.[^\s?#=]+[/?#]/.test(trimmed)) {
    try {
      const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
      sources.push(url.searchParams, new URLSearchParams(url.hash.replace(/^#/, "")));
    } catch {
      // Not a parseable URL: fall through to the query-string parse below.
    }
  }
  if (trimmed.includes("=")) {
    sources.push(new URLSearchParams(trimmed.replace(/^[^?#]*[?#]/, "")));
  }

  for (const params of sources) {
    const value = params.get(key)?.trim();
    if (value) return { value, state: params.get("state") ?? undefined };
  }
  return { value: trimmed, state: undefined };
}
