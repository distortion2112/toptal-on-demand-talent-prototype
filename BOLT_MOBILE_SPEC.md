# Mobile Polish Spec — On-Demand Talent Prototype

> **For Bolt.** This spec reflects the current state of the repo as of the latest audit. Items marked ✅ are already done — do not re-do them. Work through the open items below.
>
> Stack: React 18 + React Router 7 + Vite. No backend. Styles: `src/styles.css` (CSS custom properties + utility classes) and inline JSX styles.
> Target viewport: 390×844 (iPhone 14). Test at that size throughout.

---

## Already Done — Do Not Re-Do

- ✅ `/emergency/war-room` — desktop body hidden on mobile, tabbed `.war-mobile-body` layout shown
- ✅ `DesktopFrame` — horizontally scrollable scroll wrapper in `src/pages/shared.jsx`
- ✅ `/overview` — `screen-overview.jsx` has `@media (max-width: 700px)` overrides for all grid classes
- ✅ `DemoShell` brand button — `alignSelf: stretch` fills full 52px header height

---

## Open Items

### 1. Button tap targets — global (High)

**File:** `src/styles.css`

`.btn { padding: 10px 14px }` renders at ~40px tall. `.req-actions .btn { padding: 11px 14px }` renders at ~42px. Both are under the 44px minimum.

Fix:
```css
.btn { padding: 12px 14px; }
.req-actions .btn { padding: 12px 14px; }
```

Also `.sugg-dismiss { padding: 4px }` makes the × dismiss button 21×21px — too small to tap.

Fix:
```css
.sugg-dismiss { padding: 10px; }
```

---

### 2. `/sprint/gap-flag` — action button heights (Moderate)

**File:** `src/pages/SprintGapFlag.jsx`

"Not now" and "Flag it" buttons in `.sugg-actions` render at 39px due to the `.btn` padding above. The fix in item 1 will resolve this. Verify after applying item 1.

---

### 3. `/emergency/context-card` — right column clips (Moderate)

**File:** `src/pages/EmergencyContextCard.jsx`

The `.ectx-mobile` CSS class applies single-column layout, but `@handle` chips for contacts are still clipping on the right edge, and the "Open war room" button text truncates.

- `.contact .handle`: add `maxWidth: '100%'` and `overflow: hidden; textOverflow: ellipsis` so handles don't bleed
- "Open war room" button: confirm the inline `style` on the button element does not set a fixed `width` that overrides `.ectx-mobile .ectx-foot .btn { width: 100% }` — if it does, remove the inline width

---

### 4. `/well-architected` — tap targets inside scrollable frame (Moderate)

**File:** `src/pages/WellArchitected.jsx` or its screen component

The page is wrapped in a scrollable `DesktopFrame` so layout is accessible, but several interactive elements inside are still below 44px:

- Client selector tabs (`PENDING`, `ELIGIBLE`, `NOT ELIGIBLE`): ~30px tall → add `minHeight: 44px`
- `Jump to SC-5 →` anchor link: 17px tall → wrap in `padding: '12px 0'` or convert to a button
- `git-filter-repo` inline link: 15px tall → same treatment
- `Issue` button: 26px tall → add `padding: '10px 12px'`
- `Export PDF` and `Continue review` buttons: 39px → resolved by item 1 above

---

### 5. `DemoShell` — persona chip + stepper overflow (Minor)

**File:** `src/DemoShell.jsx`

On pages with long persona names (e.g. "Deployed Talent · Marcus Rivera"), the persona chip and the lifecycle stepper compete for the 390px header. On mobile:

- Truncate the persona name text with `overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 90` — keep the avatar circle visible
- Lifecycle stepper step labels (`Flag`, `Match`, `Approve`, etc.) at 11px may overlap on 390px — reduce to 9px or hide labels on mobile, show dots only

---

## Design Tokens (Do Not Change)

```
--navy: #0D1D3E
--teal: #07947C
--blue: #204ECF
--alert: #D42551
--muted: #626679
--paper: #F4F6FB
--surface: #FFFFFF
--line: #E3E8F2
```

Border-radius: cards 6px, buttons 4px, pills 999px. Font: Inter (sans), IBM Plex Mono (mono).

---

## Acceptance Criteria

- [ ] All `.btn` elements ≥44px tall on mobile
- [ ] `.sugg-dismiss` × button ≥44×44px tap target
- [ ] `/emergency/context-card` contact handles don't clip; "Open war room" button full width
- [ ] `/well-architected` all interactive elements inside frame ≥44px tall
- [ ] DemoShell persona chip doesn't overflow into stepper on mobile
