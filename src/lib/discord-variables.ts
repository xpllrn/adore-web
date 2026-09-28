export const variableGroups = {
  Server: [
    "{guild.name}",
    "{guild.id}",
    "{guild.membercount}",
    "{guild.boost_count}",
    "{guild.boost_tier}",
    "{guild.role_count}",
    "{guild.emoji_count}",
    "{guild.channels_count}",
    "{guild.owner_id}",
    "{guild.created_at}",
  ],
  Member: [
    "{user.name}",
    "{user.mention}",
    "{user.id}",
    "{user.avatar}",
    "{user.created_at}",
    "{user.joined_at}",
  ],
  Channel: ["{channel.name}", "{channel.mention}", "{channel.id}", "{channel.topic}"],
  "Date & time": ["{date}", "{time}", "{timestamp}", "{timestamp.relative}"],
};

export const sampleVariables: Record<string, string> = {
  // Server & Channel
  "{guild.name}": "Adore Community",
  "{guild.id}": "120493827102",
  "{guild.membercount}": "232,375",
  "{guild.boost_count}": "48",
  "{guild.boost_tier}": "3",
  "{guild.role_count}": "36",
  "{guild.emoji_count}": "120",
  "{guild.channels_count}": "42",
  "{guild.owner_id}": "1029384756",
  "{guild.created_at}": "September 19, 2024",
  "{ctx.guild.name}": "Adore Community",
  "{ctx.prefix}": ",",
  "{self._prefix()}": ",",
  "{channel.name}": "general",
  "{channel.mention}": "#general",
  "{channel.id}": "564738291",
  "{channel.topic}": "The main community chat",

  // Users & Authors
  "{user.name}": "stella",
  "{user.mention}": "@stella",
  "{user.id}": "918273645",
  "{user.avatar}": "avatar",
  "{user.created_at}": "May 8, 2021",
  "{user.joined_at}": "Today",
  "{ctx.author.name}": "stella",
  "{ctx.author.display_name}": "stella",
  "{ctx.author.mention}": "@stella",
  "{author.name}": "stella",
  "{author.display_name}": "stella",
  "{author.mention}": "@stella",
  "{target.name}": "alex",
  "{target.display_name}": "alex",
  "{target.mention}": "@alex",
  "{target_user.mention}": "@alex",
  "{interaction.user.mention}": "@stella",
  "{interaction.user.id}": "918273645",
  "{message.author.mention}": "@stella",
  "<@{self.target_id}>": "@alex",
  "<@{target_id}>": "@alex",
  "<@{quote.owner_id}>": "@stella",
  "<@{owner_id}>": "@stella",

  // Date & Time
  "{date}": "September 19, 2026",
  "{time}": "10:53 AM",
  "{timestamp}": "September 19 at 10:53 AM",
  "{timestamp.relative}": "a few seconds ago",

  // Discord Emotes (real tokens)
  "{emote.approve}": "<:approve:1545804705735647298>",
  "{emote.warn}": "<:warn:1545805127271714968>",
  "{emote.error}": "<:warn:1545805127271714968>",
  "{emote.deny}": "<:warn:1545805127271714968>",
  "{emote.cooldown}": "<:cooldown:1545804785805172807>",
  "{emote.info}": "<:cooldown:1545804785805172807>",
  "{emote.loading}": "<a:loading:1545804965958914170>",
  "{emote.wait}": "<a:loading:1545804965958914170>",
  "{emote.confetti}": "🎉",
  "{emote.tree}": "🌳",
  "{emote.heartbreak}": "💔",
  "{emote.pingspin}": "💫",
  "{emote.lastfm}": "🎵",
  "{emote_str}": "🍀 ",
  "{COINFLIP}": "🪙",
  "{COWCASH}": "🪙",
  "{outcome_emoji}": "🪙",
  "{landed_emoji}": "🔴",
  "{SHAZAM_EMOJI}": "🎵",
  "{ring_emote}": "💍",
  "{tier_emote}": "🏢",

  // Economy & Gambling Game Values
  "{cupi_total}": "7",
  "{player_total}": "11",
  "{cupi_dice}": "⚂ ⚃",
  "{player_dice}": "⚅ ⚄",
  "{user_choice}": "heads",
  "{outcome}": "heads",
  "{profit}": "25,000",
  "{bet_amount}": "10,000",
  "{bet_label}": "red (1-18)",
  "{landed}": "14",
  "{landed_color}": "red",
  "{landed_color.title()}": "Red",
  "{d_status}": "18",
  "{d_cards}": "🂡 🂧",
  "{p_status}": "20",
  "{p_cards}": "🂪 🂺",
  "{status}": "Player stands with 20. Dealer stands with 18.",

  // Business & Stocks
  "{biz['name']}": "Starlight Cafe",
  "{res['business_name']}": "Starlight Cafe",
  "{self.business_name}": "Starlight Cafe",
  "{quote.display_name}": "Starlight Cafe",
  "{quote.ticker}": "STR",
  "{ticker}": "STR",
  "{quote.tier_emote}": "☕",
  "{quote.tier_name}": "Boutique Cafe",
  "{tier_name}": "Boutique Cafe",
  "{quote.level}": "3",
  "{level}": "2",
  "{next_level}": "3",
  "{next_level + 1}": "4",
  "{role_str}": "Managing Partner",
  "{role_note}": "",
  "{quote.market_cap_str}": "1,250,000 coins",
  "{rate_str}": "+15,000 coins / hr",
  "{acc_str}": "60,000 coins (4 hrs)",
  "{cap_str}": "Max 24h storage (360,000 cap)",
  "{partners_str}": "@stella (85%), @alex (15%)",
  "{streak_str}": "🔥 5-day streak (+10% bonus)",
  "{streak_note}": "🔥 5-day streak (+10%)",
  "{name_line}": "**Starlight Cafe** (Tier 2)",
  "{cost_info}": "50,000 coins",
  "{remaining}": "18",
  "{self.TARGET_SERVED}": "10",
  "{self.served}": "7",
  "{self.moves}": "6",
  "{self.MAX_MOVES}": "16",
  "{StockShelvesView.MAX_MOVES}": "16",
  "{RushHourView.TARGET_SERVED}": "10",
  "{details}": "100% orders served accurately",
  "{wage}": "12,500",
  "{owner_id}": "918273645",
  "{avg_buy_str}": "120 coins/share",
  "{user_pl_str}": "+1,250 coins (+4.2%)",
  "{sign}": "+",
  "{raiders_count}": "4",
  "{raider_mentions}": "@stella, @alex, @jordan, @taylor",
  "{culprits_str}": "@alex, @jordan, @taylor",
  "{transfer_str}": "5,000 coins were seized as a security penalty.",
  "{dm_fees_str}": "Entry fees pool (10,000 coins) credited to your wallet!",
  "{item['name']}": "Lucky Clover",
  "{item['num_id']}": "42",
  "{target_phrase}": "Cupi Commercial Enterprise Agreement #4892",
  "{mode_desc}":
    "Clock in for your daily business shift to earn wages and boost company stock value.",
  "{ODDS_LINE}": "Odds: Common 60% · Rare 30% · Epic 9% · Legendary 1%",
  "{pity_str}": "Pity: 0/3 duds",
  "{pity_status}": "Pity: 1/3 duds",
  "{page_footer}": "Page 1/4 (18 items available)",
  "{quote}": "> *“You thought you could rob me in my own city?”*",
  "{body}": "🍒 | 🍋 | 🍇 ➔ **No match!** Lost 1,000 coins.",
  "{deadline_str}": "in 2 days (September 29, 2026)",
  "{next_collect_str}": "in 42 minutes",
};

export function renderVariables(value: string): string {
  if (!value) return "";

  // 1. Direct dictionary replacements
  let text = Object.entries(sampleVariables).reduce(
    (acc, [variable, sample]) => acc.split(variable).join(sample),
    value,
  );

  // 2. Author AST objects: {name=...; icon_url=...} -> clean name
  text = text.replace(/\{name=([^;]+?)(?:;\s*icon_url=[^}]*?)?\}/g, (_m, rawName) => {
    const trimmed = rawName.trim();
    if (/ctx\.author|user\.name|member\.name|author_name/i.test(trimmed)) {
      return "stella";
    }
    if (/guild\.name/i.test(trimmed)) {
      return "Adore Community";
    }
    return trimmed;
  });

  // 3. Discord relative / full timestamp tags: <t:deadline_ts:f>, <t:1727464800:R>, etc.
  text = text.replace(/<t:(?:\{[^{}]+\}|[0-9]+)(?::([a-zA-Z]))?>/g, (_m, flag) => {
    switch (flag) {
      case "R":
        return "in 2 hours";
      case "f":
      case "F":
        return "September 27, 2026 at 11:30 PM";
      case "d":
      case "D":
        return "09/27/2026";
      case "t":
      case "T":
        return "11:30 PM";
      default:
        return "September 27, 2026 at 11:30 PM";
    }
  });

  // 4. format_currency(...) calls
  text = text.replace(/\{format_currency\((.*?)\)\}/g, (_m, expr) => {
    const key = expr.trim().toLowerCase();
    if (key.includes("bet_amount")) return "10,000";
    if (key.includes("profit")) return "25,000";
    if (key.includes("principal")) return "100,000";
    if (key.includes("debt")) return "50,000";
    if (key.includes("on_time")) return "105,000";
    if (key.includes("late")) return "120,000";
    if (key.includes("stolen")) return "42,500";
    if (key.includes("storage")) return "500,000";
    if (key.includes("transfer")) return "25,000";
    if (key.includes("fee") || key.includes("steal")) return "2,500";
    if (key.includes("collected") || key.includes("pool")) return "15,000";
    if (key.includes("max")) return "250,000";
    return "25,000";
  });

  // 5. Number formatted with commas: {cost:,}, {total_earnings:,}, etc.
  text = text.replace(/\{([A-Za-z0-9_.'\[\]]+):,\}/g, (_m, expr) => {
    const key = expr.trim().toLowerCase();
    if (key.includes("invested")) return "1,000,000";
    if (key.includes("refund_total")) return "800,000";
    if (key.includes("claimed")) return "45,000";
    if (key.includes("earnings")) return "60,000";
    if (key.includes("raised")) return "350,000";
    if (key.includes("refunded")) return "75,000";
    if (key.includes("lifetime")) return "850,000";
    if (key.includes("license")) return "500,000";
    if (key.includes("cost")) return "25,000";
    if (key.includes("wage")) return "12,500";
    if (key.includes("wallet")) return "125,000";
    if (key.includes("bank")) return "450,000";
    if (key.includes("storage")) return "500,000";
    if (key.includes("shares") || key.includes("rem_shares")) return "250";
    if (key.includes("stake")) return "8,000";
    if (key.includes("float")) return "2,000";
    if (key.includes("price")) return "125";
    if (key.includes("rate")) return "15,000";
    if (key.includes("amount")) return "50,000";
    if (key.includes("gross")) return "12,500";
    if (key.includes("net")) return "12,250";
    if (key.includes("fee")) return "250";
    if (key.includes("realized")) return "4,500";
    return "10,000";
  });

  // 6. Formatted floats: {pct * 100:.1f}, {impact_pct:.1f}, etc.
  text = text.replace(/\{([A-Za-z0-9_.* '\[\]]+):\.\d+f\}/g, (_m, expr) => {
    const key = expr.trim().toLowerCase();
    if (key.includes("impact")) return "2.4";
    if (key.includes("pl")) return "18.2";
    if (key.includes("owner")) return "80.0";
    if (key.includes("float")) return "20.0";
    return "35.0";
  });

  // 7. General fallback for remaining {identifiers}
  text = text.replace(/\{([A-Za-z0-9_.'\[\]]+)\}/g, (match, expr) => {
    const key = expr.trim().toLowerCase();
    if (key.includes("mention")) return "@stella";
    if (key.includes("name") || key.includes("title")) return "Starlight Cafe";
    if (
      key.includes("total") ||
      key.includes("sum") ||
      key.includes("balance") ||
      key.includes("coins")
    )
      return "50,000";
    if (key.includes("id")) return "42";
    if (
      key.includes("workers") ||
      key.includes("count") ||
      key.includes("shares") ||
      key.includes("level")
    )
      return "5";
    if (key.includes("rate") || key.includes("pct") || key.includes("percent")) return "15";
    if (
      key.includes("url") ||
      key.includes("avatar") ||
      key.includes("logo") ||
      key.includes("icon")
    )
      return "https://cdn.discordapp.com/embed/avatars/0.png";
    if (key.includes("author") || key.includes("user") || key.includes("member")) return "stella";
    if (key.includes("guild") || key.includes("server")) return "Adore Community";
    if (key.includes("prefix")) return ",";
    if (key.includes("channel")) return "#general";
    if (key.includes("role")) return "@Member";
    if (key.includes("prize")) return "50,000 coins";
    if (key.includes("error") || key.includes("err") || key.includes("exc"))
      return "An unexpected error occurred.";
    return match;
  });

  return text;
}
