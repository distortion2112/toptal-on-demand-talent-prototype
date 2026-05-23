# On-Demand Talent — Design Session Kickoff

You are designing a prototype for **On-Demand Talent**, a new capability for the Toptal AI Practice platform. The prototype will be shown to Toptal's CEO (Taso) on 2026-05-29 to make the operating model tangible and get alignment on direction.

I'm uploading three supporting files:
- `01-design-context.md` — full interface inventory, flow descriptions, component specs, and design constraints. This is your primary source of truth.
- `02-brand-guide.md` — exact Toptal color tokens, typography, button styles, badge variants, and card patterns. Match these precisely.
- `03-brief.md` — the executive summary of what we're building and why. Read this for context before you start.

---

## What This Prototype Needs to Demonstrate

1. **How effortless it is to flag a gap** — deployed talent gets an AI-generated suggestion card and submits a request in 3 interactions or fewer.
2. **How fast the system responds** — a pre-qualified SME in the network gets an active engagement request card and can accept in one tap.
3. **What the SME experiences** — an AI-generated onboarding brief that gets them context-loaded without a meeting.

The audience is a CEO. The prototype should feel real and polished — not wireframe-level.

---

## Start Here — Build in This Order

### Screen 1: Gap Flag Interface (AI-Proactive State)
The primary surface a deployed Toptal talent sees when the system has detected a skill gap.

Show this state:
- A suggestion card in the talent's dashboard: "We've noticed 4 tasks tagged [Kubernetes] have been blocked for 6 days. Flag this for SME support?"
- Two actions on the card: **[Flag It]** and **[Not Now]**
- When "Flag It" is clicked: a pre-filled request form slides in (skill gap AI-populated, mode toggle showing "Full Sprint Support", urgency notes field, preferred start)
- Submit button: "Request SME Support"
- Post-submit: confirmation state — "Request submitted. We're matching you now." + lifecycle stepper showing Flag ✓ → Match (active) → Approve → Onboard → Active → Closed

### Screen 2: Active Engagement Request Card (SME side)
What a pre-qualified SME sees when the system actively reaches out to them.

Full Sprint Support variant:
- Card with: skill match (e.g., "React / Next.js"), client engagement name, mode badge ("Sprint Support"), duration ("~1 sprint"), onboarding note ("72h to full context — package ready")
- Three actions: **[Accept]** | **[Decline]** | **[Propose Different Time]**
- Time remaining to respond: "3h 42m remaining"

Emergency Support variant (same layout, urgent treatment):
- Red/amber visual treatment
- Countdown timer prominent
- Mode badge: "Emergency" in ALERT red
- Two actions only: **[Accept Immediately]** | **[Decline]**

### Screen 3: SME Onboarding Brief — Full Sprint Support
The AI-generated context package the SME receives after accepting.

Sections (as a clean document layout with left nav):
- Client Overview
- Your Team (roster with placeholder avatars, roles, handles)
- Sprint Goals (3–4 bullet items, one blocked item)
- Domain Context (2–3 lines of codebase/architecture context)
- Working Norms (short bullets: standup time, tools, communication style)
- Quick Start Checklist (day 1: access repos, join #eng-[client] channel, 30min sync with lead)

### Screen 4: Emergency Context Card
The condensed outage brief. Card layout — scannable in under 2 minutes.

Sections (card format, not document):
- WHAT IS BROKEN (1–2 sentences)
- WHAT CHANGED LAST (last deploy or config change)
- WHO TO TALK TO (name, role, Slack handle)
- RELEVANT RUNBOOKS / LOGS (2–3 links)

Severity badge at top: "P1 — Production Outage". Timestamp: when generated. Freshness note: "Context valid for 4h".

### Screen 5: Management Dashboard
Delivery lead view. Table of in-flight requests.

Show 4–5 rows with varied states:
- 1 row in "Matching" (SLA badge: green)
- 1 row "Pending Approval" with inline [Approve] button (SLA badge: amber — >50% elapsed)
- 1 row "Active" (SLA badge: green, mode: Emergency)
- 1 row "Closed / Converted" (muted row, conversion flag)

---

## Component Library to Build

Once screens are done, extract these as standalone reusable components:
- Lifecycle stepper (6 stages, status-aware)
- SLA badge (green / amber / red + time remaining)
- Suggestion card (AI-generated, dismissable)
- Active engagement request card (both Sprint and Emergency variants)
- Onboarding brief document (full variant)
- Emergency context card
- Management table row (with inline approve action)
- Mode selector toggle (Sprint Support / Emergency Support)

---

## Constraints (from `02-brand-guide.md`)
- Use exact brand tokens — no approximations
- Gap Flag Interface and Request Status View: mobile-aware (talent may be in-context on a client site)
- All data is placeholder/mock — no hard-coded values
- WCAG AA accessibility minimum
- Tone: professional, low-friction, confidence-inspiring — not clinical

Start with Screen 1 and show me a draft before moving to Screen 2.
