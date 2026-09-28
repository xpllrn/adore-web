# Cupi Embeds - Complete Redesign Reference

Every embed cupi sends, formatted for clean redesign.
{placeholders} are runtime values. Sections are grouped by cog, then file, then command, in the order a user encounters them.

- 215 hand-built discord.Embeds, each its own section
- 1451 shared-helper calls across 9 visual styles (examples under each style)
- 100 interaction_embed / interaction_respond ephemeral replies
- 21 ConfirmView button prompts and Components-V2 screens noted at the end

Upload this file at the embed builder page, pick a section, redesign it, export the markdown.

## Shared helper styles

### `embeds.success`

**Current:**

- Title: None
- Description: <:approve:1545804705735647298> all done boss! it was completed successfully.
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `embeds.warn / embeds.error / embeds.deny (all identical)`

**Current:**

- Title: None
- Description: <:warn:1545805127271714968> oppies, can you use the command once more?
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `embeds.cooldown / embeds.info`

**Current:**

- Title: None
- Description: <:cooldown:1545804785805172807> hey slowdown buddy! don't spam here
- Color: 0xE1E4FB
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `embeds.loading / embeds.wait`

**Current:**

- Title: None
- Description: <a:loading:1545804965958914170> please wait here while I complete this
- Color: 0x7389D8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `embeds.default`

**Current:**

- Title: None
- Description: Here's what I found.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `embeds.api_error`

**Current:**

- Title: None
- Description: <:warn:1545805127271714968> The market seems to be closed, you can check back later!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `interaction_embed` (level -> style)

**Current:**

- Title: None
- Description: <:approve:1545804705735647298> Sample message at this level.
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `embeds.list_paginated`

**Current:**

- Title: Leaderboard
- Description: 1. **username** - 5,000 coins

2. **username** - 5,000 coins
3. **username** - 5,000 coins

hide if its not inside the server.

- Color: None
- Author: melv
- Thumbnail/Image: None
- Footer: Page 1/3 (24 entries)
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### `ConfirmView` (cupi/embeds/views.py)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), 60s timeout (30s in `,transfer`), author-only, buttons disable on finish/timeout, message edited in place

### Your redesign:

_(fill in)_

## autoresponder

### autoresponder view - commands/autoresponder/autoresponder.py:523

**File:** commands/autoresponder/autoresponder.py (line ~523)

**Current:**

- Title: Autoresponder: {ar['trigger_text']}
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Settings` -> ``
  - `Attachment` -> `Voice note (`{ar.get('attachment_filename') or 'voice-message.ogg'}`)`
  - `Attachment` -> `Media file (`{ar['attachment_filename']}`)`
- Buttons/View: None

### Your redesign:

_(fill in)_

### autoresponder reset - commands/autoresponder/autoresponder.py:587

**File:** commands/autoresponder/autoresponder.py (line ~587)

**Current:**

- Title: None
- Description: Are you sure you want to remove all **{len(items)}** autoresponders?
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## configuration

### antinuke whitelists - commands/configuration/antinuke.py:265

**File:** commands/configuration/antinuke.py (line ~265)

**Current:**

- Title: Antinuke Whitelist
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Total: {len(lines)} custom whitelisted users
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### autorole list - commands/configuration/autorole.py:141

**File:** commands/configuration/autorole.py (line ~141)

**Current:**

- Title: Autoroles
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Total: {len(lines)} autorole{'s' if len(lines) != 1 else ''}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### boosterrole share - commands/configuration/boosterrole.py:886

**File:** commands/configuration/boosterrole.py (line ~886)

**Current:**

- Title: None
- Description: {target_user.mention}, hey **{ctx.author.name}** really wants to share their booster role {role.mention} with you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_giveaway_embed - commands/configuration/giveaways.py:121

**File:** commands/configuration/giveaways.py (line ~121)

**Current:**

- Title: [CANCELLED] {prize}
- Description: None
- Color: 0xF4A464 if cancelled else color.default
- Author: Adore Community
- Thumbnail/Image: Thumbnail: {thumbnail_url}, Image: {image_url}
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:196

**File:** commands/configuration/giveaways.py (line ~196)

**Current:**

- Title: None
- Description: {emote.warn} This action can only be used in a server.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:203

**File:** commands/configuration/giveaways.py (line ~203)

**Current:**

- Title: None
- Description: {emote.warn} oppies, system is not ready yet!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:210

**File:** commands/configuration/giveaways.py (line ~210)

**Current:**

- Title: None
- Description: {emote.warn} oppies, I can't find the giveaway panel for this.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:218

**File:** commands/configuration/giveaways.py (line ~218)

**Current:**

- Title: None
- Description: {emote.warn} Giveaway could not be found or has already been removed.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:225

**File:** commands/configuration/giveaways.py (line ~225)

**Current:**

- Title: None
- Description: {emote.warn} This giveaway has already ended.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:232

**File:** commands/configuration/giveaways.py (line ~232)

**Current:**

- Title: None
- Description: {emote.warn} They cancelled the giveaway :C
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:249

**File:** commands/configuration/giveaways.py (line ~249)

**Current:**

- Title: None
- Description: {emote.warn} You need {role_mentions} role to enter in this one.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:266

**File:** commands/configuration/giveaways.py (line ~266)

**Current:**

- Title: None
- Description: {emote.warn} You need to be least **level {min_level}** to enter in this one (You are **lvl {lvl}**).
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:275

**File:** commands/configuration/giveaways.py (line ~275)

**Current:**

- Title: None
- Description: {emote.warn} You need {role_mentions} special role to enter in this one.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:285

**File:** commands/configuration/giveaways.py (line ~285)

**Current:**

- Title: None
- Description: {emote.approve} You left this one with the price **{row['prize']}**.
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:292

**File:** commands/configuration/giveaways.py (line ~292)

**Current:**

- Title: None
- Description: {emote.approve} You have entered the giveaway for **{row['prize']}**!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### enter_button - commands/configuration/giveaways.py:300

**File:** commands/configuration/giveaways.py (line ~300)

**Current:**

- Title: None
- Description: {emote.warn} oppies, I think its broken!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_embed - commands/configuration/greetings/boost.py:132

**File:** commands/configuration/greetings/boost.py (line ~132)

**Current:**

- Title: Boost Award Setup
- Description: -# Choose a boost count below, assign a role, and click **Save** when finished.
  {self._embed_body()}
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _on_save - commands/configuration/greetings/boost.py:243

**File:** commands/configuration/greetings/boost.py (line ~243)

**Current:**

- Title: None
- Description: {emote.approve} Boost award roles have been updated boss.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _on_cancel - commands/configuration/greetings/boost.py:269

**File:** commands/configuration/greetings/boost.py (line ~269)

**Current:**

- Title: None
- Description: {emote.warn} Boost award roles were not modified.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### vanity overview - commands/configuration/vanity.py:158

**File:** commands/configuration/vanity.py (line ~158)

**Current:**

- Title: Vanity setup
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Status` -> `currently **Enabled** / **Disabled**`
  - `Vanity Keyword` -> `/cupi`
- Buttons/View: None

### Your redesign:

_(fill in)_

### role list - commands/configuration/vanity.py:367

**File:** commands/configuration/vanity.py (line ~367)

**Current:**

- Title: Vanity Reward Roles
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Total: {len(lines)} roles
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## economy

### button_callback - commands/economy/business/business.py:86

**File:** commands/economy/business/business.py (line ~86)

**Current:**

- Title: None
- Description: **Time Left:** {remaining}s | **Served:** {self.served} / {self.TARGET_SERVED}
  **Customer Order:** {self.target_item[0]} **{self.target_item[1]}**
- Color: None
- Author: Rush Hour Shift
- Thumbnail/Image: None
- Footer: Click the matching button below!
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### callback - commands/economy/business/business.py:192

**File:** commands/economy/business/business.py (line ~192)

**Current:**

- Title: None
- Description: Match all 4 emoji pairs in **{self.MAX_MOVES}** moves or fewer!

> **Moves Used:** {self.moves} / {self.MAX_MOVES}
> **Pairs Matched:** {sum(self.matched) // 2} / 4

- Color: None
- Author: Stock the Shelves Shift
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### accept - commands/economy/business/business.py:291

**File:** commands/economy/business/business.py (line ~291)

**Current:**

- Title: None
- Description: <@{self.target_id}> is now part of **{self.business_name}** with a `{self.cut_percent}%` profit cut! welcome aboard mate!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### decline - commands/economy/business/business.py:301

**File:** commands/economy/business/business.py (line ~301)

**Current:**

- Title: None
- Description: <@{self.target_id}> declined the partnership invitation.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### cancel - commands/economy/business/business.py:338

**File:** commands/economy/business/business.py (line ~338)

**Current:**

- Title: None
- Description: oppies, the business sale was cancelled!
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### claim_all - commands/economy/business/business.py:374

**File:** commands/economy/business/business.py (line ~374)

**Current:**

- Title: Milestones Claimed!
- Description: Successfully claimed **+{total_claimed:,}** coins!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: **{name}**
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### claim_all - commands/economy/business/business.py:383

**File:** commands/economy/business/business.py (line ~383)

**Current:**

- Title: None
- Description: No task rewards were available to claim.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business - commands/economy/business/business.py:429

**File:** commands/economy/business/business.py (line ~429)

**Current:**

- Title: None
- Description: You own a permanent **Business License**, but haven't started an enterprise yet!

• View available businesses: `{ctx.prefix}business list`
• Purchase an enterprise: `{ctx.prefix}business buy <tier> [name]`

- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business - commands/economy/business/business.py:439

**File:** commands/economy/business/business.py (line ~439)

**Current:**

- Title: None
- Description: You do not own a **Business License** yet!

A business license allows you to own enterprises, earn hourly passive revenue, and partner with other players.

• **License Cost**: **500,000** coins (one-time, permanent)
• **Purchase**: `{ctx.prefix}business license` or `{ctx.prefix}store`
• **Explore Tiers**: `{ctx.prefix}business list`

- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Cupi Commercial Registry
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business - commands/economy/business/business.py:504

**File:** commands/economy/business/business.py (line ~504)

**Current:**

- Title: {emote} {name}
- Description: **{tier_name}** | Level **{level}/5** | {role_str}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: {footer_text}
- Fields:
  - `Hourly Income` -> `+{rate:,} coins / hr`
  - `Uncollected Revenue` -> `{acc_revenue:,} coins ({hours} hrs)`
  - `Cap & Timer` -> `Max {cap_hours}h storage ({cap_coins:,} cap)`
  - `Ownership & Cuts` -> `{partners_str}`
  - `Daily Collection Streak` -> `{streak_str}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### business list - commands/economy/business/business.py:537

**File:** commands/economy/business/business.py (line ~537)

**Current:**

- Title: Commercial Business Registry
- Description: Purchase an enterprise to earn passive hourly income continuously (even while offline)!
  Requires a **Business License** (500k one-time). Maximum 1 business per player.
  -# Upgrade cost = 2.5% of tier cost * current level. Each level adds +25% over base rate.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Use {ctx.prefix}business buy <tier> [name] to purchase
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business license - commands/economy/business/business.py:579

**File:** commands/economy/business/business.py (line ~579)

**Current:**

- Title: None
- Description: You already hold a verified **Business License**!

• Buy a business: `{ctx.prefix}business buy <tier> [name]`
• View tier catalog: `{ctx.prefix}business list`

- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: Business License
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business license - commands/economy/business/business.py:601

**File:** commands/economy/business/business.py (line ~601)

**Current:**

- Title: None
- Description: all done boss! you grabbed a permanent Business License for {LICENSE_COST:,} coins!

• You can now purchase your own enterprise: `{ctx.prefix}business buy <tier>`
• You can now accept partnership invites from other business owners!

- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: Business License Issued!
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business buy - commands/economy/business/business.py:693

**File:** commands/economy/business/business.py (line ~693)

**Current:**

- Title: None
- Description: {name} is officially open for business!

• **Base Income**: **{tier_info['base_rate']:,}** coins / hr
• **Starting Level**: Level **1/5**
• **Dashboard**: `{ctx.prefix}business`
• **Rename**: `{ctx.prefix}business name <new name>`
• **Collect**: `{ctx.prefix}business collect`

- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: Enterprise Founded!
- Fields: None
- Buttons/View: Open Dashboard (primary)

### Your redesign:

_(fill in)_

### business upgrade - commands/economy/business/business.py:747

**File:** commands/economy/business/business.py (line ~747)

**Current:**

- Title: None
- Description: {biz['name']} hit Level {next_level}/5! that cost {cost:,} coins.
  • New rate: **{new_rate:,}** coins/hr
  • Next: Level {next_level + 1} ({tier_info['upgrades'].get(next_level, 0):,} coins)

Max level version: {biz['name']} is maxed out!

- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: Business Upgraded!
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business collect - commands/economy/business/business.py:802

**File:** commands/economy/business/business.py (line ~802)

**Current:**

- Title: None
- Description: Collected **{total_earnings:,}** coins for **{hours}** hour(s) of revenue!

**Disbursement Breakdown**:
{disbursement_lines}

- Color: 0x9DD2A8
- Author: {biz['name']}
- Thumbnail/Image: None
- Footer: {streak_note} | Lifetime: {res['lifetime_earnings']:,} coins
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _handle_business_name - commands/economy/business/business.py:829

**File:** commands/economy/business/business.py (line ~829)

**Current:**

- Title: None
- Description: Your business is currently named **`{biz['name']}`**.{role_note}

• Rename: `{ctx.prefix}business name <new name>`
• Rename Cost: **50,000** coins (first rename free)
• Max Length: 32 characters

- Color: None
- Author: Business Management
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business invite - commands/economy/business/business.py:977

**File:** commands/economy/business/business.py (line ~977)

**Current:**

- Title: None
- Description: {target.mention}, **{ctx.author.display_name}** has invited you to join **{biz['name']}** as a partner!

• **Enterprise**: {biz['tier_info']['emote']} {biz['tier_info']['name']} (Level {biz['level']})
• **Starting Profit Cut**: **{cut_percent}%** of all collected profits
• **Action Required**: Click **Accept** or **Decline** within 60 seconds.

- Color: None
- Author: Business Partnership Invitation
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Accept (green) + Decline (red)

### Your redesign:

_(fill in)_

### business sell - commands/economy/business/business.py:1129

**File:** commands/economy/business/business.py (line ~1129)

**Current:**

- Title: None
- Description: Selling your business is **permanent and irreversible**!

• **Total Capital Invested**: **{total_invested:,}** coins
• **Liquidation Refund (80%)**: **{refund_total:,}** coins
• **Refund Split**: Disbursed to owner & partners according to current profit cuts.

Are you sure you want to sell your enterprise?

- Color: 0xF4A464
- Author: Sell {biz['name']}?
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm Sell (red) + Cancel (secondary)

### Your redesign:

_(fill in)_

### business sell - commands/economy/business/business.py:1154

**File:** commands/economy/business/business.py (line ~1154)

**Current:**

- Title: None
- Description: The enterprise has been liquidated for **{res['refund_total']:,}** coins.
- Color: 0x9DD2A8
- Author: Business Sold - {res['business_name']}
- Thumbnail/Image: None
- Footer: Liquidation Complete
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business tasks - commands/economy/business/business.py:1197

**File:** commands/economy/business/business.py (line ~1197)

**Current:**

- Title: None
- Description: Complete objectives to earn coin rewards and enterprise bonuses.
- Color: None
- Author: Business Milestone Tasks
- Thumbnail/Image: None
- Footer: Complete task objectives above to earn coin bonuses!
- Fields: None
- Buttons/View: Claim All (green)

### Your redesign:

_(fill in)_

### business public - commands/economy/business/business.py:1253

**File:** commands/economy/business/business.py (line ~1253)

**Current:**

- Title: None
- Description: Congratulations! **{tier_emote} {biz['name']}** is officially listed on the 24/7 stock market.
- Color: 0x9DD2A8
- Author: {biz['name']} is now Public
- Thumbnail/Image: None
- Footer: To delist back to private ownership anytime, use {ctx.prefix}business public
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business public - commands/economy/business/business.py:1279

**File:** commands/economy/business/business.py (line ~1279)

**Current:**

- Title: None
- Description: **{biz['name']}** (`{delist_res['ticker']}`) has been removed from the stock market and returned to private ownership (100% owner equity).
- Color: 0xF4A464
- Author: {biz['name']} has been Delisted
- Thumbnail/Image: None
- Footer: You can re-list anytime with {ctx.prefix}business public
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1319

**File:** commands/economy/business/business.py (line ~1319)

**Current:**

- Title: None
- Description: You have already clocked in and completed your daily shift for **{biz['name']}** today!
  Come back tomorrow (**00:00 UTC**) for your next shift.
- Color: 0x9DD2A8
- Author: Daily Shift Completed
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1344

**File:** commands/economy/business/business.py (line ~1344)

**Current:**

- Title: None
- Description: Great job! Your shift for **{biz['name']}** has been logged.

• **Performance:** {details}
• **Team Progress Today:** {len(today_shifts)} / {total_workers} workers completed

**Stock Impact at 00:00 UTC:**
• 100% team participation -> **+5% price boost**
• 50-99% participation -> **+2% boost**
• 1-49% participation -> **-2% penalty**
• 0% participation -> **-5% penalty**

- Color: 0x9DD2A8
- Author: Daily Shift Completed!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1375

**File:** commands/economy/business/business.py (line ~1375)

**Current:**

- Title: None
- Description: Great job! Since **{biz['name']}** is private, you earned your 1-hour wage directly:

• **Earnings:** **+{wage:,}** coins (credited to wallet)

- Color: 0x9DD2A8
- Author: Daily Shift Completed!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1387

**File:** commands/economy/business/business.py (line ~1387)

**Current:**

- Title: None
- Description: You didn't meet the passing requirements for this shift. You can try again anytime today!
- Color: 0xF4A464
- Author: Shift Incomplete
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1410

**File:** commands/economy/business/business.py (line ~1410)

**Current:**

- Title: None
- Description: Serve at least **{RushHourView.TARGET_SERVED}** customers within 30 seconds!

**Time Left:** 30s | **Served:** 0 / {RushHourView.TARGET_SERVED}
**Customer Order:** {view.target_item[0]} **{view.target_item[1]}**
-# Click the matching button below!

- Color: None
- Author: Rush Hour Shift
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Dynamic item buttons

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1425

**File:** commands/economy/business/business.py (line ~1425)

**Current:**

- Title: None
- Description: Match all 4 emoji pairs in **{StockShelvesView.MAX_MOVES}** moves or fewer!

• **Moves Used:** 0 / {StockShelvesView.MAX_MOVES}
• **Pairs Matched:** 0 / 4

- Color: None
- Author: Stock the Shelves Shift
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: 4x4 Grid buttons

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1447

**File:** commands/economy/business/business.py (line ~1447)

**Current:**

- Title: None
- Description: Type the contract phrase below in this channel within **35 seconds** (90%+ accuracy required):

`{phrase}`

- Color: None
- Author: Close the Deal Shift
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### business shift - commands/economy/business/business.py:1477

**File:** commands/economy/business/business.py (line ~1477)

**Current:**

- Title: None
- Description: {mode_desc}

**Choose your mini-game:**
• **Rush Hour:** Fast customer order serving (30s)
• **Stock Shelves:** Emoji memory-match grid (<=16 moves)
• **Close the Deal:** Typing accuracy challenge (>=90%)
-# You have unlimited attempts until one pass is logged today.

- Color: None
- Author: Clock In - {biz['name']}
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Rush Hour + Stock Shelves + Close the Deal

### Your redesign:

_(fill in)_

### _make_bj_embed - commands/economy/core.py:566

**File:** commands/economy/core.py (line ~566)

**Current:**

- Title: None
- Description: **Your Hand** ({player_score}): {player_cards}
  **Dealer Hand** ({dealer_score}): {dealer_cards}

{status}

- Color: 0x9DD2A8 (win) / 0xF4A464 (loss) / 0xE1E4FB (in-progress)
- Author: {author.display_name}, you bet {format_currency(bet_amount)} to play blackjack
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Hit (blurple) + Stand (secondary) + Double Down (primary)

### Your redesign:

_(fill in)_

### _render_embed - commands/economy/core.py:972

**File:** commands/economy/core.py (line ~972)

**Current:**

- Title: None
- Description: A robbery raid has been launched against {self.raid.target.mention}!

**Crew ({raiders_count}):** {raider_mentions}
**Win Chance:** **{win_rate}%**
**Entry Fees Pool:** **{format_currency(self.raid.fees_collected)}** coins
**Time Remaining:** <t:{int(self.raid.expires_at)}:R>
-# Click below to join the crew for **{format_currency(STEAL_JOINER_FEE)}** coins!

- Color: 0xF4A464
- Author: Robbery Raid in Progress!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Join Raid (red)

### Your redesign:

_(fill in)_

### make_loan_receipt_embed - commands/economy/core.py:1212

**File:** commands/economy/core.py (line ~1212)

**Current:**

- Title: None
- Description: **{format_currency(principal)}** coins have been deposited into your wallet.

• **Total Repayment:** **{format_currency(repayment_total)}** coins
• **Deadline:** <t:{deadline_ts}:f> (<t:{deadline_ts}:R>)
• **Repay Command:** `{ctx.prefix}loan repay [amount]`

- Color: 0x9DD2A8
- Author: Loan Disbursed - Receipt
- Thumbnail/Image: None
- Footer: Cupid Bank
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### show_amount_step - commands/economy/core.py:1385

**File:** commands/economy/core.py (line ~1385)

**Current:**

- Title: None
- Description: Selected Tier: **{tier_info['label']}** (`{self.selected_tier}`)

Select the amount you want to borrow from the menu below.

- Color: None
- Author: Loan Application - Select Amount
- Thumbnail/Image: None
- Footer: Step 2/3 - Loan Amount
- Fields: None
- Buttons/View: Amount buttons

### Your redesign:

_(fill in)_

### back_to_duration_callback - commands/economy/core.py:1412

**File:** commands/economy/core.py (line ~1412)

**Current:**

- Title: None
- Description: Select your loan duration below. Tiers requiring higher bank storage are unlocked by expanding your vault with banknotes (`{self.ctx.prefix}store banknotes`).
- Color: None
- Author: Bank Loan Application
- Thumbnail/Image: None
- Footer: Step 1/3 - Duration Selection
- Fields: None
- Buttons/View: Duration buttons

### Your redesign:

_(fill in)_

### show_confirmation - commands/economy/core.py:1457

**File:** commands/economy/core.py (line ~1457)

**Current:**

- Title: None
- Description: Borrow **{format_currency(amount)}** for **{self.selected_tier}** -> repay **{format_currency(on_time_total)}** by <t:{deadline_ts}:f> (<t:{deadline_ts}:R>), or owe **{format_currency(late_total)}** if late.

• **Duration**: {tier_info['label']} ({self.selected_tier})
• **Payout**: Deposited immediately into your wallet
• **Auto-Collect Notice**: Late loans trigger 10% hourly auto-collection from your bank storage and freeze bank withdrawals.

- Color: None
- Author: Confirm Loan Application
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:

_(fill in)_

### confirm_callback - commands/economy/core.py:1487

**File:** commands/economy/core.py (line ~1487)

**Current:**

- Title: None
- Description: {emote.warn} You already have an active loan! Pay it off with `{self.ctx.prefix}loan repay` before applying for another.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### cancel_callback - commands/economy/core.py:1504

**File:** commands/economy/core.py (line ~1504)

**Current:**

- Title: None
- Description: {emote.warn} Loan application cancelled.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan_processor - commands/economy/core.py:1758

**File:** commands/economy/core.py (line ~1758)

**Current:**

- Title: None
- Description: Your loan deadline of <t:{deadline_ts}:f> has expired.

• **Outstanding Debt:** **{format_currency(remaining_due)}** coins
• **Auto-Collection:** 10% hourly auto-deducted from bank storage
• **Status:** Bank withdrawals are frozen until settled.

- Color: 0xF4A464
- Author: Cupid Bank - Loan Default Notice
- Thumbnail/Image: None
- Footer: Defaulted Loan
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan_processor - commands/economy/core.py:1782

**File:** commands/economy/core.py (line ~1782)

**Current:**

- Title: None
- Description: Your loan deadline is rapidly approaching in <t:{deadline_ts}:R>!

• **Amount Due:** **{format_currency(remaining_due)}** coins
• **Payoff:** Use `{prefix}loan repay` before deadline to avoid penalties.

- Color: 0xF4A464
- Author: Cupid Bank - Loan Due Soon (80% Elapsed)
- Thumbnail/Image: None
- Footer: Loan Reminder
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan_processor - commands/economy/core.py:1805

**File:** commands/economy/core.py (line ~1805)

**Current:**

- Title: None
- Description: Half of your loan duration has passed.

• **Deadline:** <t:{deadline_ts}:f> (<t:{deadline_ts}:R>)
• **Remaining Debt:** **{format_currency(remaining_due)}** coins

- Color: None
- Author: Cupid Bank - Loan Reminder (50% Elapsed)
- Thumbnail/Image: None
- Footer: Loan Reminder
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan_processor - commands/economy/core.py:1828

**File:** commands/economy/core.py (line ~1828)

**Current:**

- Title: None
- Description: Your remaining loan debt has been fully settled via bank auto-collection!
- Color: 0x9DD2A8
- Author: Cupid Bank - Loan Cleared
- Thumbnail/Image: None
- Footer: Debt Settled
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan - commands/economy/core.py:2143

**File:** commands/economy/core.py (line ~2143)

**Current:**

- Title: None
- Description: Borrow coins directly into your wallet with flexible terms.

**Loan Tiers:**
• **Quick Cash**: Up to 50k (24h)
• **Standard Loan**: Up to 250k (3d)
• **Vault Backed**: Up to 1M (7d)

**Your Loan Status:**
{loan_status_summary}

- Color: None
- Author: Cupid Bank - Loan Center
- Thumbnail/Image: None
- Footer: Default bank storage is 100k. Buy banknotes via {ctx.prefix}store banknotes to unlock larger tiers!
- Fields: None
- Buttons/View: Apply for Loan (primary) + Repay Loan (secondary)

### Your redesign:

_(fill in)_

### loan apply - commands/economy/core.py:2182

**File:** commands/economy/core.py (line ~2182)

**Current:**

- Title: None
- Description: Select your loan duration below. Tiers requiring higher bank storage are unlocked by expanding your vault with banknotes (`{ctx.prefix}store banknotes`).
- Color: None
- Author: Bank Loan Application
- Thumbnail/Image: None
- Footer: Cupid Bank Loans
- Fields: None
- Buttons/View: Tier selection buttons

### Your redesign:

_(fill in)_

### loan repay - commands/economy/core.py:2331

**File:** commands/economy/core.py (line ~2331)

**Current:**

- Title: None
- Description: You paid **{format_currency(res['amount_paid'])}** coins from your wallet and completely cleared your loan!
- Color: 0x9DD2A8
- Author: Loan Fully Repaid!
- Thumbnail/Image: None
- Footer: Debt Cleared
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan repay - commands/economy/core.py:2348

**File:** commands/economy/core.py (line ~2348)

**Current:**

- Title: None
- Description: You paid **{format_currency(res['amount_paid'])}** coins from your wallet.

• **Repaid Total**: **{format_currency(res['repaid_total'])}** coins
• **Remaining Debt**: **{format_currency(res['remaining_due'])}** coins
• **Repay-By Deadline**: {deadline_str}
• **Wallet Remaining**: **{format_currency(res['wallet_left'])}** coins
-# 10% auto-collection continues hourly from your bank until the remaining debt is 0.

- Color: None
- Author: Loan Repayment Received
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan status - commands/economy/core.py:2405

**File:** commands/economy/core.py (line ~2405)

**Current:**

- Title: None
- Description: • **Tier**: {tier_info.get('label', tier_key)} (`{tier_key}`)
  • **Principal**: **{format_currency(loan['principal'])}** coins
  • **Total Due**: **{format_currency(loan['total_due'])}** coins
  • **Repaid So Far**: **{format_currency(loan['repaid'])}** coins
  • **Remaining**: **{format_currency(remaining)}** coins
  • **Deadline**: <t:{loan['expires_at']}:f> (<t:{loan['expires_at']}:R>)
- Color: None
- Author: Active Loan Breakdown
- Thumbnail/Image: None
- Footer: Cupid Bank
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### loan status - commands/economy/core.py:2429

**File:** commands/economy/core.py (line ~2429)

**Current:**

- Title: None
- Description: • **Status**: **DEFAULTED** (Deadline passed)
  • **Tier**: {tier_info.get('label', tier_key)} (`{tier_key}`)
  • **Remaining Debt**: **{format_currency(remaining)}** coins
  • **Auto-Collection**: 10% hourly auto-deducted from bank storage
  • **Restrictions**: Bank withdrawals are locked until settled.
- Color: 0xF4A464
- Author: Defaulted Loan Breakdown
- Thumbnail/Image: None
- Footer: Cupid Bank Collections
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### transfer - commands/economy/core.py:2566

**File:** commands/economy/core.py (line ~2566)

**Current:**

- Title: None
- Description: Are you sure you want to transfer **{format_currency(transfer_amount)}** coins to {target.mention}?
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:

_(fill in)_

### transfer - commands/economy/core.py:2588

**File:** commands/economy/core.py (line ~2588)

**Current:**

- Title: None
- Description: {emote.approve} Successfully transferred **{format_currency(transfer_amount)}** coins to {target.mention}!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### transfer - commands/economy/core.py:2598

**File:** commands/economy/core.py (line ~2598)

**Current:**

- Title: None
- Description: {emote.warn} Transfer canceled.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### steal - commands/economy/core.py:2719

**File:** commands/economy/core.py (line ~2719)

**Current:**

- Title: None
- Description: Someone is trying to rob you in **{ctx.guild.name}**!

**Raid Leader:** {ctx.author.mention}
You have **30 seconds** to press the button below to stop the raid and confiscate their entry fees!

- Color: 0xF4A464
- Author: Robbery Raid Alert!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Stop Raid (red)

### Your redesign:

_(fill in)_

### steal - commands/economy/core.py:2777

**File:** commands/economy/core.py (line ~2777)

**Current:**

- Title: None
- Description: You caught the thieves in the act!

**Caught Culprits:** {culprits_str}
{dm_fees_str}

- Color: 0x9DD2A8
- Author: Raid Successfully Stopped!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### steal - commands/economy/core.py:2801

**File:** commands/economy/core.py (line ~2801)

**Current:**

- Title: None
- Description: {quote}
  **{target.display_name}** caught the raid crew!
  The raid has failed and you were caught. {transfer_str}
- Color: 0xF4A464
- Author: Raid Stopped!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### steal - commands/economy/core.py:2839

**File:** commands/economy/core.py (line ~2839)

**Current:**

- Title: None
- Description: {quote}
  The raid has failed and you were caught! {transfer_str}
- Color: 0xF4A464
- Author: Raid Failed!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### steal - commands/economy/core.py:2861

**File:** commands/economy/core.py (line ~2861)

**Current:**

- Title: None
- Description: The raiders breached **{target.display_name}**'s wallet, but found nothing left to take!
  -# All entry fees ({format_currency(raid.fees_collected)} coins) were spent on getaway gear.
- Color: 0xF4A464
- Author: Raid Empty!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### steal - commands/economy/core.py:2881

**File:** commands/economy/core.py (line ~2881)

**Current:**

- Title: None
- Description: The crew breached **{target.display_name}**'s wallet and made off with **{format_currency(stolen)}** coins ({pct * 100:.1f}%)!

**Loot Distribution:**
{loot_lines}
-# All entry fees ({format_currency(raid.fees_collected)} coins) were spent on getaway gear.

- Color: 0x9DD2A8
- Author: Robbery Raid Successful!
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### coinflip - commands/economy/core.py:3318

**File:** commands/economy/core.py (line ~3318)

**Current:**

- Title: None
- Description: Spinning a coin for **{format_currency(bet_amount)}** coins...
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### coinflip - commands/economy/core.py:3334

**File:** commands/economy/core.py (line ~3334)

**Current:**

- Title: None
- Description: You chose **{user_choice}** and it landed on **{outcome}**!
  {emote.approve} You won **{format_currency(profit)}** coins!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### coinflip - commands/economy/core.py:3342

**File:** commands/economy/core.py (line ~3342)

**Current:**

- Title: None
- Description: You chose **{user_choice}**, but it landed on **{outcome}**!
  You lost **{format_currency(bet_amount)}** coins!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### dice - commands/economy/core.py:3376

**File:** commands/economy/core.py (line ~3376)

**Current:**

- Title: None
- Description: Rolling the dice for **{format_currency(bet_amount)}** coins...
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### dice - commands/economy/core.py:3393

**File:** commands/economy/core.py (line ~3393)

**Current:**

- Title: None
- Description: You rolled **{player_total}** ({player_dice}) and Cupi rolled **{cupi_total}** ({cupi_dice})!
  {emote.approve} You won **{format_currency(profit)}** coins!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### dice - commands/economy/core.py:3401

**File:** commands/economy/core.py (line ~3401)

**Current:**

- Title: None
- Description: You rolled **{player_total}** ({player_dice}) and Cupi rolled **{cupi_total}** ({cupi_dice})!
  You lost **{format_currency(bet_amount)}** coins!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### slot - commands/economy/core.py:3473

**File:** commands/economy/core.py (line ~3473)

**Current:**

- Title: None
- Description: {body}
- Color: 0x9DD2A8 (win) / 0xF4A464 (loss)
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### roulette - commands/economy/core.py:3710

**File:** commands/economy/core.py (line ~3710)

**Current:**

- Title: None
- Description: Spinning the roulette wheel for **{format_currency(bet_amount)}** coins on **{bet_label}**...
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### roulette - commands/economy/core.py:3726

**File:** commands/economy/core.py (line ~3726)

**Current:**

- Title: None
- Description: The ball landed on **{landed} ({landed_color.title()})**!
  {emote.approve} You won **{format_currency(profit)}** coins on **{bet_label}**!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### roulette - commands/economy/core.py:3734

**File:** commands/economy/core.py (line ~3734)

**Current:**

- Title: None
- Description: The ball landed on **{landed} ({landed_color.title()})**!
  You lost **{format_currency(bet_amount)}** coins on **{bet_label}**!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _browse - commands/economy/market/market.py:171

**File:** commands/economy/market/market.py (line ~171)

**Current:**

- Title: None
- Description: The dealer's shelves are bare. Pawn something to get started.
- Color: None
- Author: {ctx.author.display_name}'s Market View
- Thumbnail/Image: None
- Footer: {ODDS_LINE} | {pity_str}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _browse - commands/economy/market/market.py:209

**File:** commands/economy/market/market.py (line ~209)

**Current:**

- Title: None
- Description: {market_items}
- Color: None
- Author: {ctx.author.display_name}'s Market View
- Thumbnail/Image: None
- Footer: {page_footer}
- Fields: None
- Buttons/View: Previous + Next

### Your redesign:

_(fill in)_

### market buy - commands/economy/market/market.py:442

**File:** commands/economy/market/market.py (line ~442)

**Current:**

- Title: None
- Description: {desc}
- Color: 0x9DD2A8
- Author: stella
- Thumbnail/Image: None
- Footer: {ODDS_LINE} | Pity: 0/3 duds
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### market buy - commands/economy/market/market.py:466

**File:** commands/economy/market/market.py (line ~466)

**Current:**

- Title: None
- Description: {desc}
- Color: 0xF4A464
- Author: stella
- Thumbnail/Image: None
- Footer: {ODDS_LINE} | {pity_status}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### stocks - commands/economy/market/stocks.py:200

**File:** commands/economy/market/stocks.py (line ~200)

**Current:**

- Title: None
- Description: No player businesses are listed on the stock market yet!
- Color: None
- Author: Cupi Stock Market - 24/7 Player Capital Market
- Thumbnail/Image: None
- Footer: Trade 24/7 around the clock
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _show_ambiguous_matches - commands/economy/market/stocks.py:248

**File:** commands/economy/market/stocks.py (line ~248)

**Current:**

- Title: None
- Description: Multiple listings matched **{query}**:
  {matches_list}

Please specify the ticker symbol to view.

- Color: 0xF4A464
- Author: Multiple Businesses Matched
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### stocks view - commands/economy/market/stocks.py:333

**File:** commands/economy/market/stocks.py (line ~333)

**Current:**

- Title: {quote.tier_emote} {quote.display_name}
- Description: {description}
- Color: None
- Author: None
- Thumbnail/Image: {quote.logo_url}
- Footer: {ctx.prefix}stocks buy {quote.ticker.lower()} <shares>
- Fields:
  - `Owner` -> `<@{quote.owner_id}>`
  - `Tier & Level` -> `{quote.tier_name} (L{quote.level})`
  - `Market Cap` -> `{quote.market_cap:,} coins`
  - `Share Price` -> `{quote.price_coins:,} coins/share`
- Buttons/View: None

### Your redesign:

_(fill in)_

### stocks buy - commands/economy/market/stocks.py:451

**File:** commands/economy/market/stocks.py (line ~451)

**Current:**

- Title: None
- Description: Successfully purchased **{shares}** share(s) of **{quote.tier_emote} {quote.display_name}**

• **Purchase Price:** {quote.price_coins:,} coins/share ({total_cost:,} coins total)
• **Direct Investment:** **+{owner_payout:,}** coins (98%) went straight to <@{owner_id}>'s wallet!
• **Your Position:** {new_shares} / 100 shares
• **Average Buy Price:** {new_avg:,} coins/share
• **New Market Price:** {new_price:,} coins (+{impact_pct:.1f}% trade impact)

- Color: 0x9DD2A8
- Author: Shares Purchased
- Thumbnail/Image: {quote.logo_url}
- Footer: View your portfolio with {ctx.prefix}portfolio
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### stocks sell - commands/economy/market/stocks.py:543

**File:** commands/economy/market/stocks.py (line ~543)

**Current:**

- Title: None
- Description: Successfully sold **{shares}** share(s) from your company stake into the market!

• **Sell Price:** {quote.price_coins:,} coins/share
• **Gross Proceeds:** {gross:,} coins
• **House Fee (2%):** -{fee:,} coins
• **Net Payout:** **+{net:,}** coins (credited to wallet)
• **Remaining Owner Stake:** {rem_stake:,} shares ({rem_stake / 100:.1f}%)
• **Public Float:** {new_float:,} shares ({new_float / 100:.1f}%)

- Color: 0x9DD2A8
- Author: Company Stake Sold
- Thumbnail/Image: None
- Footer: Owner Equity Liquidation
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### stocks sell - commands/economy/market/stocks.py:566

**File:** commands/economy/market/stocks.py (line ~566)

**Current:**

- Title: None
- Description: Successfully sold **{shares}** share(s) of **{quote.tier_emote} {quote.display_name}**

• **Sell Price:** {quote.price_coins:,} coins/share
• **Gross Value:** {gross:,} coins
• **Broker Fee (2%):** -{fee:,} coins
• **Net Payout:** +{net:,} coins (credited to wallet)
• **Realized P/L:** {sign}{realized_pl:,} coins ({sign}{pl_pct:.1f}%)
• **Remaining Position:** {rem_shares} share(s)

- Color: 0x9DD2A8 (profit) / 0xF4A464 (loss)
- Author: Shares Sold
- Thumbnail/Image: {quote.logo_url}
- Footer: View your portfolio with {ctx.prefix}portfolio
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _show_portfolio - commands/economy/market/stocks.py:625

**File:** commands/economy/market/stocks.py (line ~625)

**Current:**

- Title: None
- Description: You don't own any player business stocks yet!
- Color: None
- Author: Stock Portfolio
- Thumbnail/Image: None
- Footer: Browse listings with {ctx.prefix}stocks
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _show_portfolio - commands/economy/market/stocks.py:692

**File:** commands/economy/market/stocks.py (line ~692)

**Current:**

- Title: None
- Description: {summary}
- Color: None
- Author: {ctx.author.display_name}'s Stock Portfolio
- Thumbnail/Image: {top_logo or ctx.author.display_avatar.url}
- Footer: {ctx.prefix}stocks view <listing>
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_store_embed - commands/economy/store.py:752

**File:** commands/economy/store.py (line ~752)

**Current:**

- Title: Cupi General Store
- Description: Browse department items below.
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Use ,buy <ID or name> [amount] | Switch departments below
- Fields: None
- Buttons/View: Department Select Menu

### Your redesign:

_(fill in)_

## embeds

### _build_embed - embeds/embed.py:21

**File:** embeds/embed.py (line ~21)

**Current:**

- Title: None
- Description: {description}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### list_paginated - embeds/embed.py:422

**File:** embeds/embed.py (line ~422)

**Current:**

- Title: {title}
- Description: {separator.join(lines)}
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Page {current}/{total}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### error_log - embeds/errorreport.py:29

**File:** embeds/errorreport.py (line ~29)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: Command Error Log
- Thumbnail/Image: None
- Footer: Command: {command}
- Fields:
  - `User ID` -> `{user.id}`
  - `Guild ID` -> `{guild.id}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### guild_join_log - embeds/errorreport.py:62

**File:** embeds/errorreport.py (line ~62)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: Guild Joined
- Thumbnail/Image: {guild.icon.url}
- Footer: Guild ID: {guild.id}
- Fields:
  - `Owner ID` -> `{owner_id}`
  - `Inviter ID` -> `{inviter_id}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### guild_leave_log - embeds/errorreport.py:100

**File:** embeds/errorreport.py (line ~100)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: Guild Left
- Thumbnail/Image: {guild.icon.url}
- Footer: Guild ID: {guild.id}
- Fields:
  - `Owner ID` -> `{owner_id}`
  - `Remover ID` -> `{remover_id}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### start - embeds/paginator.py:241

**File:** embeds/paginator.py (line ~241)

**Current:**

- Title: {title}
- Description: {content}
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - embeds/ticket_views.py:252

**File:** embeds/ticket_views.py (line ~252)

**Current:**

- Title: None
- Description: Thanks for opening a ticket. Please describe your issue and/or question in detail and wait for a response.
- Color: None
- Author: Ticket Created
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Ticket` -> `-# {thread.mention}`
  - `Creator` -> `-# {user.mention}`
  - `Panel` -> `-# {cat_info['label']}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - embeds/ticket_views.py:1013

**File:** embeds/ticket_views.py (line ~1013)

**Current:**

- Title: None
- Description: Thanks for opening a ticket. Please describe your issue and/or question in detail and wait for a response.
- Color: None
- Author: Ticket Created
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Case` -> `-# #{case_id}`
  - `Creator` -> `-# {user.mention}`
  - `Panel` -> `-# appeal`
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - embeds/ticket_views.py:1126

**File:** embeds/ticket_views.py (line ~1126)

**Current:**

- Title: None
- Description: Thanks for opening a ticket. Please describe your issue and/or question in detail and wait for a response.
- Color: None
- Author: Ticket Created
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Ticket` -> `-# {thread.mention}`
  - `Creator` -> `-# {user.mention}`
  - `Panel` -> `-# contact staff`
- Buttons/View: None

### Your redesign:

_(fill in)_

### delete_button - embeds/ticket_views.py:374

**File:** embeds/ticket_views.py (line ~374)

**Current:**

- Title: None
- Description: clearing everyone from this ticket. the thread stays as a log.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### delete_button - embeds/ticket_views.py:604

**File:** embeds/ticket_views.py (line ~604)

**Current:**

- Title: None
- Description: clearing everyone from this ticket. the thread stays as a log.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### close_button - embeds/ticket_views.py:548

**File:** embeds/ticket_views.py (line ~548)

**Current:**

- Title: None
- Description: This ticket has been closed.
- Color: 0xF4A464
- Author: Ticket Closed
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Closer` -> `-# {interaction.user.mention}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### embed - embeds/treeview.py:484

**File:** embeds/treeview.py (line ~484)

**Current:**

- Title: None
- Description: {emote.tree} preview of your family tree style and colors
- Color: None
- Author: None
- Thumbnail/Image: Image: attachment://{TREE_FILENAME}
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### not_for_you - embeds/views.py:19

**File:** embeds/views.py (line ~19)

**Current:**

- Title: None
- Description: {emote.error} {interaction.user.mention}: This {component_type} is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## events

### listener:on_message - events/afk.py:266

**File:** events/afk.py (line ~266)

**Current:**

- Title: None
- Description: {emote.approve} Welcome back {message.author.mention}, you went AFK {duration}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### listener:on_message - events/afk.py:293

**File:** events/afk.py (line ~293)

**Current:**

- Title: None
- Description: {dm_desc.strip()}
- Color: None
- Author: While you were AFK
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### listener:on_message - events/afk.py:306

**File:** events/afk.py (line ~306)

**Current:**

- Title: None
- Description: {message.author.mention}, you have **{len(offline_msgs)}** offline message(s), but your DMs are closed! Open your DMs to receive them.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### listener:on_message - events/afk.py:328

**File:** events/afk.py (line ~328)

**Current:**

- Title: None
- Description: {message.author.mention} is now back in [{message.guild.name}]({message.jump_url})
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### listener:on_message - events/afk.py:390

**File:** events/afk.py (line ~390)

**Current:**

- Title: None
- Description: {desc}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _punish_and_alert - events/antinuke.py:111

**File:** events/antinuke.py (line ~111)

**Current:**

- Title: None
- Description: {alert_desc}
- Color: 0xF4A464
- Author: Antinuke Security Alert
- Thumbnail/Image: {guild.icon.url}
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### handle_boost - events/greet.py:572

**File:** events/greet.py (line ~572)

**Current:**

- Title: None
- Description: Thank you for boosting **{guild.name}**! You've received **{reward_coins:,}** cupi coins <:approve:1545804705735647298>
- Color: 0x2B2D31
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _recover_active_drops - events/moneydrop.py:136

**File:** events/moneydrop.py (line ~136)

**Current:**

- Title: None
- Description: This money drop of **{amount:,}** coins expired unclaimed and was refunded.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_money_drop - events/moneydrop.py:234

**File:** events/moneydrop.py (line ~234)

**Current:**

- Title: None
- Description: {COWCASH} Oh no, looks like someone dropped their money! Use `{self._prefix()}pick` to grab
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_money_drop - events/moneydrop.py:278

**File:** events/moneydrop.py (line ~278)

**Current:**

- Title: None
- Description: This money drop was superseded by a new drop and refunded.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _expire_manual_drop - events/moneydrop.py:340

**File:** events/moneydrop.py (line ~340)

**Current:**

- Title: None
- Description: This money drop of **{drop.amount:,}** coins expired unclaimed and was refunded.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## family

### _offer - commands/family/family.py:278

**File:** commands/family/family.py (line ~278)

**Current:**

- Title: None
- Description: {question}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## fun

### on_submit - commands/fun/confession.py:134

**File:** commands/fun/confession.py (line ~134)

**Current:**

- Title: Cupi Confession (#{confession_id})
- Description: {str(self.contents.value)}
- Color: 0xACCENT
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/fun/confession.py:152

**File:** commands/fun/confession.py (line ~152)

**Current:**

- Title: None
- Description: {emote.warn} I couldn't publish that confession. Please try again.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/fun/confession.py:166

**File:** commands/fun/confession.py (line ~166)

**Current:**

- Title: None
- Description: {emote.approve} Your anonymous confession was submitted as **#{confession_id}**.
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/fun/confession.py:214

**File:** commands/fun/confession.py (line ~214)

**Current:**

- Title: General Report
- Description: {str(self.context.value)}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Reporter` -> `{interaction.user.mention} ({interaction.user.id})`
  - `Submitted from` -> `{interaction.guild.name} ({interaction.guild.id})`
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/fun/confession.py:307

**File:** commands/fun/confession.py (line ~307)

**Current:**

- Title: None
- Description: {emote.warn} Confessions can only be configured in a server.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/fun/confession.py:327

**File:** commands/fun/confession.py (line ~327)

**Current:**

- Title: None
- Description: {emote.warn} {exc}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/fun/confession.py:351

**File:** commands/fun/confession.py (line ~351)

**Current:**

- Title: None
- Description: {emote.approve} Updated confession configuration:
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### make_setup_embed - commands/fun/confession.py:254

**File:** commands/fun/confession.py (line ~254)

**Current:**

- Title: Confession Setup
- Description: Use the buttons below to set up your confession system.
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: Click 'Send confession' to deploy, or 'Edit confession' to configure.
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction_check - commands/fun/confession.py:370

**File:** commands/fun/confession.py (line ~370)

**Current:**

- Title: None
- Description: {emote.warn} You do not have permission to configure confessions.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_confession - commands/fun/confession.py:404

**File:** commands/fun/confession.py (line ~404)

**Current:**

- Title: None
- Description: {emote.warn} Please run this in a text channel or configure one first.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_confession - commands/fun/confession.py:417

**File:** commands/fun/confession.py (line ~417)

**Current:**

- Title: None
- Description: {emote.warn} I do not have permission to send embeds in {target_channel.mention}.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_confession - commands/fun/confession.py:428

**File:** commands/fun/confession.py (line ~428)

**Current:**

- Title: None
- Description: {emote.warn} Failed to send confession panel to {target_channel.mention}.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_confession - commands/fun/confession.py:463

**File:** commands/fun/confession.py (line ~463)

**Current:**

- Title: None
- Description: {emote.approve} Posted confession panel in {target_channel.mention}.
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### log_submission - commands/fun/confession.py:594

**File:** commands/fun/confession.py (line ~594)

**Current:**

- Title: Confession #{confession_id}
- Description: **Author**: {author.mention} ({author.id})
- Color: None
- Author: None
- Thumbnail/Image: Image: {image}
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_panel - commands/fun/confession.py:643

**File:** commands/fun/confession.py (line ~643)

**Current:**

- Title: Cupi Confessions
- Description: Share something anonymously. Your identity is only visible in the private confession logs.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### confession overview - commands/fun/confession.py:679

**File:** commands/fun/confession.py (line ~679)

**Current:**

- Title: Confession Configuration
- Description: None
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: Use {ctx.clean_prefix}confession setup
- Fields:
  - `Channel` -> `Not configured`
  - `Default Color` -> `{color_str}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### confession_app report - commands/fun/confession.py:720

**File:** commands/fun/confession.py (line ~720)

**Current:**

- Title: Confession Report (#{confession_id})
- Description: **Author**: {interaction.user.mention} ({interaction.user.id})
  **Reason**: {reason}
- Color: None
- Author: None
- Thumbnail/Image: Image: {image}
- Footer: None
- Fields:
  - `Content` -> `{content}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### emoji enlarge - commands/fun/emoji.py:494

**File:** commands/fun/emoji.py (line ~494)

**Current:**

- Title: :{name}:
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: Image: {emoji_url}
- Footer: None
- Fields:
  - `ID` -> `{emoji_id}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### uwufy - commands/fun/uwufy.py:48

**File:** commands/fun/uwufy.py (line ~48)

**Current:**

- Title: None
- Description: You currently have **{charges:,}** uwufy charge(s).
- Color: None
- Author: Uwufy Charges
- Thumbnail/Image: None
- Footer: Check {ctx.prefix}store for more items
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## handlers

### parseembed - handlers/embedparser.py:523

**File:** handlers/embedparser.py (line ~523)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: name
- Thumbnail/Image: Thumbnail: {url}, Image: {url}
- Footer: {text}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## help.py

### build_group_view - commands/help.py:332

**File:** commands/help.py (line ~332)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Module: {module}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_command_view - commands/help.py:385

**File:** commands/help.py (line ~385)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Module: {module}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## lastfm

### on_submit - commands/lastfm/_auth_ui.py:53

**File:** commands/lastfm/_auth_ui.py (line ~53)

**Current:**

- Title: None
- Description: {emote.error} Invalid URL. Make sure you copied the entire redirect link.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/lastfm/_auth_ui.py:62

**File:** commands/lastfm/_auth_ui.py (line ~62)

**Current:**

- Title: None
- Description: {emote.loading} {user.mention}: Syncing your **Last.fm** account...
- Color: 0xCOLOR.LASTFM
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/lastfm/_auth_ui.py:74

**File:** commands/lastfm/_auth_ui.py (line ~74)

**Current:**

- Title: None
- Description: {emote.error} {exc}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/lastfm/_auth_ui.py:78

**File:** commands/lastfm/_auth_ui.py (line ~78)

**Current:**

- Title: None
- Description: {emote.error} Failed to connect your **Last.fm** account. Try again later.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### on_submit - commands/lastfm/_auth_ui.py:86

**File:** commands/lastfm/_auth_ui.py (line ~86)

**Current:**

- Title: None
- Description: {emote.lastfm} {user.mention}: Your **Last.fm** username has been set to [`{username}`]({profile_url})
- Color: 0xCOLOR.LASTFM
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_login_dm - commands/lastfm/_auth_ui.py:132

**File:** commands/lastfm/_auth_ui.py (line ~132)

**Current:**

- Title: Connect your Last.fm account
- Description: {body}
- Color: 0xCOLOR.LASTFM
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _embed - commands/lastfm/_ui.py:57

**File:** commands/lastfm/_ui.py (line ~57)

**Current:**

- Title: {title}
- Description: {description}
- Color: None
- Author: stella
- Thumbnail/Image: Thumbnail: {thumbnail}, Image: {image}
- Footer: {footer}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## moderation

### _dm_embed - commands/moderation/_shared.py:414

**File:** commands/moderation/_shared.py (line ~414)

**Current:**

- Title: {title_text}
- Description: You have been **{action.past}** from [{server_name}](https://discord.gg/cupi){duration_text} because {reason_text}.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: use the appeal server if you have something to say
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_embed - commands/moderation/fakeperms.py:168

**File:** commands/moderation/fakeperms.py (line ~168)

**Current:**

- Title: Fake Permissions Setup
- Description: {desc}
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _on_save - commands/moderation/fakeperms.py:235

**File:** commands/moderation/fakeperms.py (line ~235)

**Current:**

- Title: Fake Permissions Saved
- Description: -# The fake permissions roles have been updated successfully.
  **T Moderator** - {self._role_tag(self.roles['t_moderator'])}
  -# {TIER_INFO['t_moderator']['desc']}
  **Voice Moderator** - {self._role_tag(self.roles['voice_moderator'])}
  -# {TIER_INFO['voice_moderator']['desc']}
  **Moderator** - {self._role_tag(self.roles['moderator'])}
  -# {TIER_INFO['moderator']['desc']}
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### _on_cancel - commands/moderation/fakeperms.py:254

**File:** commands/moderation/fakeperms.py (line ~254)

**Current:**

- Title: None
- Description: Cancelled, fake permissions were not modified.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### fakepermissions list - commands/moderation/fakeperms.py:438

**File:** commands/moderation/fakeperms.py (line ~438)

**Current:**

- Title: Fake Permissions Overview
- Description: None
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Community Manager` -> `manager`
  - `Administrator` -> `admin`
  - `Head Moderator` -> `head_moderator`
  - `Moderator` -> `moderator`
  - `Voice Moderator` -> `voice_moderator`
- Buttons/View: None

### Your redesign:

_(fill in)_

### forcenick list - commands/moderation/forcenick.py:230

**File:** commands/moderation/forcenick.py (line ~230)

**Current:**

- Title: Forcenicked Members ({len(records)})
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Page {page_idx} of {len(chunks)}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### history view - commands/moderation/history.py:254

**File:** commands/moderation/history.py (line ~254)

**Current:**

- Title: None
- Description: None
- Color: 0xEMBED_COLOR
- Author: stella
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### modstats - commands/moderation/history.py:509

**File:** commands/moderation/history.py (line ~509)

**Current:**

- Title: Moderation Statistics for {target.name}
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Total Actions: {len(cases):,} | Cupi Moderation
- Fields:
  - `{period}` -> `{stats_details}`
- Buttons/View: None

### Your redesign:

_(fill in)_

## music

### build_text_embed - commands/music/_player.py:138

**File:** commands/music/_player.py (line ~138)

**Current:**

- Title: None
- Description: {description}
- Color: 0xCOLOR.MUSIC
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_loading_embed - commands/music/_player.py:157

**File:** commands/music/_player.py (line ~157)

**Current:**

- Title: None
- Description: {emote.loading} Searching for [`{display_query}`]({target_url})...
- Color: 0xCOLOR.LOADING
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_queue_added_embed - commands/music/_player.py:171

**File:** commands/music/_player.py (line ~171)

**Current:**

- Title: None
- Description: {emote.pingspin} Added {track_link(track)} to `{ordinal(position)}` in the **queue**
- Color: 0xCOLOR.MUSIC
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_playlist_added_embed - commands/music/_player.py:198

**File:** commands/music/_player.py (line ~198)

**Current:**

- Title: None
- Description: {emote.pingspin} Added **{added}** {plural} from {source}
- Color: 0xCOLOR.MUSIC
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### music_message - commands/music/_player.py:211

**File:** commands/music/_player.py (line ~211)

**Current:**

- Title: None
- Description: {emote.pingspin} {description}
- Color: 0xCOLOR.MUSIC
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_now_playing_embed - commands/music/_player.py:235

**File:** commands/music/_player.py (line ~235)

**Current:**

- Title: None
- Description: {emote.pingspin} now playing {track_link(track)} by **{track.artist}**
- Color: 0xCOLOR.MUSIC
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_music_queue_embed - commands/music/_player.py:271

**File:** commands/music/_player.py (line ~271)

**Current:**

- Title: None
- Description: {emote.pingspin} The queue is **empty**
- Color: 0xCOLOR.MUSIC
- Author: None
- Thumbnail/Image: None
- Footer: {footer_text}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### shazam - commands/music/shazam.py:128

**File:** commands/music/shazam.py (line ~128)

**Current:**

- Title: None
- Description: {SHAZAM_EMOJI} {ctx.author.mention}: Found {track_ref} by **{artist}**
- Color: 0xSHAZAM_COLOR
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## profile

### whois - commands/profile/whois.py:140

**File:** commands/profile/whois.py (line ~140)

**Current:**

- Title: None
- Description: None
- Color: 0xTOP_ROLE_COLOR
- Author: {target.name} ({target.id})
- Thumbnail/Image: {target.display_avatar.url}
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## roleplay

### _send_roleplay_embed - commands/roleplay/roleplay.py:196

**File:** commands/roleplay/roleplay.py (line ~196)

**Current:**

- Title: None
- Description: {text}
- Color: 0x24242C
- Author: None
- Thumbnail/Image: Image: {gif_url}
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## server

### bumpreminder - commands/server/bumpreminder.py:177

**File:** commands/server/bumpreminder.py (line ~177)

**Current:**

- Title: Disboard Bump Reminder
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Use {ctx.clean_prefix}bumpreminder [channel|role|test|reset] to configure
- Fields:
  - `Channel` -> `<#{channel_id}>`
  - `Role` -> `<@&{role_id}>`
- Buttons/View: None

### Your redesign:

_(fill in)_

## services

### send_moderation_log - services/logs.py:186

**File:** services/logs.py (line ~186)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: MODLOG_AUTHOR
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_join_log - services/logs.py:242

**File:** services/logs.py (line ~242)

**Current:**

- Title: None
- Description: {description}
- Color: None
- Author: {member.name} hopped in
- Thumbnail/Image: None
- Footer: User ID: {member.id}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_leave_log - services/logs.py:309

**File:** services/logs.py (line ~309)

**Current:**

- Title: None
- Description: {description}
- Color: None
- Author: {member.name} left
- Thumbnail/Image: None
- Footer: User ID: {member.id}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_roles_changed_log - services/logs.py:338

**File:** services/logs.py (line ~338)

**Current:**

- Title: None
- Description: {member.mention} was granted {role.mention}
- Color: None
- Author: Member Roles Updated
- Thumbnail/Image: None
- Footer: User ID: {member.id}
- Fields:
  - `Moderator` -> `{moderator.mention} ({moderator.id})`
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_roles_changed_log - services/logs.py:354

**File:** services/logs.py (line ~354)

**Current:**

- Title: None
- Description: {member.mention} was removed from {role.mention}
- Color: None
- Author: Member Roles Updated
- Thumbnail/Image: None
- Footer: User ID: {member.id}
- Fields:
  - `Moderator` -> `{moderator.mention} ({moderator.id})`
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_update_log - services/logs.py:384

**File:** services/logs.py (line ~384)

**Current:**

- Title: None
- Description: Member {after.mention} updated
- Color: None
- Author: Member Updated
- Thumbnail/Image: None
- Footer: User ID: {after.id}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_boost_log - services/logs.py:419

**File:** services/logs.py (line ~419)

**Current:**

- Title: None
- Description: Member {member.mention} boosted the server
- Color: None
- Author: Member Boosted
- Thumbnail/Image: None
- Footer: User ID: {member.id}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_member_unboost_log - services/logs.py:445

**File:** services/logs.py (line ~445)

**Current:**

- Title: None
- Description: Member {member.mention} removed their boost
- Color: None
- Author: Member Unboosted
- Thumbnail/Image: None
- Footer: User ID: {member.id}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_message_edit_log - services/logs.py:477

**File:** services/logs.py (line ~477)

**Current:**

- Title: None
- Description: Message from {after.author.mention} edited in {channel_mention} <t:{edited_timestamp}:R>
  [View the message]({message_link})
- Color: None
- Author: Message Edited
- Thumbnail/Image: None
- Footer: User ID: {after.author.id}
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_message_delete_log - services/logs.py:515

**File:** services/logs.py (line ~515)

**Current:**

- Title: None
- Description: Message from {message.author.mention} deleted in {channel_mention}
  It was sent <t:{message_timestamp}:F>
- Color: None
- Author: Message Deleted
- Thumbnail/Image: None
- Footer: User ID: {message.author.id}
- Fields:
  - `Attachments` -> `{attachments_str}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_bulk_delete_log - services/logs.py:559

**File:** services/logs.py (line ~559)

**Current:**

- Title: None
- Description: **{count} messages deleted in {channel.mention} <t:{deleted_timestamp}:R>**
  **Members**: {members_mentions}
- Color: None
- Author: Bulk Message Delete
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_ticket_created_log - services/logs.py:598

**File:** services/logs.py (line ~598)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: Ticket Created
- Thumbnail/Image: None
- Footer: {creator.id}
- Fields:
  - `Ticket` -> `-# {ticket_link}`
  - `Creator` -> `-# {creator.mention}`
  - `Category` -> `-# {category}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### send_ticket_closed_log - services/logs.py:629

**File:** services/logs.py (line ~629)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: Ticket Closed by {closer_name}
- Thumbnail/Image: None
- Footer: {footer_id}
- Fields:
  - `Ticket` -> `-# {ticket_link}`
  - `Creator` -> `-# {creator_text}`
  - `Category` -> `-# {category}`
- Buttons/View: None

### Your redesign:

_(fill in)_

## tickets

### ticket overview - commands/tickets/ticket.py:130

**File:** commands/tickets/ticket.py (line ~130)

**Current:**

- Title: Ticket Configuration
- Description: None
- Color: None
- Author: Adore Community
- Thumbnail/Image: None
- Footer: Use {ctx.clean_prefix}ticket role or {ctx.clean_prefix}ticket channel
- Fields:
  - `Status` -> `Active / Not Configured`
  - `Moderator Role` -> `{role_mention}`
  - `Support Panel` -> `Not set`
  - `Custom Embed` -> `Configured / Default`
  - `Appeal Panel` -> `Not set`
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket channel - commands/tickets/ticket.py:217

**File:** commands/tickets/ticket.py (line ~217)

**Current:**

- Title: None
- Description: Choose an option from the dropdown menu below to open a ticket.
  Please make sure to have everything ready before opening a ticket.
- Color: None
- Author: Appeal Support
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Appeal` -> `-# Submit a punishment appeal`
  - `Contact Staff` -> `-# Other server inquiries`
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket channel - commands/tickets/ticket.py:244

**File:** commands/tickets/ticket.py (line ~244)

**Current:**

- Title: None
- Description: Choose an option from the dropdown menu below to open a ticket.
  Please make sure to have everything ready before opening a ticket.
- Color: None
- Author: Server Support
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Report` -> `-# Report a server member to the staff team`
  - `Partnerships` -> `-# Paid promos and server partners`
  - `Contact Staff` -> `-# Other server inquiries`
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket embed - commands/tickets/ticket.py:305

**File:** commands/tickets/ticket.py (line ~305)

**Current:**

- Title: None
- Description: Choose an option from the dropdown menu below to open a ticket.
  Please make sure to have everything ready before opening a ticket.
- Color: None
- Author: Appeal Support
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Appeal` -> `-# Submit a punishment appeal`
  - `Contact Staff` -> `-# Other server inquiries`
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket embed - commands/tickets/ticket.py:313

**File:** commands/tickets/ticket.py (line ~313)

**Current:**

- Title: None
- Description: Choose an option from the dropdown menu below to open a ticket.
  Please make sure to have everything ready before opening a ticket.
- Color: None
- Author: Server Support
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Report` -> `-# Report a server member to the staff team`
  - `Partnerships` -> `-# Paid promos and server partners`
  - `Contact Staff` -> `-# Other server inquiries`
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket close - commands/tickets/ticket.py:500

**File:** commands/tickets/ticket.py (line ~500)

**Current:**

- Title: None
- Description: This ticket has been closed.
- Color: 0xF4A464
- Author: Ticket Closed
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Closer` -> `-# {ctx.author.mention}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket open - commands/tickets/ticket.py:593

**File:** commands/tickets/ticket.py (line ~593)

**Current:**

- Title: None
- Description: reopened this ticket thread ({ctx.author.mention})
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket remind - commands/tickets/ticket.py:658

**File:** commands/tickets/ticket.py (line ~658)

**Current:**

- Title: None
- Description: Please respond to your ticket here: {thread.jump_url}, moderators are waiting for your response.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket remind - commands/tickets/ticket.py:673

**File:** commands/tickets/ticket.py (line ~673)

**Current:**

- Title: None
- Description: Sent notification to **{username}** to respond as soon as possible.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### listener:on_member_remove - commands/tickets/ticket.py:843

**File:** commands/tickets/ticket.py (line ~843)

**Current:**

- Title: None
- Description: Ticket closed because {member.mention} (`{member.id}`) left the server.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## utility

### snipe - commands/utility/snipe.py:429

**File:** commands/utility/snipe.py (line ~429)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: Thumbnail: {stickers[0]}, Image: {attachments[0]}
- Footer: Deleted {time_ago} | {idx}/{total} messages
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### editsnipe - commands/utility/snipe.py:516

**File:** commands/utility/snipe.py (line ~516)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Edited {time_ago} | {idx}/{total} messages
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### reactionsnipe - commands/utility/snipe.py:563

**File:** commands/utility/snipe.py (line ~563)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: {entry.user_name}
- Thumbnail/Image: {entry.emoji_url}
- Footer: Removed {time_ago} | {idx}/{total} reactions
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### voice - commands/utility/tts.py:663

**File:** commands/utility/tts.py (line ~663)

**Current:**

- Title: None
- Description: Your current voice: **{current_name}** (`{current_key}`)
- Color: None
- Author: Robotic TTS Voices
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### urban - commands/utility/urban.py:83

**File:** commands/utility/urban.py (line ~83)

**Current:**

- Title: {definition.get('word', term)}
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: None
- Footer: Index {i}/{len(definitions)}
- Fields:
  - `Definition` -> `{definition_body}`
  - `Author` -> `By {author}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### membercount - commands/utility/utility.py:266

**File:** commands/utility/utility.py (line ~266)

**Current:**

- Title: None
- Description: None
- Color: None
- Author: welc to {guild.name} statistics
- Thumbnail/Image: None
- Footer: {sign}{joined_today} members today
- Fields:
  - `Users` -> `{total}`
  - `Humans` -> `{humans}`
  - `Bots` -> `{bots}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### color - commands/utility/utility.py:308

**File:** commands/utility/utility.py (line ~308)

**Current:**

- Title: {name}
- Description: None
- Color: None
- Author: stella
- Thumbnail/Image: {thumbnail_url}
- Footer: None
- Fields:
  - `Hex` -> `#{hex_code}`
  - `RGB` -> `{r}, {g}, {b}`
- Buttons/View: None

### Your redesign:

_(fill in)_

## utils

### send_transcript_to_creator - utils/transcripts.py:205

**File:** utils/transcripts.py (line ~205)

**Current:**

- Title: None
- Description: This ticket has been closed. Your transcript is attached.
- Color: None
- Author: Ticket Closed
- Thumbnail/Image: None
- Footer: None
- Fields:
  - `Ticket` -> `-# {thread_or_channel.name}`
  - `Category` -> `-# {category}`
- Buttons/View: None

### Your redesign:

_(fill in)_

### post_transcript_to_channel - utils/transcripts.py:249

**File:** utils/transcripts.py (line ~249)

**Current:**

- Title: Ticket Transcript
- Description: None
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: Ticket ID: {thread_or_channel.id} | {transcript_channel.guild.name}
- Fields:
  - `Category` -> `> {category}`
  - `Opened By` -> `> {creator_str}`
  - `Closed By` -> `> {closer_str}`
- Buttons/View: None

### Your redesign:

_(fill in)_

## voicemaster

### create_voicemaster_embed - commands/voicemaster/voicemaster.py:45

**File:** commands/voicemaster/voicemaster.py (line ~45)

**Current:**

- Title: None
- Description: Use the buttons below to control your voice channel.
- Color: None
- Author: VoiceMaster Interface
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### callback - commands/voicemaster/voicemaster.py:139

**File:** commands/voicemaster/voicemaster.py (line ~139)

**Current:**

- Title: None
- Description: {emote.approve} {interaction.user.mention}: Click the button below to start **{activity_name}** in your voice channel
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### handle_disconnect - commands/voicemaster/voicemaster.py:323

**File:** commands/voicemaster/voicemaster.py (line ~323)

**Current:**

- Title: None
- Description: {interaction.user.mention}: Select a **member** to disconnect
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### handle_activity - commands/voicemaster/voicemaster.py:334

**File:** commands/voicemaster/voicemaster.py (line ~334)

**Current:**

- Title: None
- Description: {interaction.user.mention}: Select an **activity** to start
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### handle_info - commands/voicemaster/voicemaster.py:361

**File:** commands/voicemaster/voicemaster.py (line ~361)

**Current:**

- Title: {channel.name}
- Description: None
- Color: None
- Author: VoiceMaster Interface
- Thumbnail/Image: {interaction.guild.me.display_avatar.url}
- Footer: None
- Fields:
  - `Bitrate` -> `{bitrate}kbps`
  - `Locked` -> `Yes / No`
  - `Ghosted` -> `Yes / No`
- Buttons/View: None

### Your redesign:

_(fill in)_

## interaction replies (ephemeral)

### interaction reply (warn) - commands/configuration/boosterrole.py:159

**File:** commands/configuration/boosterrole.py (line ~159)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/configuration/greetings/boost.py:165

**File:** commands/configuration/greetings/boost.py (line ~165)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this setup menu is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/configuration/greetings/boost.py:188

**File:** commands/configuration/greetings/boost.py (line ~188)

**Current:**

- Title: None
- Description: {interaction.user.mention}: {err}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/configuration/greetings/boost.py:221

**File:** commands/configuration/greetings/boost.py (line ~221)

**Current:**

- Title: None
- Description: {interaction.user.mention}: {err}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:425

**File:** commands/economy/store.py (line ~425)

**Current:**

- Title: None
- Description: This store menu is not for you.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:463

**File:** commands/economy/store.py (line ~463)

**Current:**

- Title: None
- Description: This store menu is not for you.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:471

**File:** commands/economy/store.py (line ~471)

**Current:**

- Title: None
- Description: Item not found.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:477

**File:** commands/economy/store.py (line ~477)

**Current:**

- Title: None
- Description: Economy service is currently unavailable.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:487

**File:** commands/economy/store.py (line ~487)

**Current:**

- Title: None
- Description: You need **{price:,}** coins for **{item['name']}**, but only have **{wallet:,}** in your wallet!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:501

**File:** commands/economy/store.py (line ~501)

**Current:**

- Title: None
- Description: Are you sure you want to buy **{item['name']}** (ID {item['num_id']}) for **{price:,}** coins?
  -# Item will be placed into your inventory. Use `,use {item['num_id']}` to activate.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:533

**File:** commands/economy/store.py (line ~533)

**Current:**

- Title: None
- Description: This confirmation is not for you.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:563

**File:** commands/economy/store.py (line ~563)

**Current:**

- Title: None
- Description: Business service is currently unavailable.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:580

**File:** commands/economy/store.py (line ~580)

**Current:**

- Title: None
- Description: {msg}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/economy/store.py:590

**File:** commands/economy/store.py (line ~590)

**Current:**

- Title: None
- Description: {success_text}
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:598

**File:** commands/economy/store.py (line ~598)

**Current:**

- Title: None
- Description: Business service is currently unavailable.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:605

**File:** commands/economy/store.py (line ~605)

**Current:**

- Title: None
- Description: Failed to determine business tier.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:628

**File:** commands/economy/store.py (line ~628)

**Current:**

- Title: None
- Description: {msg}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/economy/store.py:639

**File:** commands/economy/store.py (line ~639)

**Current:**

- Title: None
- Description: {success_text}
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/economy/store.py:648

**File:** commands/economy/store.py (line ~648)

**Current:**

- Title: None
- Description: You need **{price:,}** coins for **{item['name']}**, but only have **{current_wallet:,}** in your wallet!
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/economy/store.py:678

**File:** commands/economy/store.py (line ~678)

**Current:**

- Title: None
- Description: {purchase_text}
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (level) - embeds/embed.py:267

**File:** embeds/embed.py (line ~267)

**Current:**

- Title: None
- Description: {description}
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/paginator.py:164

**File:** embeds/paginator.py (line ~164)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:951

**File:** embeds/ticket_views.py (line ~951)

**Current:**

- Title: None
- Description: Please provide a valid numeric **Case ID** (e.g. `12`).
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:959

**File:** embeds/ticket_views.py (line ~959)

**Current:**

- Title: None
- Description: Case **#{case_id}** was not found in the records.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:965

**File:** embeds/ticket_views.py (line ~965)

**Current:**

- Title: None
- Description: Case **#{case_id}** does not belong to your account (<@{case['target_id']}>).
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:367

**File:** embeds/ticket_views.py (line ~367)

**Current:**

- Title: None
- Description: Only staff can delete this ticket.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:597

**File:** embeds/ticket_views.py (line ~597)

**Current:**

- Title: None
- Description: Only staff can delete this ticket.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:441

**File:** embeds/ticket_views.py (line ~441)

**Current:**

- Title: None
- Description: You do not have permission to reopen this ticket.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - embeds/ticket_views.py:460

**File:** embeds/ticket_views.py (line ~460)

**Current:**

- Title: None
- Description: the ticket has been reopened by {interaction.user.mention}
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:512

**File:** embeds/ticket_views.py (line ~512)

**Current:**

- Title: None
- Description: You do not have permission to close this ticket.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/ticket_views.py:743

**File:** embeds/ticket_views.py (line ~743)

**Current:**

- Title: None
- Description: Cupi AI is currently unavailable. Staff will assist you shortly.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/treeview.py:162

**File:** embeds/treeview.py (line ~162)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/treeview.py:515

**File:** embeds/treeview.py (line ~515)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/treeview.py:254

**File:** embeds/treeview.py (line ~254)

**Current:**

- Title: None
- Description: that is **not** a color
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - embeds/views.py:144

**File:** embeds/views.py (line ~144)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this paginator is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:42

**File:** events/afk.py (line ~42)

**Current:**

- Title: None
- Description: You cannot leave a message for yourself.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:51

**File:** events/afk.py (line ~51)

**Current:**

- Title: None
- Description: <@{self.target_user.id}> is already back
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:60

**File:** events/afk.py (line ~60)

**Current:**

- Title: None
- Description: Message content cannot be empty.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - events/afk.py:76

**File:** events/afk.py (line ~76)

**Current:**

- Title: None
- Description: Your message for <@{self.target_user.id}> has been saved! It will be sent to their DMs when they return.
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:84

**File:** events/afk.py (line ~84)

**Current:**

- Title: None
- Description: Failed to save message: {error}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:183

**File:** events/afk.py (line ~183)

**Current:**

- Title: None
- Description: <@{target_id}> is already back
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:193

**File:** events/afk.py (line ~193)

**Current:**

- Title: None
- Description: You cannot subscribe to your own return.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - events/afk.py:202

**File:** events/afk.py (line ~202)

**Current:**

- Title: None
- Description: <@{target_id}> is already back
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (cooldown) - events/afk.py:216

**File:** events/afk.py (line ~216)

**Current:**

- Title: None
- Description: You are already set to be notified when <@{target_id}> returns.
- Color: 0xE1E4FB
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - events/afk.py:223

**File:** events/afk.py (line ~223)

**Current:**

- Title: None
- Description: You will be notified in DMs when <@{target_id}> is back!
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/family/family.py:123

**File:** commands/family/family.py (line ~123)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/fun/image.py:100

**File:** commands/fun/image.py (line ~100)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/fun/pinterest.py:187

**File:** commands/fun/pinterest.py (line ~187)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/decorators.py:158

**File:** handlers/decorators.py (line ~158)

**Current:**

- Title: None
- Description: {msg}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/decorators.py:186

**File:** handlers/decorators.py (line ~186)

**Current:**

- Title: None
- Description: {msg}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/errorhandler.py:235

**File:** handlers/errorhandler.py (line ~235)

**Current:**

- Title: None
- Description: {message}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (cooldown) - handlers/errorhandler.py:347

**File:** handlers/errorhandler.py (line ~347)

**Current:**

- Title: None
- Description: Please wait **{wait}** before using this command again.
- Color: 0xE1E4FB
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/errorhandler.py:357

**File:** handlers/errorhandler.py (line ~357)

**Current:**

- Title: None
- Description: You are missing {missing}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/errorhandler.py:367

**File:** handlers/errorhandler.py (line ~367)

**Current:**

- Title: None
- Description: I am missing {missing}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/errorhandler.py:376

**File:** handlers/errorhandler.py (line ~376)

**Current:**

- Title: None
- Description: You cannot use this command here.
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - handlers/errorhandler.py:397

**File:** handlers/errorhandler.py (line ~397)

**Current:**

- Title: None
- Description: {msg}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/lastfm/lastfm.py:307

**File:** commands/lastfm/lastfm.py (line ~307)

**Current:**

- Title: None
- Description: {message}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/lastfm/lastfm.py:393

**File:** commands/lastfm/lastfm.py (line ~393)

**Current:**

- Title: None
- Description: {str(exc)}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/lastfm/lastfm.py:398

**File:** commands/lastfm/lastfm.py (line ~398)

**Current:**

- Title: None
- Description: {unavailable}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/lastfm/lastfm.py:909

**File:** commands/lastfm/lastfm.py (line ~909)

**Current:**

- Title: None
- Description: **Last.fm** is not configured on this bot
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/fakeperms.py:195

**File:** commands/moderation/fakeperms.py (line ~195)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this setup menu is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:99

**File:** commands/moderation/menus.py (line ~99)

**Current:**

- Title: None
- Description: **{typed}** is not a duration i understand, try something like **1h**, **30m** or **12h30m**
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:119

**File:** commands/moderation/menus.py (line ~119)

**Current:**

- Title: None
- Description: {str(exc)}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/moderation/menus.py:126

**File:** commands/moderation/menus.py (line ~126)

**Current:**

- Title: None
- Description: {outcome.message}
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:140

**File:** commands/moderation/menus.py (line ~140)

**Current:**

- Title: None
- Description: something went wrong applying that **{self.action.key}**
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:183

**File:** commands/moderation/menus.py (line ~183)

**Current:**

- Title: None
- Description: you need **{action.permission}** or a **fakeperms** role to use this
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:191

**File:** commands/moderation/menus.py (line ~191)

**Current:**

- Title: None
- Description: you cannot **{action.key}** yourself
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:199

**File:** commands/moderation/menus.py (line ~199)

**Current:**

- Title: None
- Description: i am not going to **{action.key}** myself
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:249

**File:** commands/moderation/menus.py (line ~249)

**Current:**

- Title: None
- Description: you need **manage messages** or a **fakeperms** role to view moderation history
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/moderation/menus.py:259

**File:** commands/moderation/menus.py (line ~259)

**Current:**

- Title: None
- Description: **{name(member)}** has no moderation history
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/profile/profile.py:110

**File:** commands/profile/profile.py (line ~110)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this one is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/profile/profile.py:428

**File:** commands/profile/profile.py (line ~428)

**Current:**

- Title: None
- Description: {message}
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:66

**File:** commands/voicemaster/voicemaster.py (line ~66)

**Current:**

- Title: None
- Description: User **not found** in this server
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:71

**File:** commands/voicemaster/voicemaster.py (line ~71)

**Current:**

- Title: None
- Description: You can't **disconnect yourself**
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:76

**File:** commands/voicemaster/voicemaster.py (line ~76)

**Current:**

- Title: None
- Description: {member.mention} is **not in your channel**
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:81

**File:** commands/voicemaster/voicemaster.py (line ~81)

**Current:**

- Title: None
- Description: You cannot **disconnect** a voice moderator
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:87

**File:** commands/voicemaster/voicemaster.py (line ~87)

**Current:**

- Title: None
- Description: **Disconnected** {member.mention}
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:91

**File:** commands/voicemaster/voicemaster.py (line ~91)

**Current:**

- Title: None
- Description: Failed to disconnect member
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:128

**File:** commands/voicemaster/voicemaster.py (line ~128)

**Current:**

- Title: None
- Description: You're not connected to a **voice channel**
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:157

**File:** commands/voicemaster/voicemaster.py (line ~157)

**Current:**

- Title: None
- Description: Failed to create activity invite
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:105

**File:** commands/voicemaster/voicemaster.py (line ~105)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this menu is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:171

**File:** commands/voicemaster/voicemaster.py (line ~171)

**Current:**

- Title: None
- Description: {interaction.user.mention}: this menu is **not** for you
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:242

**File:** commands/voicemaster/voicemaster.py (line ~242)

**Current:**

- Title: None
- Description: You're not connected to a **voice channel** you own
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:267

**File:** commands/voicemaster/voicemaster.py (line ~267)

**Current:**

- Title: None
- Description: Your **voice channel** has been **locked**
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:275

**File:** commands/voicemaster/voicemaster.py (line ~275)

**Current:**

- Title: None
- Description: Failed to lock channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:282

**File:** commands/voicemaster/voicemaster.py (line ~282)

**Current:**

- Title: None
- Description: Your **voice channel** has been **unlocked**
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:290

**File:** commands/voicemaster/voicemaster.py (line ~290)

**Current:**

- Title: None
- Description: Failed to unlock channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:297

**File:** commands/voicemaster/voicemaster.py (line ~297)

**Current:**

- Title: None
- Description: Your **voice channel** has been **hidden**
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:305

**File:** commands/voicemaster/voicemaster.py (line ~305)

**Current:**

- Title: None
- Description: Failed to hide channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:312

**File:** commands/voicemaster/voicemaster.py (line ~312)

**Current:**

- Title: None
- Description: Your **voice channel** has been **unhidden**
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:320

**File:** commands/voicemaster/voicemaster.py (line ~320)

**Current:**

- Title: None
- Description: Failed to unhide channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:384

**File:** commands/voicemaster/voicemaster.py (line ~384)

**Current:**

- Title: None
- Description: Your **voice channel**'s limit has been updated to `{new_limit}`
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:395

**File:** commands/voicemaster/voicemaster.py (line ~395)

**Current:**

- Title: None
- Description: Failed to update user limit
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:407

**File:** commands/voicemaster/voicemaster.py (line ~407)

**Current:**

- Title: None
- Description: Your **voice channel**'s limit has been updated to `{new_limit}`
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:418

**File:** commands/voicemaster/voicemaster.py (line ~418)

**Current:**

- Title: None
- Description: Failed to update user limit
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:422

**File:** commands/voicemaster/voicemaster.py (line ~422)

**Current:**

- Title: None
- Description: You're not connected to a **voice channel**
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:432

**File:** commands/voicemaster/voicemaster.py (line ~432)

**Current:**

- Title: None
- Description: This is not a **voice master** channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:440

**File:** commands/voicemaster/voicemaster.py (line ~440)

**Current:**

- Title: None
- Description: You already have **ownership** of this voice channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (warn) - commands/voicemaster/voicemaster.py:445

**File:** commands/voicemaster/voicemaster.py (line ~445)

**Current:**

- Title: None
- Description: The **owner** is still in the channel
- Color: 0xF4A464
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### interaction reply (success) - commands/voicemaster/voicemaster.py:458

**File:** commands/voicemaster/voicemaster.py (line ~458)

**Current:**

- Title: None
- Description: You now **own** this channel
- Color: 0x9DD2A8
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

## ConfirmView usages

### ConfirmView (autoresponder reset) - commands/autoresponder/autoresponder.py:585

**File:** commands/autoresponder/autoresponder.py (line ~585)

**Current:**

- Title: None
- Description: Action confirmation prompt for `autoresponder reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (autoreact deleteall) - commands/configuration/autoreact.py:199

**File:** commands/configuration/autoreact.py (line ~199)

**Current:**

- Title: None
- Description: Action confirmation prompt for `autoreact deleteall`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (autoreact reset) - commands/configuration/autoreact.py:266

**File:** commands/configuration/autoreact.py (line ~266)

**Current:**

- Title: None
- Description: Action confirmation prompt for `autoreact reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (filter reset) - commands/configuration/filter.py:402

**File:** commands/configuration/filter.py (line ~402)

**Current:**

- Title: None
- Description: Action confirmation prompt for `filter reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (transfer) - commands/economy/core.py:2571

**File:** commands/economy/core.py (line ~2571)

**Current:**

- Title: None
- Description: Action confirmation prompt for `transfer`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (divorce) - commands/family/family.py:475

**File:** commands/family/family.py (line ~475)

**Current:**

- Title: None
- Description: Action confirmation prompt for `divorce`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (disown) - commands/family/family.py:677

**File:** commands/family/family.py (line ~677)

**Current:**

- Title: None
- Description: Action confirmation prompt for `disown`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (runaway) - commands/family/family.py:718

**File:** commands/family/family.py (line ~718)

**Current:**

- Title: None
- Description: Action confirmation prompt for `runaway`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (abandon) - commands/family/family.py:745

**File:** commands/family/family.py (line ~745)

**Current:**

- Title: None
- Description: Action confirmation prompt for `abandon`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (emoji removeall) - commands/fun/emoji.py:372

**File:** commands/fun/emoji.py (line ~372)

**Current:**

- Title: None
- Description: Action confirmation prompt for `emoji removeall`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (lastfm logout) - commands/lastfm/lastfm.py:1186

**File:** commands/lastfm/lastfm.py (line ~1186)

**Current:**

- Title: None
- Description: Action confirmation prompt for `lastfm logout`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (customcommand reset) - commands/lastfm/lastfm.py:1407

**File:** commands/lastfm/lastfm.py (line ~1407)

**Current:**

- Title: None
- Description: Action confirmation prompt for `customcommand reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (level reset) - commands/levels/levels.py:756

**File:** commands/levels/levels.py (line ~756)

**Current:**

- Title: None
- Description: Action confirmation prompt for `level reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (_run) - commands/moderation/actions.py:276

**File:** commands/moderation/actions.py (line ~276)

**Current:**

- Title: None
- Description: Action confirmation prompt for `_run`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (unbanall) - commands/moderation/actions.py:482

**File:** commands/moderation/actions.py (line ~482)

**Current:**

- Title: None
- Description: Action confirmation prompt for `unbanall`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (fakepermissions reset) - commands/moderation/fakeperms.py:396

**File:** commands/moderation/fakeperms.py (line ~396)

**Current:**

- Title: None
- Description: Action confirmation prompt for `fakepermissions reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (history removeall) - commands/moderation/history.py:316

**File:** commands/moderation/history.py (line ~316)

**Current:**

- Title: None
- Description: Action confirmation prompt for `history removeall`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (clearcases) - commands/moderation/history.py:594

**File:** commands/moderation/history.py (line ~594)

**Current:**

- Title: None
- Description: Action confirmation prompt for `clearcases`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (clearnames) - commands/profile/names.py:82

**File:** commands/profile/names.py (line ~82)

**Current:**

- Title: None
- Description: Action confirmation prompt for `clearnames`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (cleanupdb) - commands/utility/utility.py:368

**File:** commands/utility/utility.py (line ~368)

**Current:**

- Title: None
- Description: Action confirmation prompt for `cleanupdb`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

### ConfirmView (voicemaster reset) - commands/voicemaster/voicemaster.py:577

**File:** commands/voicemaster/voicemaster.py (line ~577)

**Current:**

- Title: None
- Description: Action confirmation prompt for `voicemaster reset`.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red), author-only

### Your redesign:

_(fill in)_

## Components V2 screens

### antinuke overview - commands/configuration/antinuke.py:115

**File:** commands/configuration/antinuke.py (line ~115)

**Current:**

- Title: None
- Description: Overview card displaying Antinuke modules, operational status, and whitelisted administrator roles.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Settings (secondary) + Whitelist (secondary) + Refresh (blurple)

### Your redesign:

_(fill in)_

### variables - commands/configuration/greetings/_shared.py:285

**File:** commands/configuration/greetings/_shared.py (line ~285)

**Current:**

- Title: None
- Description: Variable cheat sheet card showing greeting placeholders (`{user}`, `{server}`, `{count}`) with usage tips.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### vanity overview - commands/configuration/vanity.py:148

**File:** commands/configuration/vanity.py (line ~148)

**Current:**

- Title: None
- Description: Overview card showing vanity tracking status, vanity keyword, award roles, and active booster stats.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### MinesGameView - commands/economy/core.py:742

**File:** commands/economy/core.py (line ~742)

**Current:**

- Title: None
- Description: **Mines:** {mines_count} | **Multiplier:** {multiplier:.2f}x | **Profit:** +{profit:,} coins

{grid_tiles}
-# Click tiles to reveal gems. Click Cash Out to claim earnings.

- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Cash Out (+{profit:,}) (green) + 5x5 Grid Buttons

### Your redesign:

_(fill in)_

### balance - commands/economy/core.py:1897

**File:** commands/economy/core.py (line ~1897)

**Current:**

- Title: None
- Description: **Wallet:** {wallet:,} coins
  **Bank:** {bank:,} / {capacity:,} coins ({percent}%)
  **Total Net Worth:** {net_worth:,} coins
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Deposit (green) + Withdraw (blurple)

### Your redesign:

_(fill in)_

### mine - commands/economy/core.py:3797

**File:** commands/economy/core.py (line ~3797)

**Current:**

- Title: None
- Description: **Pickaxe:** {pickaxe_name} ({durability}% durability)
  **Mined Ore:** {mined_ores_summary}
  -# Click Strike Vein to mine resources!
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Strike Vein (blurple) + Upgrade Pickaxe (secondary)

### Your redesign:

_(fill in)_

### store purchase callback - commands/economy/store.py:503

**File:** commands/economy/store.py (line ~503)

**Current:**

- Title: None
- Description: Are you sure you want to buy **{item['name']}** (ID {item['num_id']}) for **{price:,}** coins?
  -# Item will be placed into your inventory. Use `,use {item['num_id']}` to activate.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:

_(fill in)_

### store confirm - commands/economy/store.py:671

**File:** commands/economy/store.py (line ~671)

**Current:**

- Title: None
- Description: {emote.approve} Successfully purchased **{item['name']}** (ID {item['num_id']}) for **{price:,}** coins!
  -# Placed into your inventory. Use `,use {item['num_id']}` to activate.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### store buy - commands/economy/store.py:961

**File:** commands/economy/store.py (line ~961)

**Current:**

- Title: None
- Description: {emote.approve} Successfully purchased **{item['name']}** (ID {item['num_id']}) for **{price:,}** coins!
  -# Placed into your inventory. Use `,use {item['num_id']}` to activate.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### inventory - commands/economy/store.py:1034

**File:** commands/economy/store.py (line ~1034)

**Current:**

- Title: None
- Description: • **{item['name']}** (x{count}) - _{desc}_
  • Total inventory valuation: **{total_value:,}** coins
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Use Item (primary) + Sell Item (secondary) + Page navigation

### Your redesign:

_(fill in)_

### text helper - embeds/components.py:36

**File:** embeds/components.py (line ~36)

**Current:**

- Title: None
- Description: TextDisplay: clipped string or zero-width space.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### separator helper - embeds/components.py:41

**File:** embeds/components.py (line ~41)

**Current:**

- Title: None
- Description: Separator: spacing=spacing, visible=True
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### image helper - embeds/components.py:50

**File:** embeds/components.py (line ~50)

**Current:**

- Title: None
- Description: MediaGallery: single media item
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### gallery helper - embeds/components.py:55

**File:** embeds/components.py (line ~55)

**Current:**

- Title: None
- Description: MediaGallery: multiple media items
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### media_view helper - embeds/components.py:63

**File:** embeds/components.py (line ~63)

**Current:**

- Title: None
- Description: MediaGallery: dynamic items
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### view container helper - embeds/components.py:85

**File:** embeds/components.py (line ~85)

**Current:**

- Title: None
- Description: LayoutView + Container: wrapper for modern Discord component layouts
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### small_separator - embeds/components.py:263

**File:** embeds/components.py (line ~263)

**Current:**

- Title: None
- Description: Separator: small spacing, visible=True
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### layout_view helper - embeds/components.py:276

**File:** embeds/components.py (line ~276)

**Current:**

- Title: None
- Description: Container: child element wrapper with custom container kwargs
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### text_card helper - embeds/components.py:284

**File:** embeds/components.py (line ~284)

**Current:**

- Title: None
- Description: TextDisplay: formatted text card
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_list_view helper - embeds/components.py:303

**File:** embeds/components.py (line ~303)

**Current:**

- Title: None
- Description: TextDisplay list view with header, dynamic rows, and footer.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_image_view helper - embeds/components.py:317

**File:** embeds/components.py (line ~317)

**Current:**

- Title: None
- Description: MediaGallery with single image item.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_media_view helper - embeds/components.py:335

**File:** embeds/components.py (line ~335)

**Current:**

- Title: None
- Description: Full media layout with title, description, MediaGallery, and footer text.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### paginator init - embeds/paginator.py:95

**File:** embeds/paginator.py (line ~95)

**Current:**

- Title: None
- Description: Components V2 Container-based interactive paginator with heading and separator.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Previous + Next buttons

### Your redesign:

_(fill in)_

### paginator render - embeds/paginator.py:141

**File:** embeds/paginator.py (line ~141)

**Current:**

- Title: None
- Description: Renders paginated page content and page indicator footer.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Previous + Next buttons

### Your redesign:

_(fill in)_

### image paginator - commands/fun/image.py:51

**File:** commands/fun/image.py (line ~51)

**Current:**

- Title: None
- Description: MediaGallery image viewer with query caption and navigation controls.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Previous + Next buttons

### Your redesign:

_(fill in)_

### pinterest paginator - commands/fun/pinterest.py:120

**File:** commands/fun/pinterest.py (line ~120)

**Current:**

- Title: None
- Description: MediaGallery Pinterest gallery with pin title, board info, and navigation.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Previous + Next buttons

### Your redesign:

_(fill in)_

### parsecontainer - handlers/embedparser.py:601

**File:** handlers/embedparser.py (line ~601)

**Current:**

- Title: None
- Description: Parses custom script tags into Discord Components V2 Containers, TextDisplays, and Thumbnails.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### build_now_playing_view - commands/lastfm/_ui.py:124

**File:** commands/lastfm/_ui.py (line ~124)

**Current:**

- Title: None
- Description: Now Playing card with track thumbnail accessory, track/artist details, and scrobble counter.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### level overview - commands/levels/levels.py:243

**File:** commands/levels/levels.py (line ~243)

**Current:**

- Title: None
- Description: Leveling overview card showing XP rate status, XP sources (chat/voice), and level role rewards.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### level message - commands/levels/levels.py:528

**File:** commands/levels/levels.py (line ~528)

**Current:**

- Title: None
- Description: Level-up notification template card showing custom message format and available variables.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### profile gallery paginator - commands/profile/profile.py:56

**File:** commands/profile/profile.py (line ~56)

**Current:**

- Title: None
- Description: Profile banner and avatar gallery with interactive preview controls.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Previous + Next buttons

### Your redesign:

_(fill in)_

### avatar media view - commands/profile/profile.py:291

**File:** commands/profile/profile.py (line ~291)

**Current:**

- Title: None
- Description: Interactive avatar viewer supporting user, server, and animated avatars.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Download + Avatar switcher

### Your redesign:

_(fill in)_

### serveravatar media view - commands/profile/profile.py:330

**File:** commands/profile/profile.py (line ~330)

**Current:**

- Title: None
- Description: Server avatar gallery viewer.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Download + Reset

### Your redesign:

_(fill in)_

### banner media view - commands/profile/profile.py:372

**File:** commands/profile/profile.py (line ~372)

**Current:**

- Title: None
- Description: User banner gallery viewer.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Download

### Your redesign:

_(fill in)_

### serverbanner media view - commands/profile/profile.py:415

**File:** commands/profile/profile.py (line ~415)

**Current:**

- Title: None
- Description: Server banner gallery viewer.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Download

### Your redesign:

_(fill in)_

### slash_media helper - commands/profile/profile.py:436

**File:** commands/profile/profile.py (line ~436)

**Current:**

- Title: None
- Description: Unified media view reply for avatars, banners, and icons.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### roleplay_action helper - commands/roleplay/roleplay.py:247

**File:** commands/roleplay/roleplay.py (line ~247)

**Current:**

- Title: None
- Description: Action counter card showing user roleplay milestones and interaction counts.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: None

### Your redesign:

_(fill in)_

### ticket overview card - commands/tickets/ticket.py:120

**File:** commands/tickets/ticket.py (line ~120)

**Current:**

- Title: None
- Description: Ticket system overview card showing category setup, support panels, and claim settings.
- Color: None
- Author: None
- Thumbnail/Image: None
- Footer: None
- Fields: None
- Buttons/View: Role setup + Channel setup

### Your redesign:

_(fill in)_
