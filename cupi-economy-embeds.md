# Cupi Economy Embeds — Redesign Reference

Every economy-related embed Cupi sends, extracted and formatted for redesign.
Emotes use live Discord custom emote IDs:
- Approve: `<:approve:1545804705735647298>`
- Warning/Error/Deny: `<:warn:1545805127271714968>`
- Cooldown/Info: `<:cooldown:1545804785805172807>`
- Loading/Wait: `<a:loading:1545804965958914170>`

Color reference:
- Success: `0x9DD2A8`
- Warning/Error: `0xF4A464`
- Cooldown/Info: `0xE1E4FB`
- Loading: `0x7389D8`
- Dark/Default: `None`

---

## Shared helper styles

### `embeds.success`
**Current:**
- Title: none
- Description: `<:approve:1545804705735647298> Done! Your transaction was completed successfully.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `embeds.warn / embeds.error / embeds.deny (all identical)`
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> Something went wrong with your transaction. Please try again.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `embeds.cooldown / embeds.info`
**Current:**
- Title: none
- Description: `<:cooldown:1545804785805172807> You're doing that too fast. Try again in a moment.`
- Color: 0xE1E4FB
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `embeds.loading / embeds.wait`
**Current:**
- Title: none
- Description: `<a:loading:1545804965958914170> Processing transaction...`
- Color: 0x7389D8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `embeds.default`
**Current:**
- Title: none
- Description: `🪙 **@stella** picked up the dropped **25,000** coins!`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `embeds.api_error`
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> Failed to connect to the **Market API**`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `interaction_embed (level -> style)`
**Current:**
- Title: none
- Description: `<:approve:1545804705735647298> Transaction verified and recorded.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### `embeds.list_paginated`
**Current:**
- Title: `Economy Leaderboard`
- Description: `1. stella - 1,250,000 coins
  2. alex - 890,000 coins
  3. jordan - 640,000 coins`
- Color: None
- Fields: none
- Footer: `Page 1/3 (24 entries)`
- Thumbnail/Image: none
- Author: stella
- Buttons/View: Previous (secondary) + Next (secondary)

### Your redesign:
_(fill in)_

### `ConfirmView (cupi/embeds/views.py)`
**Current:**
- Title: none
- Description: `Please confirm your transaction below.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:
_(fill in)_

---

## economy

### button_callback - commands/economy/business/business.py:86
**File:** commands/economy/business/business.py (line ~86)
**Current:**
- Title: `🏎️ Rush Hour Shift`
- Description: `⏱️ **Time Left:** 18s | **Served:** 7 / 10
  
  👤 **Customer Order:** ☕ **Hot Latte**
  -# Click the matching button below!`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: ☕ Hot Latte (primary) + 🥐 Croissant (secondary)

### Your redesign:
_(fill in)_

### callback - commands/economy/business/business.py:192
**File:** commands/economy/business/business.py (line ~192)
**Current:**
- Title: `📦 Stock the Shelves Shift`
- Description: `Match all 4 emoji pairs in **16** moves or fewer!
  
  • **Moves Used:** 6 / 16
  • **Pairs Matched:** 2 / 4`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### accept - commands/economy/business/business.py:291
**File:** commands/economy/business/business.py (line ~291)
**Current:**
- Title: none
- Description: `🤝 <@alex> accepted the invitation and joined **Starlight Cafe** with a **15%** profit cut!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### decline - commands/economy/business/business.py:301
**File:** commands/economy/business/business.py (line ~301)
**Current:**
- Title: none
- Description: `<@alex> declined the partnership invitation.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### cancel - commands/economy/business/business.py:338
**File:** commands/economy/business/business.py (line ~338)
**Current:**
- Title: none
- Description: `Business sale cancelled.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### claim_all - commands/economy/business/business.py:374
**File:** commands/economy/business/business.py (line ~374)
**Current:**
- Title: `🎁 Milestones Claimed!`
- Description: `Successfully claimed **+45,000** coins!
  
  
  • **Cafe Expansion**`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### claim_all - commands/economy/business/business.py:383
**File:** commands/economy/business/business.py (line ~383)
**Current:**
- Title: none
- Description: `No task rewards were available to claim.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business - commands/economy/business/business.py:429
**File:** commands/economy/business/business.py (line ~429)
**Current:**
- Title: `📜 Business License Active`
- Description: You own a permanent **Business License**, but haven't started an enterprise yet!

• View available businesses: `,business list`
• Purchase an enterprise: `,business buy <tier> [name]`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business - commands/economy/business/business.py:439
**File:** commands/economy/business/business.py (line ~439)
**Current:**
- Title: `💼 Cupi Commercial Registry`
- Description: You do not own a **Business License** yet!

A business license allows you to own enterprises, earn hourly passive revenue, and partner with other players.

• **License Cost**: **500,000** coins (one-time, permanent)
• **Purchase**: `,business license` or `,store`
• **Explore Tiers**: `,business list`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Buy License (500k) (primary)

### Your redesign:
_(fill in)_

### business - commands/economy/business/business.py:504
**File:** commands/economy/business/business.py (line ~504)
**Current:**
- Title: `☕ Starlight Cafe`
- Description: `**Boutique Cafe** · Level **2/5** · Managing Partner`
- Color: None
- Fields:
  - `Hourly Income` -> `+15,000 coins / hr` (inline)
  - `Uncollected Revenue` -> `60,000 coins (4 hrs)` (inline)
  - `Cap & Timer` -> `Max 24h storage (360,000 cap)`
  - `Ownership & Cuts` -> `@stella (85%), @alex (15%)`
  - `Daily Collection Streak` -> `🔥 5-day streak (+10% bonus)`
- Footer: `🔥 5-day streak (+10%) • Lifetime: 850,000 coins`
- Thumbnail/Image: none
- Author: none
- Buttons/View: Collect (green) + Upgrade (blurple)

### Your redesign:
_(fill in)_

### business list - commands/economy/business/business.py:537
**File:** commands/economy/business/business.py (line ~537)
**Current:**
- Title: `🏢 Commercial Business Registry`
- Description: `Purchase an enterprise to earn passive hourly income continuously (even while offline)!
  Requires a **Business License** (500k one-time). Maximum 1 business per player.
  -# Upgrade cost = 2.5% of tier cost × current level. Each level adds +25% over base rate.`
- Color: None
- Fields:
  - `☕ Boutique Cafe` -> `Base Rate: 10,000/hr · Cost: 1,000,000 coins`
  - `🏪 Corner Store` -> `Base Rate: 25,000/hr · Cost: 2,500,000 coins`
  - `🏨 Luxury Hotel` -> `Base Rate: 75,000/hr · Cost: 7,500,000 coins`
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business license - commands/economy/business/business.py:579
**File:** commands/economy/business/business.py (line ~579)
**Current:**
- Title: `📜 Business License Active`
- Description: You already hold a verified **Business License**!

• Buy a business: `,business buy <tier> [name]`
• View tier catalog: `,business list`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business license - commands/economy/business/business.py:601
**File:** commands/economy/business/business.py (line ~601)
**Current:**
- Title: `📜 Business License Issued!`
- Description: Congratulations! You have purchased a permanent **Business License** for **500,000** coins.

• You can now purchase your own enterprise: `,business buy <tier>`
• You can now accept partnership invites from other business owners!
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business buy - commands/economy/business/business.py:693
**File:** commands/economy/business/business.py (line ~693)
**Current:**
- Title: `🎉 Enterprise Founded!`
- Description: Congratulations! You are now the owner of **Starlight Cafe** (Tier 2)!

• **Base Income**: **10,000** coins / hr
• **Starting Level**: Level **1/5**
• **Dashboard**: `,business`
• **Rename**: `,business name <new name>`
• **Collect**: `,business collect`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Open Dashboard (primary)

### Your redesign:
_(fill in)_

### business upgrade - commands/economy/business/business.py:747
**File:** commands/economy/business/business.py (line ~747)
**Current:**
- Title: `🚀 Business Upgraded!`
- Description: `Successfully upgraded **Starlight Cafe** to **Level 3/5** for **25,000** coins!
  
  • **New Base Hourly Rate**: **15,000** coins/hr (+25% over base)
  • **Next Upgrade**: Level 4 (50,000 coins)`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business collect - commands/economy/business/business.py:802
**File:** commands/economy/business/business.py (line ~802)
**Current:**
- Title: `💰 Profit Collected — Starlight Cafe`
- Description: `Collected **60,000** coins for **4 hour(s)** of revenue!
  
  **Disbursement Breakdown**:
  • @stella (85%): +51,000 coins
  • @alex (15%): +9,000 coins`
- Color: 0x9DD2A8
- Fields: none
- Footer: `🔥 5-day streak (+10%) • Lifetime: 850,000 coins`
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### _handle_business_name - commands/economy/business/business.py:829
**File:** commands/economy/business/business.py (line ~829)
**Current:**
- Title: `☕ Starlight Cafe`
- Description: Your business is currently named **`Starlight Cafe`**.

• **Change Name**: `,business name <new name>`
• **Rename Cost**: **50,000 coins** *(First rename is free, then 50,000 coins)*
• **Max Length**: 32 characters
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business invite - commands/economy/business/business.py:977
**File:** commands/economy/business/business.py (line ~977)
**Current:**
- Title: `🤝 Business Partnership Invitation`
- Description: `@alex, **stella** has invited you to join **Starlight Cafe** as a partner!
  
  • **Enterprise**: ☕ Boutique Cafe (Level 2)
  • **Starting Profit Cut**: **15%** of all collected profits
  • **Action Required**: Click **Accept** or **Decline** within 60 seconds.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Accept (green) + Decline (red)

### Your redesign:
_(fill in)_

### business sell - commands/economy/business/business.py:1129
**File:** commands/economy/business/business.py (line ~1129)
**Current:**
- Title: `⚠️ Sell Starlight Cafe?`
- Description: `Selling your business is **permanent and irreversible**!
  
  • **Total Capital Invested**: **1,000,000** coins
  • **Liquidation Refund (80%)**: **800,000** coins
  • **Refund Split**: Disbursed to owner & partners according to current profit cuts.
  
  Are you sure you want to sell your enterprise?`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm Sale (red) + Cancel (secondary)

### Your redesign:
_(fill in)_

### business sell - commands/economy/business/business.py:1154
**File:** commands/economy/business/business.py (line ~1154)
**Current:**
- Title: `💸 Business Sold — Starlight Cafe`
- Description: The enterprise has been liquidated for **800,000** coins.

**Refund Payouts**:
• @stella (85%): +680,000 coins
• @alex (15%): +120,000 coins

-# 📦 The enterprise has been moved to Cupi's black market pool (`,market`) for players to gamble on!
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business tasks - commands/economy/business/business.py:1197
**File:** commands/economy/business/business.py (line ~1197)
**Current:**
- Title: `🎯 Business Milestone Tasks`
- Description: Complete task objectives to earn coin bonuses!

• **Serve 50 Customers**: 42/50 (Reward: 25,000 coins)
• **Reach Level 3**: Complete ✅ (Reward: 50,000 coins)
• **Collect 100,000 coins**: 85,000/100,000 (Reward: 75,000 coins)
- Color: None
- Fields: none
- Footer: `Complete task objectives above to earn coin bonuses!`
- Thumbnail/Image: none
- Author: none
- Buttons/View: Claim Rewards (success)

### Your redesign:
_(fill in)_

### business public - commands/economy/business/business.py:1253
**File:** commands/economy/business/business.py (line ~1253)
**Current:**
- Title: `🚀 Starlight Cafe is now PUBLIC!`
- Description: Congratulations! **☕ Starlight Cafe** is officially listed on the 24/7 stock market.

• **Ticker Symbol:** `STR`
• **Initial Share Price:** 100 coins
• **Owner Stake:** 8,000 shares (80.0%)
• **Public Float:** 2,000 shares (20.0%)
• **Capital Raising:** 98% of investor purchases go directly to your wallet!

Players can now invest in your company with `,stocks buy STR <shares>`.
- Color: 0x9DD2A8
- Fields: none
- Footer: `To delist back to private ownership anytime, use ,business public`
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business public - commands/economy/business/business.py:1279
**File:** commands/economy/business/business.py (line ~1279)
**Current:**
- Title: `🔒 Starlight Cafe has been Delisted`
- Description: **Starlight Cafe** (`STR`) has been removed from the stock market and returned to private ownership (100% owner equity).

• **Shareholders Bought Out:** 3 investor(s)
• **Total Repurchased:** 75,000 coins at 125 coins/share (0% broker fee)
- Color: 0xF4A464
- Fields: none
- Footer: `You can re-list anytime with ,business public`
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1319
**File:** commands/economy/business/business.py (line ~1319)
**Current:**
- Title: `✅ Daily Shift Completed`
- Description: `You have already clocked in and completed your daily shift for **Starlight Cafe** today!
  
  Come back tomorrow (**00:00 UTC**) for your next shift.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1344
**File:** commands/economy/business/business.py (line ~1344)
**Current:**
- Title: `🎉 Daily Shift Completed!`
- Description: `Great job! Your shift for **Starlight Cafe** has been logged.
  
  • **Performance:** 100% orders served accurately
  • **Team Progress Today:** 4 / 5 workers completed
  
  📈 **Stock Impact at 00:00 UTC:**
  • 100% team participation → **+5% price boost**
  • 50–99% participation → **+2% boost**
  • 1–49% participation → **-2% penalty**
  • 0% participation → **-5% penalty**`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1375
**File:** commands/economy/business/business.py (line ~1375)
**Current:**
- Title: `🎉 Daily Shift Completed!`
- Description: Great job! Since **Starlight Cafe** is private, you earned your 1-hour wage directly:

• **Performance:** 100% orders served accurately
• **Wage Earned:** +12,500 coins
• **New Wallet:** 245,000 coins

💡 *Tip: Take your business public with `,business public` to turn shifts into stock price boosts!*
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1387
**File:** commands/economy/business/business.py (line ~1387)
**Current:**
- Title: `❌ Shift Incomplete`
- Description: You didn't meet the passing requirements for this shift.

• **Result:** 4 / 10 orders served accurately
• **Retries:** Unlimited attempts! Try again anytime today with `,business shift`.
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Try Again (primary)

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1410
**File:** commands/economy/business/business.py (line ~1410)
**Current:**
- Title: `🏎️ Rush Hour Shift`
- Description: `Serve at least **10** customers within 30 seconds!
  
  ⏱️ **Time Left:** 30s | **Served:** 0 / 10
  
  👤 **Customer Order:** ☕ **Hot Latte**
  -# Click the matching button below!`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: ☕ Hot Latte (primary) + 🥐 Croissant (secondary)

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1425
**File:** commands/economy/business/business.py (line ~1425)
**Current:**
- Title: `📦 Stock the Shelves Shift`
- Description: `Match all 4 emoji pairs in **16** moves or fewer!
  
  • **Moves Used:** 0 / 16
  • **Pairs Matched:** 0 / 4`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1447
**File:** commands/economy/business/business.py (line ~1447)
**Current:**
- Title: `🤝 Close the Deal Shift`
- Description: Type the contract phrase below in this channel within **35 seconds** (≥90% accuracy required):

```Cupi Commercial Enterprise Agreement #4892```
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### business shift - commands/economy/business/business.py:1477
**File:** commands/economy/business/business.py (line ~1477)
**Current:**
- Title: `💼 Clock In — Starlight Cafe`
- Description: `Clock in for your daily business shift to earn wages and boost company stock value.
  
  **Choose your mini-game:**
  • 🏎️ **Rush Hour:** Fast customer order serving (30s)
  • 📦 **Stock Shelves:** Emoji memory-match grid (≤16 moves)
  • 🤝 **Close the Deal:** Typing accuracy challenge (≥90%)
  
  -# You have unlimited attempts until one pass is logged today.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: 🏎️ Rush Hour (primary) + 📦 Stock Shelves (secondary) + 🤝 Close the Deal (secondary)

### Your redesign:
_(fill in)_

### _make_bj_embed - commands/economy/core.py:566
**File:** commands/economy/core.py (line ~566)
**Current:**
- Title: none
- Description: none
- Color: 0x9DD2A8
- Fields:
  - `Dealer [18]` -> `🂡 🂧 (18)` (inline)
  - `stella [20]` -> `🂪 🂺 (20)` (inline)
  - `Outcome` -> `🎲 ~ Player stands with 20. Dealer stands with 18. <:approve:1545804705735647298> Won 20,000 coins!`
- Footer: none
- Thumbnail/Image: none
- Author: `stella, you bet 10,000 coins to play blackjack`
- Buttons/View: Hit (primary) + Stand (secondary) + Double Down (success)

### Your redesign:
_(fill in)_

### _render_embed - commands/economy/core.py:972
**File:** commands/economy/core.py (line ~972)
**Current:**
- Title: `🥷 Robbery Raid in Progress!`
- Description: `A robbery raid has been launched against @alex!
  
  **Crew (4):** @stella, @alex, @jordan, @taylor
  **Win Chance:** **68%**
  **Entry Fees Pool:** **15,000** coins
  **Time Remaining:** in 28 seconds
  
  -# Click below to join the crew for **2,500** coins!`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Join Crew (2,500) (blurple)

### Your redesign:
_(fill in)_

### make_loan_receipt_embed - commands/economy/core.py:1212
**File:** commands/economy/core.py (line ~1212)
**Current:**
- Title: `🏦 Loan Disbursed — Receipt`
- Description: **100,000** coins have been deposited into your wallet.

• **Amount Received**: `100,000` coins
• **Repay-By Deadline**: September 27, 2026 at 11:30 PM (in 2 hours)
• **On-Time Total**: `105,000` coins (Principal + 5% fee)
• **Late Total**: `120,000` coins (Principal + 15% penalty)

⚠️ **Auto-Collect Warning**: Late loans trigger 10% hourly auto-collection from your bank storage.
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Repay Loan (success)

### Your redesign:
_(fill in)_

### show_amount_step - commands/economy/core.py:1385
**File:** commands/economy/core.py (line ~1385)
**Current:**
- Title: `🏦 Loan Application — Select Amount`
- Description: Selected Tier: **Standard Vault Loan** (`tier_2`)
Maximum Borrowable: **250,000** coins

Select a percentage below, or click **Custom Amount** to enter a specific number.
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: 25% (secondary) + 50% (secondary) + 75% (secondary) + 100% (primary)

### Your redesign:
_(fill in)_

### back_to_duration_callback - commands/economy/core.py:1412
**File:** commands/economy/core.py (line ~1412)
**Current:**
- Title: `🏦 Bank Loan Application`
- Description: Select your loan duration below. Tiers requiring higher bank storage are unlocked by expanding your vault with banknotes (`,store banknotes`).

Your Current Bank Storage: **500,000** coins
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: 6 Hours (primary) + 12 Hours (primary) + 24 Hours (primary)

### Your redesign:
_(fill in)_

### show_confirmation - commands/economy/core.py:1457
**File:** commands/economy/core.py (line ~1457)
**Current:**
- Title: `🏦 Confirm Loan Application`
- Description: `Borrow **100,000** for **tier_2** → repay **105,000** by September 27, 2026 at 11:30 PM (in 2 hours), or owe **120,000** if late.
  
  • **Duration**: Standard Vault Loan (tier_2)
  • **Payout**: Deposited immediately into your wallet
  • **Auto-Collect Notice**: Late loans trigger 10% hourly auto-collection from your bank storage and freeze bank withdrawals.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm Loan (green) + Cancel (red)

### Your redesign:
_(fill in)_

### confirm_callback - commands/economy/core.py:1487
**File:** commands/economy/core.py (line ~1487)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> You already have an active loan! Pay it off with \`,loan repay\` before applying for another.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### cancel_callback - commands/economy/core.py:1504
**File:** commands/economy/core.py (line ~1504)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> Loan application cancelled.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### loan_processor - commands/economy/core.py:1758
**File:** commands/economy/core.py (line ~1758)
**Current:**
- Title: `🚨 Cupid Bank — Loan Default Notice`
- Description: Your loan deadline of September 27, 2026 at 11:30 PM has expired.

• A **15% late penalty** has been added to your remaining principal.
• **Current Outstanding Debt**: **50,000** coins
• **Auto-Collection Active**: 10% of remaining debt will be auto-collected hourly from your bank storage.
• **Bank Withdrawals Frozen**: Withdrawals are blocked until this debt is cleared.

You can settle your debt anytime from your wallet using `,loan repay`.
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Repay Debt (danger)

### Your redesign:
_(fill in)_

### loan_processor - commands/economy/core.py:1782
**File:** commands/economy/core.py (line ~1782)
**Current:**
- Title: `⚠️ Urgent: Cupid Bank Loan Due Soon (80% Elapsed)`
- Description: Your loan deadline is rapidly approaching in 30 minutes!

• **Remaining Amount Due**: **50,000** coins
• **Deadline**: September 27, 2026 at 11:30 PM
• **Late Warning**: If missed, late penalty triggers and total debt jumps to **120,000** coins with hourly auto-collection from your bank.

Repay now with `,loan repay` to avoid penalties.
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Repay Now (success)

### Your redesign:
_(fill in)_

### loan_processor - commands/economy/core.py:1805
**File:** commands/economy/core.py (line ~1805)
**Current:**
- Title: `⏰ Cupid Bank — Loan Reminder (50% Elapsed)`
- Description: Half of your loan duration has passed.

• **Amount Due On-Time**: **105,000** coins (Remaining: **50,000**)
• **Time Left**: in 1 hour (Deadline: September 27, 2026 at 11:30 PM)
• **Late Penalty Total**: **120,000** coins if unpaid after deadline.

Repay anytime with `,loan repay [amount]` from your wallet.
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Repay Loan (success)

### Your redesign:
_(fill in)_

### loan_processor - commands/economy/core.py:1828
**File:** commands/economy/core.py (line ~1828)
**Current:**
- Title: `✅ Cupid Bank — Loan Cleared`
- Description: `Your remaining loan debt has been fully settled via bank auto-collection!
  
  • Final auto-collection: **50,000** coins
  • Remaining debt: **0** coins
  • Bank withdrawals have been **unlocked**.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### loan - commands/economy/core.py:2143
**File:** commands/economy/core.py (line ~2143)
**Current:**
- Title: `🏦 Cupid Bank — Loan Center`
- Description: `Borrow coins directly into your wallet with flexible terms.
  Your Bank Storage: **500,000** coins
  
  **Loan Tiers**
  • **Tier 1 (Starter)**: Up to 50,000 coins (5% fee)
  • **Tier 2 (Standard)**: Up to 250,000 coins (5% fee)
  • **Tier 3 (Enterprise)**: Up to 1,000,000 coins (7% fee)
  
  **Your Loan Status**
  • No active loans. You are eligible to apply!`
- Color: None
- Fields: none
- Footer: `Default bank storage is 100k. Buy banknotes via ,store banknotes to unlock larger tiers!`
- Thumbnail/Image: none
- Author: none
- Buttons/View: Apply for Loan (primary)

### Your redesign:
_(fill in)_

### loan apply - commands/economy/core.py:2182
**File:** commands/economy/core.py (line ~2182)
**Current:**
- Title: `🏦 Bank Loan Application`
- Description: Select your loan duration below. Tiers requiring higher bank storage are unlocked by expanding your vault with banknotes (`,store banknotes`).

Your Current Bank Storage: **500,000** coins
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: 6 Hours (primary) + 12 Hours (primary) + 24 Hours (primary)

### Your redesign:
_(fill in)_

### loan repay - commands/economy/core.py:2331
**File:** commands/economy/core.py (line ~2331)
**Current:**
- Title: `🎉 Loan Fully Repaid!`
- Description: You paid **50,000** coins from your wallet and completely cleared your loan!

• **Remaining Debt**: `0` coins
• **Bank Withdrawals**: Unlocked ✅
• **New Loans**: Eligible ✅
• **Wallet Remaining**: **175,000** coins
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### loan repay - commands/economy/core.py:2348
**File:** commands/economy/core.py (line ~2348)
**Current:**
- Title: `🏦 Loan Repayment Received`
- Description: `You paid **50,000** coins from your wallet.
  
  • **Repaid Total**: **50,000** coins
  • **Remaining Debt**: **0** coins
  • **Repay-By Deadline**: in 2 days (September 29, 2026)
  • **Wallet Remaining**: **125,000** coins`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### loan status - commands/economy/core.py:2405
**File:** commands/economy/core.py (line ~2405)
**Current:**
- Title: `🏦 Active Loan Breakdown`
- Description: • **Tier**: Standard Vault Loan (`tier_2`)
• **Borrowed (Principal)**: **100,000** coins
• **Repaid So Far**: **25,000** coins
• **On-Time Total Due**: **105,000** coins (Fee: 5%)
• **Remaining Due**: **80,000** coins
• **Repay-By Deadline**: September 27, 2026 at 11:30 PM (in 2 hours)
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Repay Now (success)

### Your redesign:
_(fill in)_

### loan status - commands/economy/core.py:2429
**File:** commands/economy/core.py (line ~2429)
**Current:**
- Title: `🚨 Defaulted Loan Breakdown`
- Description: • **Status**: ⚠️ **DEFAULTED** (Deadline passed)
• **Original Principal**: **100,000** coins
• **Late Penalty Rate**: `15%`
• **Repaid / Collected Total**: **25,000** coins
• **Current Remaining Debt**: **50,000** coins
• **Auto-Collect Rate**: 10% of debt (`5,000` coins) taken hourly from bank
• **Next Auto-Collect Cycle**: in 42 minutes
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Repay Debt (danger)

### Your redesign:
_(fill in)_

### transfer - commands/economy/core.py:2566
**File:** commands/economy/core.py (line ~2566)
**Current:**
- Title: none
- Description: `Are you sure you want to transfer **25,000** coins to @alex?`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:
_(fill in)_

### transfer - commands/economy/core.py:2588
**File:** commands/economy/core.py (line ~2588)
**Current:**
- Title: none
- Description: `<:approve:1545804705735647298> Successfully transferred **25,000** coins to @alex!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### transfer - commands/economy/core.py:2598
**File:** commands/economy/core.py (line ~2598)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> Transfer canceled.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### steal - commands/economy/core.py:2719
**File:** commands/economy/core.py (line ~2719)
**Current:**
- Title: `⚠️ Robbery Raid Alert!`
- Description: `Someone's trying to rob you in **Adore Community**!
  
  **Raid Leader:** @alex
  You have **30 seconds** to press the button below to stop the raid and confiscate their entry fees!`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: 🛡️ Stop Raid (success)

### Your redesign:
_(fill in)_

### steal - commands/economy/core.py:2777
**File:** commands/economy/core.py (line ~2777)
**Current:**
- Title: `🛡️ Raid Successfully Stopped!`
- Description: `You caught the thieves in the act!
  
  **Caught Culprits:** @alex, @jordan, @taylor
  Entry fees pool (10,000 coins) credited to your wallet!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### steal - commands/economy/core.py:2801
**File:** commands/economy/core.py (line ~2801)
**Current:**
- Title: `🛑 Raid Stopped!`
- Description: `> *“You thought you could rob me in my own city?”*
  
  **alex** caught the raid crew!
  The raid has failed and you were caught. 5,000 coins were seized as a security penalty.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### steal - commands/economy/core.py:2839
**File:** commands/economy/core.py (line ~2839)
**Current:**
- Title: `🚨 Raid Failed!`
- Description: `> *“Security alarms triggered on the perimeter!”*
  
  The raid has failed and you were caught! 5,000 coins were seized as a security penalty.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### steal - commands/economy/core.py:2861
**File:** commands/economy/core.py (line ~2861)
**Current:**
- Title: `💰 Raid Empty!`
- Description: `The raiders breached **alex**'s wallet, but found nothing left to take!
  -# All entry fees (15,000 coins) were spent on getaway gear.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### steal - commands/economy/core.py:2881
**File:** commands/economy/core.py (line ~2881)
**Current:**
- Title: `💰 Robbery Raid Successful!`
- Description: `The crew breached **alex**'s wallet and made off with **42,500** coins (35.0%)!
  
  **Loot Distribution:**
  • @stella (Leader): +21,250 coins
  • @jordan: +10,625 coins
  • @taylor: +10,625 coins
  
  -# All entry fees (15,000 coins) were spent on getaway gear.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### coinflip - commands/economy/core.py:3318
**File:** commands/economy/core.py (line ~3318)
**Current:**
- Title: none
- Description: `🪙 Spinning a coin for **10,000** coins...`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### coinflip - commands/economy/core.py:3334
**File:** commands/economy/core.py (line ~3334)
**Current:**
- Title: none
- Description: `🪙 You chose **heads** and it landed on **heads**!
  <:approve:1545804705735647298> You won **20,000** coins!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### coinflip - commands/economy/core.py:3342
**File:** commands/economy/core.py (line ~3342)
**Current:**
- Title: none
- Description: `🪙 You chose **heads**, but it landed on **tails**!
  You lost **10,000** coins!`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### dice - commands/economy/core.py:3376
**File:** commands/economy/core.py (line ~3376)
**Current:**
- Title: none
- Description: `🎲 Rolling the dice for **10,000** coins...`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### dice - commands/economy/core.py:3393
**File:** commands/economy/core.py (line ~3393)
**Current:**
- Title: none
- Description: `🎲 You rolled **11** (⚅ ⚄) and Cupi rolled **7** (⚂ ⚃)!
  <:approve:1545804705735647298> You won **20,000** coins!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### dice - commands/economy/core.py:3401
**File:** commands/economy/core.py (line ~3401)
**Current:**
- Title: none
- Description: `🎲 You rolled **6** (⚂ ⚂) and Cupi rolled **10** (⚄ ⚄)!
  You lost **10,000** coins!`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### slot - commands/economy/core.py:3473
**File:** commands/economy/core.py (line ~3473)
**Current:**
- Title: none
- Description: `🎰 [ 🍒 | 🍒 | 🍒 ]
  
  <:approve:1545804705735647298> **JACKPOT!** You matched 3 cherries!
  You won **50,000** coins!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Spin Again (primary)

### Your redesign:
_(fill in)_

### roulette - commands/economy/core.py:3710
**File:** commands/economy/core.py (line ~3710)
**Current:**
- Title: none
- Description: `🎡 Spinning the roulette wheel for **10,000** coins on **red (1-18)**...`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### roulette - commands/economy/core.py:3726
**File:** commands/economy/core.py (line ~3726)
**Current:**
- Title: none
- Description: `🔴 The ball landed on **14 (Red)**!
  <:approve:1545804705735647298> You won **20,000** coins on **red (1-18)**!`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### roulette - commands/economy/core.py:3734
**File:** commands/economy/core.py (line ~3734)
**Current:**
- Title: none
- Description: `⚫ The ball landed on **17 (Black)**!
  You lost **10,000** coins on **red (1-18)**!`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### _browse - commands/economy/market/market.py:171
**File:** commands/economy/market/market.py (line ~171)
**Current:**
- Title: `Cupi's Black Market`
- Description: The dealer's shelves are bare. Pawn something.

-# Pawn items from your inventory with `,market sell <item> [qty]`.
- Color: None
- Fields: none
- Footer: `Odds: Common 60% · Rare 30% · Epic 9% · Legendary 1% • Pity: 0/3 duds`
- Thumbnail/Image: none
- Author: `stella's Market View`
- Buttons/View: none

### Your redesign:
_(fill in)_

### _browse - commands/economy/market/market.py:209
**File:** commands/economy/market/market.py (line ~209)
**Current:**
- Title: `Cupi's Black Market`
- Description: Mystery crates available for purchase!

• 📦 **Mystery Crate #1**: 50,000 coins (Contains rare items)
• 📦 **Mystery Crate #2**: 150,000 coins (Contains enterprise keys)
• 📦 **Golden Crate**: 500,000 coins (High jackpot chance)
- Color: None
- Fields: none
- Footer: `Page 1/4 (18 items available)`
- Thumbnail/Image: none
- Author: `stella's Market View`
- Buttons/View: Buy Crate #1 (primary) + Buy Crate #2 (secondary)

### Your redesign:
_(fill in)_

### market buy - commands/economy/market/market.py:442
**File:** commands/economy/market/market.py (line ~442)
**Current:**
- Title: none
- Description: `<:approve:1545804705735647298> You opened **Mystery Crate #1** and found: 🍀 **Lucky Clover** (Rare)!`
- Color: 0x9DD2A8
- Fields: none
- Footer: `Odds: Common 60% · Rare 30% · Epic 9% · Legendary 1% • Pity: 0/3 duds`
- Thumbnail/Image: none
- Author: stella
- Buttons/View: none

### Your redesign:
_(fill in)_

### market buy - commands/economy/market/market.py:466
**File:** commands/economy/market/market.py (line ~466)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> You opened **Mystery Crate #1** and found: 🪨 **Pocket Lint** (Dud). Better luck next time!`
- Color: 0xF4A464
- Fields: none
- Footer: `Odds: Common 60% · Rare 30% · Epic 9% · Legendary 1% • Pity: 1/3 duds`
- Thumbnail/Image: none
- Author: stella
- Buttons/View: none

### Your redesign:
_(fill in)_

### stocks - commands/economy/market/stocks.py:200
**File:** commands/economy/market/stocks.py (line ~200)
**Current:**
- Title: `📈 Cupi Stock Market — 24/7 Player Capital Market`
- Description: Trade shares in player-owned enterprises around the clock!

• **STR** (Starlight Cafe): 125 coins/share (+4.2%)
• **COR** (Corner Store): 240 coins/share (+1.8%)
• **LUX** (Luxury Hotel): 850 coins/share (-0.5%)
- Color: None
- Fields: none
- Footer: `Trade 24/7 around the clock · Direct 98% investment to owners`
- Thumbnail/Image: none
- Author: none
- Buttons/View: View STR (primary) + Portfolio (secondary)

### Your redesign:
_(fill in)_

### _show_ambiguous_matches - commands/economy/market/stocks.py:248
**File:** commands/economy/market/stocks.py (line ~248)
**Current:**
- Title: `🔍 Multiple Businesses Matched`
- Description: Multiple listings matched **cafe**:

• **STR** — Starlight Cafe (125 coins)
• **CAF** — Cyber Cafe (85 coins)

Please specify the ticker symbol (e.g. `,stocks view STR`).
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### stocks view - commands/economy/market/stocks.py:333
**File:** commands/economy/market/stocks.py (line ~333)
**Current:**
- Title: `☕ Starlight Cafe · STR`
- Description: `Popular boutique cafe chain founded by @stella.`
- Color: None
- Fields:
  - `Owner` -> `<@stella>`
  - `Tier & Level` -> `Boutique Cafe (L3)`
  - `Market Cap` -> `1,250,000 coins` (inline)
  - `Raised from Investors` -> `350,000 coins`
  - `Equity Structure` -> `Owner: **80.0%** (8,000 sh)
Float: **20.0%** (2,000 sh)`
  - `Your Position` -> `250 shares`
  - `Avg Buy Price` -> `120 coins/share` (inline)
  - `Your P/L` -> `+1,250 coins (+4.2%)` (inline)
- Footer: `,stocks buy str <shares> · ,stocks sell str <shares>`
- Thumbnail/Image: `https://cdn.discordapp.com/embed/avatars/1.png`
- Author: none
- Buttons/View: Buy Shares (success) + Sell Shares (danger)

### Your redesign:
_(fill in)_

### stocks buy - commands/economy/market/stocks.py:451
**File:** commands/economy/market/stocks.py (line ~451)
**Current:**
- Title: `📈 Shares Purchased`
- Description: `Successfully purchased **10** share(s) of **☕ Starlight Cafe · STR**!
  
  • **Purchase Price:** 125 coins/share (1,250 coins total)
  • **Direct Investment:** **+1,225** coins (98%) went straight to <@stella>'s wallet!
  • **Your Position:** 260 / 100 shares
  • **Average Buy Price:** 120 coins/share
  • **New Market Price:** 128 coins (+2.4% trade impact)`
- Color: 0x9DD2A8
- Fields: none
- Footer: `View your portfolio with ,portfolio`
- Thumbnail/Image: `https://cdn.discordapp.com/embed/avatars/1.png`
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### stocks sell - commands/economy/market/stocks.py:543
**File:** commands/economy/market/stocks.py (line ~543)
**Current:**
- Title: `👑 Company Stake Sold`
- Description: `Successfully sold **10** share(s) from your company stake into the market!
  
  • **Sell Price:** 125 coins/share
  • **Gross Proceeds:** 1,250 coins
  • **House Fee (2%):** -25 coins
  • **Net Payout:** **+1,225** coins (credited to wallet)
  • **Remaining Owner Stake:** 7,500 shares (75.0%)
  • **Public Float:** 2,500 shares (25.0%)`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### stocks sell - commands/economy/market/stocks.py:566
**File:** commands/economy/market/stocks.py (line ~566)
**Current:**
- Title: `📉 Shares Sold`
- Description: `Successfully sold **10** share(s) of **☕ Starlight Cafe · STR**!
  
  • **Sell Price:** 125 coins/share
  • **Gross Value:** 1,250 coins
  • **Broker Fee (2%):** -25 coins
  • **Net Payout:** +1,225 coins (credited to wallet)
  • **Realized P/L:** +4,500 coins (+18.2%)
  • **Remaining Position:** 150 share(s)`
- Color: 0x9DD2A8
- Fields: none
- Footer: `View your portfolio with ,portfolio`
- Thumbnail/Image: `https://cdn.discordapp.com/embed/avatars/1.png`
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### _show_portfolio - commands/economy/market/stocks.py:625
**File:** commands/economy/market/stocks.py (line ~625)
**Current:**
- Title: `💼 Stock Portfolio`
- Description: You don't own any player business stocks yet!

• View the market: `,stocks`
• Inspect a stock: `,stocks view <listing>`
• Buy shares: `,stocks buy <listing> <shares>`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### _show_portfolio - commands/economy/market/stocks.py:692
**File:** commands/economy/market/stocks.py (line ~692)
**Current:**
- Title: `💼 stella's Stock Portfolio`
- Description: **Total Portfolio Value:** 32,500 coins
**Total Unrealized P/L:** +3,250 coins (+11.1%)

• **STR** (Starlight Cafe): 250 shares @ 125 coins (+1,250)
• **COR** (Corner Store): 50 shares @ 240 coins (+2,000)
- Color: None
- Fields: none
- Footer: `,stocks view <listing> · ,stocks buy/sell`
- Thumbnail/Image: `https://cdn.discordapp.com/embed/avatars/0.png`
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### build_store_embed - commands/economy/store.py:752
**File:** commands/economy/store.py (line ~752)
**Current:**
- Title: `🏪 Cupid Department Store`
- Description: Browse items, boosters, and licenses available for purchase!

• 🍀 **Lucky Clover** — 5,000 coins (ID 42)
• 📜 **Business License** — 500,000 coins (ID 1)
• 🏦 **Banknotes** — 50,000 coins (ID 2)
• 🐾 **Uwufy Pass** — 10,000 coins (ID 5)
- Color: None
- Fields: none
- Footer: `Use ,buy <ID or name> [amount] | Switch departments below`
- Thumbnail/Image: none
- Author: stella
- Buttons/View: Items (primary) + Licenses (secondary) + Boosters (secondary)

### Your redesign:
_(fill in)_

---

## economy events

### _recover_active_drops - events/moneydrop.py:136
**File:** events/moneydrop.py (line ~136)
**Current:**
- Title: none
- Description: `⌛ This money drop of **25,000** coins expired unclaimed and was refunded.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### send_money_drop - events/moneydrop.py:234
**File:** events/moneydrop.py (line ~234)
**Current:**
- Title: none
- Description: 🪙 Oh no, looks like someone dropped their money! Use `,pick` to grab **25,000** coins!
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: 🪙 Pick Up (success)

### Your redesign:
_(fill in)_

### send_money_drop - events/moneydrop.py:278
**File:** events/moneydrop.py (line ~278)
**Current:**
- Title: none
- Description: `⌛ This money drop was superseded by a new drop and refunded.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### _expire_manual_drop - events/moneydrop.py:340
**File:** events/moneydrop.py (line ~340)
**Current:**
- Title: none
- Description: `⌛ This money drop of **25,000** coins expired unclaimed and was refunded.`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

---

## economy interaction replies

### interaction reply (warn) - commands/economy/store.py:425
**File:** commands/economy/store.py (line ~425)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> This store menu is not for you.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### interaction reply (warn) - commands/economy/store.py:471
**File:** commands/economy/store.py (line ~471)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> Item not found.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### interaction reply (warn) - commands/economy/store.py:477
**File:** commands/economy/store.py (line ~477)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> Economy service is currently unavailable.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### interaction reply (warn) - commands/economy/store.py:487
**File:** commands/economy/store.py (line ~487)
**Current:**
- Title: none
- Description: `<:warn:1545805127271714968> You need **5,000** coins for **Lucky Clover**, but only have **1,200** in your wallet!`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

### interaction reply (warn) - commands/economy/store.py:501
**File:** commands/economy/store.py (line ~501)
**Current:**
- Title: none
- Description: `Are you sure you want to buy 🍀 **Lucky Clover** (ID 42) for **5,000** coins?
  -# Item will be placed into your inventory. Use \`,use 42\` to activate.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:
_(fill in)_

### interaction reply (success) - commands/economy/store.py:678
**File:** commands/economy/store.py (line ~678)
**Current:**
- Title: none
- Description: `<:approve:1545804705735647298> Successfully purchased 🍀 **Lucky Clover** (ID 42) for **5,000** coins!
  -# Placed into your inventory. Use \`,use 42\` to activate.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none

### Your redesign:
_(fill in)_

---

## economy ConfirmView usages

### ConfirmView - commands/economy/core.py:2571
**File:** commands/economy/core.py (line ~2571, in `transfer`)
**Current:**
- Title: none
- Description: `Are you sure you want to transfer **25,000** coins to @alex?`
- Color: None
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm (green) + Cancel (red)

### Your redesign:
_(fill in)_

---

## Components V2 screens

### MinesGameView - commands/economy/core.py:742
**File:** commands/economy/core.py (in `__init__`)
**Current:**
- Title: `💣 Mines — High Stakes`
- Description: `**Mines:** 3 | **Multiplier:** 1.45x | **Current Profit:** +4,500 coins
  
  🟩 💎 🟩 🟩 🟩
  🟩 🟩 💎 🟩 🟩
  🟩 🟩 🟩 💣 🟩
  🟩 💎 🟩 🟩 🟩
  🟩 🟩 🟩 🟩 💎
  
  -# Click tiles to reveal gems. Click Cash Out to claim earnings.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Cash Out (+4,500) (green)
_Components V2 layout, not a classic embed._

### Your redesign:
_(fill in)_

### balance - commands/economy/core.py:1897
**File:** commands/economy/core.py (in `balance`)
**Current:**
- Title: `Cupi Bank — Balance`
- Description: `**Wallet:** 125,000 coins
  **Bank:** 450,000 / 500,000 coins (90%)
  **Total Net Worth:** 575,000 coins`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Deposit (green) + Withdraw (blurple)
_Components V2 layout, not a classic embed._

### Your redesign:
_(fill in)_

### mine - commands/economy/core.py:3797
**File:** commands/economy/core.py (in `mine`)
**Current:**
- Title: `⛏️ Deep Rock Mine`
- Description: `**Pickaxe:** Diamond Pickaxe (92% durability)
  **Mined Ore:** 💎 Diamond x2, 🪙 Gold x5, 🪨 Stone x12
  
  -# Click Strike Vein to mine resources!`
- Color: 0x7389D8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Strike Vein (blurple) + Upgrade Pickaxe (secondary)
_Components V2 layout, not a classic embed._

### callback - commands/economy/store.py:503
**File:** commands/economy/store.py (in `callback`)
**Current:**
- Title: `Confirm Purchase`
- Description: `Are you sure you want to buy 🍀 **Lucky Clover** (ID 42) for **5,000** coins?
  -# Item will be placed into your inventory. Use \`,use 42\` to activate.`
- Color: 0xF4A464
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: Confirm (green) + Cancel (red)
_Components V2 layout, not a classic embed._

### confirm - commands/economy/store.py:671
**File:** commands/economy/store.py (in `confirm`)
**Current:**
- Title: `Purchase Complete`
- Description: `<:approve:1545804705735647298> Successfully purchased 🍀 **Lucky Clover** (ID 42) for **5,000** coins!
  -# Placed into your inventory. Use \`,use 42\` to activate.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none
_Components V2 layout, not a classic embed._

### buy - commands/economy/store.py:961
**File:** commands/economy/store.py (in `buy`)
**Current:**
- Title: `Purchase Complete`
- Description: `<:approve:1545804705735647298> Successfully purchased 🍀 **Lucky Clover** (ID 42) for **5,000** coins!
  -# Placed into your inventory. Use \`,use 42\` to activate.`
- Color: 0x9DD2A8
- Fields: none
- Footer: none
- Thumbnail/Image: none
- Author: none
- Buttons/View: none
_Components V2 layout, not a classic embed._

### inventory - commands/economy/store.py:1034
**File:** commands/economy/store.py (in `inventory`)
**Current:**
- Title: `🎒 Inventory · stella`
- Description: `• 🍀 **Lucky Clover** (x3) — *Increases gamble luck by 5%*
  • 📜 **Business License** — *Enterprise owner*
  • 🏦 **Banknotes** (x10) — *+500k bank capacity*
  • 🐾 **Uwufy Pass** (x2) — *Troll command*`
- Color: None
- Fields: none
- Footer: `Page 1/1 (4 unique items) • Total value: 620,000 coins`
- Thumbnail/Image: none
- Author: none
- Buttons/View: Use Item (primary) + Sell Item (secondary)
_Components V2 layout, not a classic embed._
