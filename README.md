# Toptal · On-Demand Talent — Prototype

A visual prototype for the On-Demand Talent capability and Well-Architected Review dashboard. **Demo only.**

---

## ⚠️ This is a mock. Do not build backend.

**Everything is hard-coded placeholder data.** No fetch calls, no APIs, no auth, no database, no real-time anything. Every "live countdown", "AI-generated brief", "matched SME", "SLA badge", and "approval popover" is rendered from constants in JSX.

When iterating on this in bolt.new (or anywhere), **stay in the design / interaction layer**:

- ✅ Tweak copy, layout, colors, typography
- ✅ Add states, variants, micro-interactions
- ✅ Adjust mock data values inside the JSX
- ✅ Add new artboards / new screens
- ❌ **Do not** add fetch / axios / SDK / API calls
- ❌ **Do not** add a server (Express, Next API routes, Supabase, Firebase, etc.)
- ❌ **Do not** add real auth, state management libraries, websockets
- ❌ **Do not** add a database or persistence layer
- ❌ **Do not** "wire it up to a real backend" — it does not exist

If a stakeholder asks "can we connect this to the real system?", the answer is **no, this is a design prototype**. Real implementation is a separate engineering project.

---

## What's in here

- `index.html` — page shell with the legend bar and Inter / IBM Plex Mono font links
- `src/main.jsx` — React mount
- `src/App.jsx` — design-canvas composition with every artboard
- `src/styles.css` — full design system (Toptal brand tokens applied)
- `src/design-canvas.jsx` — pan/zoom canvas for laying out artboards side-by-side
- `src/screens/screen1.jsx` — Gap Flag Interface (talent-side, mobile-aware, 4 states)
- `src/screens/screen2.jsx` — Active Engagement Request (SME-side, Sprint + Emergency)
- `src/screens/screen3.jsx` — SME Onboarding Brief (Full Sprint Support, document layout)
- `src/screens/screen4.jsx` — Emergency Context Card (8h SLA condensed brief)
- `src/screens/screen5.jsx` — Management Dashboard (delivery lead, inline approval)
- `src/screens/screen6.jsx` — Taso's Button (client portal — Halyard Capital identity)
- `src/screens/screen7.jsx` — Well-Architected Review Health Dashboard (internal Toptal tool)

22 artboards total across 8 canvas sections.

---

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Use the design canvas:

- **Click + drag** to pan
- **Scroll** to zoom
- **⛶ Focus** button on any artboard → fullscreen
- **← / → arrows** to navigate artboards in focus mode
- **Esc** to exit focus

---

## Interactive moments worth demoing

| Section | Artboard | What's interactive |
|---|---|---|
| Screen 1 | "↻ Interactive — tap through it" | Full flag-to-confirmation flow |
| Screen 2 | Both Sprint + Emergency cards | Live SLA countdown timers |
| Screen 2 | "Propose different time" | Slot picker + draft note |
| Screen 3 | "Day-1 view · interactive checklist" | Checkable items + live progress in right rail |
| Screen 5 | "Inline approval popover" | Click `Approve` on Maya's row |
| Taso's Button | All five Taso artboards | Click `Request Expert Support` → modal → submit → confirmation |
| WAR Dashboard | "Partially ready · Nexus" | SC-5 row toggles a remediation panel |

---

## Brand tokens (from `02-brand-guide.md`)

| Token | Value | Usage |
|---|---|---|
| `--navy` | `#0D1D3E` | Headings, sidebars, primary text on light |
| `--teal` | `#07947C` | Primary CTAs, active states, success |
| `--blue` | `#204ECF` | Button hover, links |
| `--alert` | `#D42551` | Emergency, breach, destructive |
| `--amber-warn` | `#F59E0B` | SLA warning |
| `--muted` | `#626679` | Secondary text |
| `--light-bg` | `#F4F6FB` | Page background |
| `--table-alt` | `#EDF1FD` | Alt rows, subtle card backgrounds |

Type: **Inter** (UI) + **IBM Plex Mono** (numbers, codes, IDs). Buttons 4px radius, cards 6px, badges pills.

---

## What this prototype is *for*

To make the on-demand talent operating model and the well-architected review process **tangible enough to align on**. It is not production code. Treat any file in here as a wireframe rendered in HTML — useful for review meetings, useless as a runtime system.
