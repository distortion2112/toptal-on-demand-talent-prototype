# Mobile Holistic Design Spec — On-Demand Talent Prototype

> **For Bolt.** Every page has been screenshotted at 390×844 (iPhone 14) and 1280×800 (desktop). This spec is written from those observations. Work page by page in the order listed. Desktop layouts must remain unchanged — all fixes are mobile-only, applied via media queries or conditional rendering.
>
> Stack: React 18 + React Router 7 + Vite. No backend. Styles: `src/styles.css` + inline JSX.
> Test at 390×844 after every change before moving on.

---

## Status by page

| Page | Mobile status | Desktop status |
|---|---|---|
| `/` Scenario Select | ✅ Good | ✅ Good |
| `/overview` Feature Overview | ⚠️ Text too small, some sections cramped | ✅ Good |
| `/sprint/gap-flag` Gap Flag | ✅ Good | ✅ Good |
| `/sprint/sme-request` SME Request | ⚠️ 4th metadata column clipped | ✅ |
| `/sprint/onboarding` Onboarding Brief | ❌ Two-column not collapsing, content cut off | ✅ Beautiful |
| `/sprint/dashboard` Management Dashboard | ❌ Two-column not collapsing, content cut off | ✅ Good |
| `/emergency/gap-flag` Emergency Flag | ✅ Good | ✅ Good |
| `/emergency/sme-request` Emergency SME | ⚠️ Metadata cells very small | ✅ |
| `/emergency/context-card` Context Card | ⚠️ Header clips, contact handles cut off | ✅ |
| `/emergency/war-room` War Room | ✅ Tabbed layout works well | ✅ Good |
| `/client-portal` Taso's Button | ❌ Two-column not collapsing, content cut off | ✅ Beautiful |
| `/well-architected` WAR Dashboard | ❌ Multi-column not collapsing, content cut off | ✅ Good |

---

## Page fixes — work in this order

---

### 1. `/sprint/onboarding` — SME Onboarding Brief ❌

**File:** `src/screens/screen3.jsx` (`.brief` CSS class, `src/styles.css`)

**What's broken:** The three-column `.brief` grid (`220px nav | 1fr main | 260px rail`) renders on mobile inside the `DesktopFrame` scroll wrapper. The frame is 1280px wide — users would need to scroll 3× to see all content. Effectively unreadable.

**Fix:** Add a mobile layout at `@media (max-width: 767px)` that:
- Collapses `.brief` to single column (`grid-template-columns: 1fr`)
- Hides `.brief-nav` (the left nav sidebar) — the content is self-explanatory in order
- Hides `.brief-rail` (the right metadata rail) — or collapses it to a compact summary strip above the content
- Makes `.brief-main` full width with `padding: 20px 16px 80px`
- Removes `overflow: hidden` from `.brief` so content flows naturally
- The "View delivery lead dashboard →" CTA button should be `width: 100%` and `min-height: 44px`

---

### 2. `/sprint/dashboard` — Management Dashboard ❌

**File:** `src/screens/screen5.jsx` (`.mgmt` CSS class, `src/styles.css`)

**What's broken:** The `.mgmt` two-column grid (`220px sidebar | 1fr main`) inside a 1380px `DesktopFrame`. Same scroll problem — sidebar takes 220px, main content is off-screen.

**Fix:** Add `@media (max-width: 767px)`:
- Collapse `.mgmt` to single column
- Hide `.mgmt-side` (the nav sidebar) — it's secondary context
- Make `.mgmt-main` full width with `padding: 20px 16px 80px`
- `.kpis` 4-column grid → 2 columns: `grid-template-columns: 1fr 1fr`
- `.mtable-head` and `.mtable-row` — too many columns for mobile; show only: name, skill, stage, and action button. Hide the SLA bar, start date, and other secondary columns with `display: none` on those grid cells
- Filter bar (`.filters`) — stack vertically, each filter group on its own row
- Inline approve button (`.act-btn`) — `min-height: 44px`

---

### 3. `/client-portal` — Taso's Button ❌

**File:** `src/screens/screen6.jsx` (`.mgmt` or equivalent, `src/styles.css`)

**What's broken:** Two-column layout (left sidebar project nav + right main content panel) not collapsing. On mobile, sidebar and main render side-by-side inside the DesktopFrame, both clipped.

**Fix:** Add `@media (max-width: 767px)`:
- Collapse to single column: sidebar on top (compact, full width), main content below
- Sidebar: reduce to showing just the client name, avatar, and active nav item — hide the full nav list
- Main content: full width, `padding: 16px`
- KPI/metric cards: `grid-template-columns: 1fr 1fr`
- Sprint burn-down chart: full width
- "Request Expert Support →" CTA: `width: 100%`, `min-height: 44px`

---

### 4. `/well-architected` — WAR Dashboard ❌

**File:** `src/pages/WellArchitected.jsx` and its screen component

**What's broken:** Multi-column layout (client selector tabs + left sidebar + main detail panel) not collapsing. Sidebar and detail panel are side-by-side, both clipped.

**Fix:** Add `@media (max-width: 767px)`:
- Client selector tabs (`PENDING`, `ELIGIBLE`, `NOT ELIGIBLE`): already visible at top — keep, but make each tab `min-height: 44px` and full-width stacked or scrollable pills
- Collapse sidebar + main to single column (sidebar hidden or shown as a compact strip)
- Show the main certification checklist full width
- Platform Readiness checklist items: show check + title + status only; hide the detail text that wraps
- "Export PDF" and "Continue review" buttons: `min-height: 44px`, `width: 100%`
- `Jump to SC-5 →` anchor: `padding: 10px 0`, `display: block`
- `git-filter-repo` inline link: `display: inline-block; padding: 6px 0`
- "Issue" button: `min-height: 44px`

---

### 5. `/emergency/context-card` — Emergency Context Card ⚠️

**File:** `src/pages/EmergencyContextCard.jsx`

**What's broken (from screenshot):**
- Red header bar: "P1 · PRODUCTION OUTAGE · BRIEF · ODT-P…" clips on the right
- "WHO TO TALK TO" contact rows: `@handle` chips are cut off on the right edge
- The two-column "WHAT'S BROKEN / WHAT CHANGED LAST" section may be cutting off

**Fix:**
- Header (`.ectx-top`): the right-side meta text (brief ID, etc.) — truncate with `overflow: hidden; text-overflow: ellipsis` or hide on mobile
- Contact handles (`.contact .handle`): add `maxWidth: 'calc(100% - 80px)'`, `overflow: hidden`, `textOverflow: 'ellipsis'` so they don't push past the card edge
- Confirm `.ectx-mobile .ectx-sections` is applying `grid-template-columns: 1fr` — if the two-column "WHAT'S BROKEN / WHAT CHANGED LAST" is still showing two columns, force it to single column
- "Open war room" button: confirm it's `width: 100%` on mobile (check for inline `width` style overriding the CSS class)

---

### 6. `/sprint/sme-request` — SME Request ⚠️

**File:** `src/pages/SprintSMERequest.jsx` or its screen component

**What's broken:** The 4-column metadata table (START / DURATION / ONBOARDING / D column) — the 4th column ("D", showing "$", rates) is clipped off-screen.

**Fix:**
- Collapse the 4-column `.req-meta` grid to 2×2: `grid-template-columns: 1fr 1fr` at `max-width: 480px`
- The "Decline" button should be visible — confirm all three action buttons (Accept / Propose / Decline) are reachable without scrolling

---

### 7. `/emergency/sme-request` — Emergency SME Request ⚠️

**File:** `src/pages/EmergencySMERequest.jsx`

**What's broken:** The REQ/SLA/MATCH/ON-CALL/PRE-AUTHORIZED metadata cells are very small (10px labels). Readable but tight.

**Fix:**
- `.req-meta` 4-column grid → 2×2 at mobile: `grid-template-columns: 1fr 1fr`
- Cell label font size: bump from 10px to 11px on mobile
- "Accept immediately" button: confirm `min-height: 44px`

---

### 8. `/overview` — Feature Overview ⚠️

**File:** `src/screens/screen-overview.jsx`

**What's broken:** Already has responsive media queries at 700px but some sections still render text that's too small to read comfortably (10–11px) on mobile.

**Fix:**
- Any `font-size` below 12px in the overview component: bump to 12px minimum on mobile
- The "Two architecturally distinct modes" comparison table rows: confirm the `ov-two-modes-row` single-column override is working — from the screenshot the table looks okay but dense
- The lifecycle connector dots row: good that connectors are hidden on mobile — confirm the step labels are ≥12px

---

### 9. Global tap targets ⚠️

**File:** `src/styles.css`

`.btn { padding: 10px 14px }` → ~40px tall. `.req-actions .btn { padding: 11px 14px }` → ~42px. Both under 44px minimum.

```css
.btn { padding: 12px 14px; }
.req-actions .btn { padding: 12px 14px; }
```

`.sugg-dismiss { padding: 4px }` → 21×21px dismiss button.

```css
.sugg-dismiss { padding: 10px; }
```

---

## What NOT to change

- Desktop layouts on any page — all fixes are `@media (max-width: 767px)` only
- Design tokens (colors, fonts, radii) — see below
- `/` Scenario Select — already good
- `/sprint/gap-flag` — already good
- `/emergency/gap-flag` — already good
- `/emergency/war-room` — already good (tabbed mobile layout)

---

## Design tokens

```
--navy: #0D1D3E   --teal: #07947C   --blue: #204ECF
--alert: #D42551  --muted: #626679  --paper: #F4F6FB
--surface: #FFFFFF  --line: #E3E8F2
```

Border-radius: cards 6px, buttons 4px, pills 999px.
Font: Inter (sans), IBM Plex Mono (mono).

---

## Acceptance criteria

- [ ] `/sprint/onboarding` readable on 390px without horizontal scroll
- [ ] `/sprint/dashboard` readable on 390px — table shows name + skill + status + action
- [ ] `/client-portal` readable on 390px — sidebar compact, main content full width
- [ ] `/well-architected` readable on 390px — certification checklist visible without scroll
- [ ] `/emergency/context-card` — no text or chips clipped at right edge
- [ ] `/sprint/sme-request` — all 4 metadata values visible in 2×2 grid
- [ ] All `.btn` elements ≥44px tall
- [ ] `.sugg-dismiss` ≥44×44px tap target
- [ ] All desktop layouts unchanged at 1280px
