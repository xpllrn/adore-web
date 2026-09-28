// Shared external links. Kept free of React so the server entry can import it too.

export const DISCORD_CLIENT_ID = "1510215071559847946";

export const ADORE_AVATAR = `https://cdn.discordapp.com/avatars/${DISCORD_CLIENT_ID}/a2026a29a580b7c34f0b9ab736021aab.png?size=256`;

export const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=8&integration_type=0&scope=bot`;

export const supportUrl = "https://discord.gg/hbv97y5uxM";

export const FALLBACK_AVATAR = "/adore-profile.png";

/** `<img onError>` handler: swap a broken remote avatar for the bundled copy, once (no retry loop). */
export function showFallbackAvatar(event: { currentTarget: HTMLImageElement }) {
  const img = event.currentTarget;
  if (!img.src.endsWith(FALLBACK_AVATAR)) img.src = FALLBACK_AVATAR;
}

export const DOCS_URL = "https://wiki.adore.rest";

export const DASHBOARD_URL = "https://dash.adore.rest";

export const API_ORIGIN = "https://api.adore.rest";
