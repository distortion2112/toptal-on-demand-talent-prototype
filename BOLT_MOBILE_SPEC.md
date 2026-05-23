# Mobile Spec — On-Demand Talent Prototype

> **Core constraint: desktop layouts must be pixel-perfect unchanged.**
> All 12 pages have been verified at 1280×800 — they look great. Do not touch any existing CSS classes, inline styles, or screen components. The only permitted pattern for fixing mobile is:
>
> ```jsx
> {/* Desktop — unchanged */}
> <div className="desktop-only">
>   <DesktopFrame>...</DesktopFrame>
> </div>
>
> {/* Mobile — new, additive */}
> <div className="mobile-only">
>   ...mobile layout...
> </div>
> ```
>
> Where in `styles.css`:
> ```css
> .desktop-only { display: block; }
> .mobile-only  { display: none; }
>
> @media (max-width: 767px) {
>   .desktop-only { display: none; }
>   .mobile-only  { display: block; }
> }
> ```
>
> Pages that are already mobile-first (no DesktopFrame) can be fixed with additive `@media (max-width: 767px)` rules in `styles.css` only — never change the base rules.

---

## Current state (verified by screenshot at 390×844 and 1280×800)

| Page | Mobile | Desktop |
|---|---|---|
| `/` Scenario Select | ✅ Good | ✅ Good |
| `/overview` Feature Overview | ⚠️ Some text too small | ✅ Good |
| `/sprint/gap-flag` | ✅ Good | ✅ Good |
| `/sprint/sme-request` | ⚠️ 4th metadata column clipped | ✅ Good |
| `/sprint/onboarding` | ❌ Desktop frame unreadable on mobile | ✅ Beautiful |
| `/sprint/dashboard` | ❌ Desktop frame unreadable on mobile | ✅ Good |
| `/emergency/gap-flag` | ✅ Good | ✅ Good |
| `/emergency/sme-request` | ⚠️ Metadata cells very small | ✅ Good |
| `/emergency/context-card` | ⚠️ Header + handles clip right edge | ✅ Good |
| `/emergency/war-room` | ✅ Tabbed layout works well | ✅ Good |
| `/client-portal` | ❌ Desktop frame unreadable on mobile | ✅ Beautiful |
| `/well-architected` | ❌ Desktop frame unreadable on mobile | ✅ Good |

---

## Fix 1 — Add `.desktop-only` / `.mobile-only` utility classes

**File:** `src/styles.css` — add once at the bottom, use everywhere.

```css
/* Responsive visibility */
.desktop-only { display: block; }
.mobile-only  { display: none;  }

@media (max-width: 767px) {
  .desktop-only { display: none;  }
  .mobile-only  { display: block; }
}
```

---

## Fix 2 — `/sprint/onboarding` ❌

**File:** `src/pages/SprintOnboarding.jsx`

Wrap the existing `<DesktopFrame>` in `.desktop-only`. Add a `.mobile-only` sibling that shows the onboarding brief as a simple scrollable document.

**Mobile layout to build:**
- Page header (step label + title + description) — keep as-is, already good
- Scrollable brief body:
  - Section pills at top: numbered tab strip (`01 Client Overview`, `02 Your Team`, etc.) — horizontal scroll row, `height: 44px` per pill
  - Active section content below: just show the currently active section text content
  - OR simpler: show all sections stacked vertically with a sticky section heading for each
- "View delivery lead dashboard →" CTA: full width, `min-height: 44px`, fixed at bottom

---

## Fix 3 — `/sprint/dashboard` ❌

**File:** `src/pages/SprintDashboard.jsx`

Wrap existing `<DesktopFrame>` in `.desktop-only`. Add `.mobile-only` sibling.

**Mobile layout to build:**
- Page header — keep as-is
- KPI summary strip: 2×2 grid showing the 4 key numbers (In Flight, Approvals Pending, etc.)
- Requests list: card-per-row layout showing: avatar + name + skill + stage badge + SLA indicator
- Inline approve: on each card, an "Approve" button `min-height: 44px` that triggers the same popover
- "View emergency flow →" CTA: full width at bottom

---

## Fix 4 — `/client-portal` ❌

**File:** `src/pages/ClientPortal.jsx`

Wrap existing `<DesktopFrame>` in `.desktop-only`. Add `.mobile-only` sibling.

**Mobile layout to build:**
- Client header: avatar + name + project + persona chip — compact row
- Active sprint card: title, throughput %, blocked count, days remaining
- Blockers list: bullet list of open blockers with priority badge
- Sprint burn-down: full-width chart or a simple progress bar if the chart is complex to re-render
- Team contacts: avatar row (just initials + names)
- "Request Expert Support →" CTA: full width, `min-height: 44px`, teal background — this is the key action

---

## Fix 5 — `/well-architected` ❌

**File:** `src/pages/WellArchitected.jsx`

Wrap existing desktop content in `.desktop-only`. Add `.mobile-only` sibling.

**Mobile layout to build:**
- Client selector: 3 pill buttons (`PENDING Nexus Capital`, `ELIGIBLE Meridian Health`, `NOT ELIGIBLE Thornfield`) — stacked or horizontal scroll, `min-height: 44px` each
- Active client name + status badge — large, prominent
- Certification checklist: each item as a card row — check icon + criterion label + PASS/FAIL badge
- Category dividers: "Platform Readiness", "Engagement Maturity" as sticky section headers
- Summary footer: "X of 4 categories · 1 BLOCKING" — fixed at bottom
- "Export PDF" + "Continue review": full width buttons, `min-height: 44px`

---

## Fix 6 — `/emergency/context-card` ❌

**File:** `src/pages/EmergencyContextCard.jsx`

This page uses `<DesktopFrame width={860}>` — same `.desktop-only` / `.mobile-only` pattern applies.

**Mobile layout to build:**
- Red P1 header band: severity badge + incident name on one line, brief ID + validity timer below — single column, full width, `padding: 12px 16px`
- AI-generated headline: full width, `font-size: 20px`
- "START HERE" directive block: full width
- "WHAT'S BROKEN" + "WHAT CHANGED LAST": stack vertically (single column), each as its own labeled card
- "WHO TO TALK TO" contacts: each contact row full width — avatar + name + role + handle; handle truncated with ellipsis if needed
- Runbook links: full width card rows
- Footer actions ("Mark as read", "Open war room"): both buttons `width: 100%`, `min-height: 44px`, stacked vertically

---

## Fix 7 — `/sprint/sme-request` + `/emergency/sme-request` ⚠️

**Files:** `src/pages/SprintSMERequest.jsx`, `src/pages/EmergencySMERequest.jsx`  
Mobile-first pages — additive CSS only.

**Sprint SME request:** 4-column `.req-meta` grid — 4th column clips.
```css
@media (max-width: 480px) {
  .req-meta { grid-template-columns: 1fr 1fr; }
}
```

**Emergency SME request:** same fix + bump label font:
```css
@media (max-width: 480px) {
  .req-meta { grid-template-columns: 1fr 1fr; }
  .req-meta-k { font-size: 11px; }
}
```

---

## Fix 8 — Global tap targets ⚠️

**File:** `src/styles.css` — additive only under `@media (max-width: 767px)`

```css
@media (max-width: 767px) {
  .btn { min-height: 44px; }
  .req-actions .btn { min-height: 44px; }
  .sugg-dismiss { padding: 10px; }
}
```

Do NOT change the base `.btn` padding — that would affect desktop.

---

## Fix 9 — `/overview` font sizes ⚠️

**File:** `src/screens/screen-overview.jsx`

Additive only in the existing `@media (max-width: 700px)` block already in that file. Add:
```css
.ov-body-text { font-size: 13px; }        /* was 11-12px */
.ov-meta-label { font-size: 11px; }       /* was 10px */
```
(Use whatever the actual class names are in that file.)

---

## Verification checklist

After all fixes, verify each at **390×844** AND **1280×800**:

- [ ] `/sprint/onboarding` — mobile shows readable single-column brief; desktop unchanged
- [ ] `/sprint/dashboard` — mobile shows card list with approve action; desktop unchanged
- [ ] `/client-portal` — mobile shows key sprint info + CTA; desktop unchanged
- [ ] `/well-architected` — mobile shows cert checklist + client selector; desktop unchanged
- [ ] `/emergency/context-card` — no text clips at right edge at 390px
- [ ] `/sprint/sme-request` — all 4 metadata values visible at 390px
- [ ] All `.btn` ≥44px tall on mobile, unchanged on desktop
- [ ] Zero horizontal overflow (`scrollWidth === clientWidth`) on any page at 390px
- [ ] All 12 pages pixel-perfect at 1280px desktop — **if anything looks different from before, revert it**
