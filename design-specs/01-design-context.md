# On-Demand Talent — Design Context
**Version:** 0.1
**Status:** Draft
**Audience:** Claude Design / Loveable — prototype designer
**Purpose:** Hand-off doc to produce high-fidelity mockups and reusable components for the On-Demand Talent capability prototype. Goal: make the operating model tangible enough to show Taso (Toptal CEO) in a meeting on 2026-05-29.

---

## 1. Product Summary

On-demand talent lets Toptal-deployed teams request a pre-qualified subject matter expert into an active engagement in hours — not days. The system is two-sided: deployed talent flags a skill gap (demand), and a certified SME network responds (supply). The AI platform compresses onboarding time, and the entire process — from flag to active SME — is designed to be as automated and frictionless as possible.

The prototype needs to demonstrate three things: how effortless it is to flag a gap, how fast the system responds, and what the SME experiences when they're engaged. The audience is a CEO — the prototype should feel real, not wireframe-level.

---

## 2. Interface Inventory

| Interface | User | Purpose | Mode |
|---|---|---|---|
| Gap Flag Interface | Deployed talent | Flag an SME gap with AI assistance | Both |
| Request Status View | Requestor (talent) | Track their request through the full lifecycle | Both |
| Management Dashboard | Delivery lead / account manager | All in-flight requests, approve, escalate, monitor SLAs | Both |
| SME Onboarding Brief | Incoming SME | AI-generated context package for the engagement | Full Sprint Support |
| Emergency Context Card | Incoming SME | Condensed outage-relevant context only | Emergency Support |
| SME Network Portal | Certified SMEs | Manage certification, availability, respond to active engagement requests | Both |
| Active Engagement Request | Available SME | Push-style summary card — accept / decline / counter | Both |
| Taso's Button | Client (future surface) | Single-action trigger into the operating model | Both |

---

## 3. Gap Flagging Interface

**User:** Deployed Toptal talent, mid-sprint.
**Entry point:** Toptal portal sidebar or Slack-adjacent surface (design both entry points).

### AI-proactive flow (primary)
The system monitors engagement signals continuously. When a threshold is crossed, it surfaces a suggestion card to the talent:

> "We've noticed 4 tasks blocked on Kubernetes configuration for 6 days. Flag this for SME support?"
> [Flag It] [Not Now]

- The card appears in the talent's dashboard — not as an interruption modal
- "Flag It" opens a pre-filled request form (skill gap, urgency, timeline already populated)
- "Not Now" dismisses; card resurfaces after 48h if signal persists

### Manual flow (fallback)
Talent can initiate a request at any time via a "Request SME Support" action in the sidebar.

### Request form
Fields (AI pre-fills from engagement signals where possible):
- **Skill gap** (text, AI-suggested): e.g., "Kubernetes — cluster networking and Ingress configuration"
- **Mode** (toggle): Full Sprint Support / Emergency Support
- **Urgency notes** (optional): free text
- **Preferred start**: as soon as possible / specific date

On submit:
- Confirmation screen: "Request submitted. We're matching you now."
- Immediate status transition to "Matching" visible in Request Status View

**Design constraint:** Max 3 interactions from suggestion to submitted. This is the core frictionless promise.

---

## 4. Request Status View

**User:** The talent who submitted the request.
**Purpose:** Real-time visibility into where their request is in the lifecycle.

### Lifecycle stepper
Horizontal stepper with 6 stages:

```
[Flag ✓] → [Match ⬤] → [Approve] → [Onboard] → [Active] → [Closed]
```

- Active stage: highlighted with pulse animation
- Completed stages: checkmark, timestamp
- Upcoming stages: muted

### Per-stage detail
Each stage shows:
- Status label (e.g., "Matching — searching pre-qualified network")
- Timestamp of entry
- Estimated completion (e.g., "Expected within 4 hours")
- Next action if any (e.g., "Your approval may be required")

### Notifications
- Push/badge notification on every stage transition
- In-app toast on transition: "Your SME request has been approved. Onboarding begins now."

### Convert CTA
At the Active stage, if the engagement has been extended past the initial sprint, show:
> "This engagement is approaching its end. Convert to long-term placement?"
> [Convert] [Close at Sprint End]

---

## 5. Management Dashboard

**User:** Toptal delivery lead or account manager.
**Purpose:** Portfolio view of all in-flight on-demand requests across engagements.

### Request table
Columns: Requestor | Engagement | Skill Gap | Mode | Stage | SLA Status | Action

- **SLA Status** badge: Green (on track) / Amber (>50% elapsed) / Red (>80% elapsed or breached)
- **Action** column: "Approve" button for case-by-case requests (inline, single click); "View" for all others
- Clicking any row drills into the full lifecycle detail for that request

### Filters
- Mode: All / Sprint Support / Emergency Support
- Stage: All / In Progress / Pending Approval / Active / Closed
- Engagement: dropdown of active engagements

### SLA alerting
- Amber rows: subtle amber left-border highlight
- Red rows: red left-border + badge icon; sort to top automatically

### Approval flow (case-by-case requests)
Inline approval: manager clicks "Approve" → confirmation popover with brief context (requestor, skill gap, estimated cost) → confirm → stage transitions to Onboard.

---

## 6. Active SME Engagement

**User:** A certified SME in the Toptal network who is available for on-demand work.
**Trigger:** System identifies the SME as a match for a flagged gap.

### Active Engagement Request card
Delivered as a push notification + in-portal card:

```
┌─────────────────────────────────────────────────┐
│  🟡 On-Demand Request — React / Next.js          │
│  Client: [Engagement Name]  •  Sprint Support    │
│  Start: ASAP  •  Duration: ~1 sprint             │
│                                                   │
│  Onboarding package ready. 72h to full context.  │
│                                                   │
│  [Accept]   [Decline]   [Propose Different Time] │
└─────────────────────────────────────────────────┘
```

- Time-sensitive: show time remaining to respond (configurable, default 4h)
- On **Accept**: SME moves to Onboard phase immediately. No additional approval required — certification is the approval.
- On **Decline**: system falls back to next match in queue
- On **Propose Different Time**: opens a compact availability picker; request stays in Matching state pending SME confirmation

### Emergency variant
Same card but visually urgent — red/amber treatment, countdown timer prominent:

```
┌─────────────────────────────────────────────────┐
│  🔴 EMERGENCY — Kubernetes / Production Outage   │
│  Client: [Engagement Name]  •  8h SLA            │
│  Condensed context ready. Response needed now.   │
│                                                   │
│  [Accept Immediately]   [Decline]                │
└─────────────────────────────────────────────────┘
```

---

## 7. SME Network Portal

**User:** Toptal network talent who are certified (or seeking certification) for on-demand deployment.
**Purpose:** Supply-side interface — manage certification, set availability, track history.

### Sections

**Certification Dashboard**
- List of skill domains: certified / in progress / not started
- For each domain: certification expiry date, renewal requirements
- CTA to begin certification for uncertified domains

**Availability**
- Sprint-level availability toggle: On / Off
- When On: select availability windows (e.g., "Available next 2 sprints")
- System uses this to determine who receives active engagement requests

**Incoming Requests**
- Cards for any active engagement requests the system has matched to this SME
- Same card format as the Active Engagement Request (Section 6)
- Empty state: "No active requests. You'll be notified when a match is found."

**Engagement History**
- Past on-demand deployments: client, skill domain, mode, duration, outcome rating
- Conversion flag: shows if a sprint engagement converted to long-term

**Training Queue**
- Required coursework or assessments to maintain or expand certification
- Progress bars, due dates, links to training materials

---

## 8. SME Onboarding Documentation

Two variants. Design both as distinct document templates.

### Full Sprint Support Brief (72h onboarding)
AI-generated from the engagement's data platform context. Formatted as a readable brief, not a raw data dump.

**Sections:**
1. **Client Overview** — who the client is, what they do, what they're building
2. **Your Team** — roster with roles, photos (placeholder), Slack/communication handles
3. **Sprint Goals** — active sprint objectives, definition of done, current blockers
4. **Domain Context** — relevant codebase areas, architecture notes, key decisions in flight
5. **Working Norms** — communication cadence, tools in use, cultural notes
6. **Quick Start Checklist** — day 1 actions: access to repos, channels to join, first meeting to attend

**Format:** Clean document layout, left nav for sections, skimmable headers. Should feel like a high-quality employee onboarding doc, not a status report.

### Emergency Context Card (8h onboarding)
Condensed to outage-relevant information only. Card-style — scannable in under 2 minutes.

**Layout:**
```
┌──────────────────────────────────────────────────┐
│  🔴 OUTAGE BRIEF  •  [Client]  •  [Timestamp]    │
├──────────────────────────────────────────────────┤
│  WHAT IS BROKEN                                   │
│  [1–2 sentences]                                  │
├──────────────────────────────────────────────────┤
│  WHAT CHANGED LAST                                │
│  [Last deploy / config change / incident]         │
├──────────────────────────────────────────────────┤
│  WHO TO TALK TO                                   │
│  [Name, role, contact]                            │
├──────────────────────────────────────────────────┤
│  RELEVANT RUNBOOKS / LOGS                         │
│  [Links]                                          │
└──────────────────────────────────────────────────┘
```

**Severity:** Prominently displayed at top (P1 / P2 / P3).
**Timestamp:** When the brief was generated + when it expires (AI context has a freshness window).

---

## 9. AI Proactive Gap Detection — UX Flow

This is the behavior that makes the system feel automated rather than reactive.

**Signals monitored:**
- Sprint velocity drop (tasks completed vs. planned)
- Task age (blocked tasks older than N days)
- Unassigned work in sprint
- Escalation frequency in project channels (if integrated)
- Skill tag mismatch between open tasks and current team roster

**When threshold crossed:**
System generates a suggestion card and surfaces it to the relevant talent in their primary interface. The card must:
- Name the specific signal that triggered it ("4 tasks tagged [Kubernetes] have been blocked for 6 days")
- Suggest a specific action ("Request SME support for Kubernetes")
- Require at most one tap/click to confirm and submit
- Be dismissable without penalty

**Dismissed cards:**
Resurface after 48h if the underlying signal persists. After 3 dismissals on the same signal, escalate to management dashboard as a soft alert.

**Design note:** The suggestion card is the highest-leverage UX moment in the system. If this feels like an interruption, the whole flow breaks. It should feel like a helpful nudge from a colleague who noticed something — not a system alert.

---

## 10. Taso's Button

**User:** Client (Managed Services, post well-architected review certification).
**Purpose:** Client-facing trigger into the on-demand talent operating model.

### States
- **Eligible (certified):** Button active, labeled "Request Expert Support"
- **Not yet eligible:** Button grayed, labeled "Available for certified engagements" with a link to learn about the well-architected review

### On click (eligible state)
Modal with:
1. **Request type selector:** Full Sprint Support / Emergency Support
2. **Context summary:** AI-pre-filled from engagement data — talent reviews, not enters
3. **Submit**

Modal should not exceed 3 fields visible at once. The AI pre-fill does the work.

### Placement
Design it to look native to a client portal (not a Toptal-branded modal dropped into a foreign UI). Show it in context on a project dashboard page.

---

## 11. Component Library

Build these as reusable components — they appear across multiple interfaces:

| Component | Used In | Notes |
|---|---|---|
| Lifecycle stepper | Request Status View, Management Dashboard | 6 stages, status-aware (completed / active / upcoming) |
| SLA badge | Management Dashboard, Active Engagement Request | Green / Amber / Red + time remaining |
| Suggestion card | Gap Flag Interface | AI-generated, dismissable, one-tap confirm |
| Onboarding brief | SME Onboarding (Full Sprint) | Document layout, left nav, skimmable |
| Emergency context card | SME Onboarding (Emergency) | Card layout, scannable in <2min |
| Request form | Gap Flag Interface, Taso's Button | AI pre-fillable, 3-field minimum |
| Management row | Management Dashboard | Table row with inline approve action |
| Mode selector | Gap Flag Interface, Taso's Button | Sprint Support / Emergency Support toggle |
| Certification badge | SME Network Portal, Taso's Button | Client side: well-architected review status |
| SME certification card | SME Network Portal | Domain + status + availability toggle |
| Active engagement card | Active Engagement Request | Push-style, time-sensitive, accept/decline/counter |
| Availability toggle | SME Network Portal | Sprint-level on/off with window selector |

---

## 12. Design Constraints

**Brand:** Toptal — navy (#002F6C), white, clean sans-serif (Inter or equivalent). Reference `demo/config/brand.py` for exact values used in the existing demo app.

**Tone:** Professional, low-friction, confidence-inspiring. Not clinical. Not startup-casual. This is an enterprise-grade capability.

**Mobile-aware:** Gap Flag Interface and Request Status View must work on mobile — talent may be flagging a gap from a client site, not a desk.

**Accessibility:** WCAG AA minimum. All interactive elements keyboard-navigable.

**Data:** No hard-coded values. All fields use realistic placeholder/mock data (e.g., "[Client Name]", "[Skill Domain]", "[Requestor Name]"). The prototype should work with swapped data.

**Prototype fidelity:** High-fidelity mockups for all 8 interfaces. At least 2 component states per interactive element (default + active/hover/selected). The Gap Flag Interface and Active Engagement Request card should be interactive (click-through prototype, not static).

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-05-23 | Initial draft from on-demand talent brainstorm and spec-agent synthesis |
