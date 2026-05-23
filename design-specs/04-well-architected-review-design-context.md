# Well-Architected Review — Health Dashboard Design Context
**Version:** 0.1
**Audience:** Claude Design / Loveable — prototype designer
**Purpose:** Design context for the Well-Architected Review health dashboard. This is an internal Toptal tool (delivery lead / account manager) that monitors whether a Managed Services client meets all conditions required for on-demand talent eligibility.

Upload this file alongside `01-design-context.md` and `02-brand-guide.md`. The brand guide applies here without change.

---

## 1. Product Summary

Before a Managed Services client can access on-demand talent, they must pass Toptal's well-architected review — a certification process that verifies their environment, security posture, and engagement maturity meet the required standards. This dashboard is how Toptal's delivery team monitors that process in real time.

The dashboard answers one question: **Is this client eligible for on-demand resourcing, and if not, exactly what is blocking them?**

It is not client-facing. It is the operational tool that makes the certification process administrable — replacing a manual checklist with a live health monitor.

---

## 2. Interface Inventory

| Interface | User | Purpose |
|---|---|---|
| Well-Architected Review Dashboard | Toptal delivery lead / account manager | Monitor client eligibility status across four condition categories; administer the certification checklist; export eligibility reports |

Single screen. Three distinct states based on client readiness (detailed in Section 5).

---

## 3. Screen Layout

### Header Band
Full-width, navy background (`#0D1D3E`).

Left side:
- Client name (large, white, H1)
- Engagement name (smaller, muted white, subtitle)

Right side — Overall Eligibility Status (the most important element on the screen):
- **ELIGIBLE** — large teal badge (`#07947C`), white text. Below it: Certification ID + Issue Date + Expiry Date.
- **PENDING** — large amber badge. Below it: "N conditions not met" with a link to scroll to the first blocking item.
- **NOT ELIGIBLE** — large alert-red badge (`#D42551`). Below it: "N conditions not met."

### Toolbar (below header)
- Client selector dropdown (switch between clients in portfolio)
- Toggle: "Show only blocking conditions" (filters all four cards to show only failing/pending items)
- "Export Report" button (ghost/outline style) — generates a PDF snapshot of current state

### Body — Four Category Cards
Laid out as a 2×2 grid on desktop, vertical stack on mobile.

Each card follows the same structure (see Section 4 for card spec). Cards are ordered:
1. Platform Readiness (top-left)
2. Security & Compliance (top-right)
3. Engagement Maturity (bottom-left)
4. Certification Checklist (bottom-right)

### Action Bar (bottom, sticky)
Contextual — only shows relevant actions:
- If Certification Checklist not started: **"Begin Review"** (primary teal button)
- If checklist in progress: **"Continue Review"** (primary teal button)
- If fully eligible: **"View Certificate"** (ghost button) + **"Schedule Renewal"** (ghost button)

---

## 4. Category Card Spec

### Card header
- Category name (H3, navy)
- Overall gate status badge: `PASS ✓` (teal) / `FAIL ✗` (alert red) / `IN PROGRESS ◌` (amber) / `NOT STARTED` (muted)

### Condition rows
Each measurable condition is one row:

```
[icon] Condition label                    [status badge]  [timestamp]
       Last checked: 2026-05-23 09:41 UTC
```

- Icon: ✓ (teal) for pass, ✗ (red) for fail, ◌ (amber) for in-progress/pending, — (muted) for not checked
- Status badge: matches SLA badge style from `02-brand-guide.md`
- Timestamp: muted text, smaller font

**Expandable detail on failing/pending rows:**
Click a failing row to expand a remediation panel below it:
- What failed (one sentence, plain language)
- Remediation guidance (bullet list, actionable steps)
- Owner field (assignable to a Toptal team member)
- Link to relevant documentation or runbook

### Certification Checklist card (different from others)
Conditions are not automated — they require human action. Each item shows:
- Item label
- Status: Not Started / In Progress / Complete
- Owner (assigned Toptal team member name)
- Date completed (if complete) or due date (if in progress)
- "Mark Complete" action button (inline, ghost style) — only shown to authorized users

---

## 5. Three States to Design

### State 1: Fully Eligible Client
All four category cards show `PASS ✓`. Header shows `ELIGIBLE` in teal with certification details.

Mock data to use:
- Client: "Meridian Health Systems"
- Certification ID: WAR-2026-0047
- Issued: 2026-03-14
- Expires: 2027-03-14
- All conditions: green, recent timestamps

Action bar: "View Certificate" + "Schedule Renewal"

### State 2: Partially Ready Client (most instructive state — design this prominently)
Three categories passing, one blocking. The dashboard should make it immediately obvious what one thing is preventing eligibility.

Mock data to use:
- Client: "Nexus Capital Partners"
- Header: `PENDING` amber — "1 condition not met"
- Platform Readiness: PASS
- Engagement Maturity: PASS
- Certification Checklist: PASS
- Security & Compliance: **FAIL** — one condition failing: "Secrets / credential scan: last scan returned 2 findings (unresolved)"
  - Expanded remediation panel visible: "Two credentials were detected in the client's repository scan on 2026-05-20. Findings must be remediated and a clean scan confirmed before this condition passes."
  - Owner: [unassigned] — show "Assign Owner" prompt
  - Remediation steps: 3 bullet items

Action bar: "Continue Review"

### State 3: Early-Stage Client
Platform Readiness and Engagement Maturity failing. Certification Checklist not started. Shows the "distance to eligibility" clearly.

Mock data to use:
- Client: "Thornfield Logistics"
- Header: `NOT ELIGIBLE` red — "6 conditions not met"
- Platform Readiness: **FAIL** — 3 of 5 conditions failing (AI platform not deployed, vector store not provisioned, tenant isolation not verified)
- Security & Compliance: PASS (they have existing security posture)
- Engagement Maturity: **FAIL** — engagement capability profile is P2 (below required P3); tenure threshold pending configuration
- Certification Checklist: **NOT STARTED**

Show a subtle "Roadmap to Eligibility" summary panel below the cards: ordered list of what to fix first, second, third. This is not a blocking element — it's a helper for the delivery lead to communicate a path to the client.

Action bar: "Begin Review" (primary)

---

## 6. Component List

| Component | Description |
|---|---|
| Eligibility status badge | Large header badge: ELIGIBLE (teal) / PENDING (amber) / NOT ELIGIBLE (red). Includes sub-label (cert ID or blocking count). |
| Category card | Card with header (name + gate badge), condition rows, and expand-on-click detail panels. |
| Condition row | Single condition: icon + label + status badge + timestamp. Expandable for remediation detail. |
| Remediation panel | Expanded state of a failing condition row: failure description, remediation steps, owner field, doc link. |
| Checklist item row | Human-administered item: label + status + owner + date + "Mark Complete" action. |
| Certification block | Shows cert ID, issue date, expiry date. Appears in header when ELIGIBLE. |
| Roadmap panel | Ordered list of blocking conditions with priority sequence. Visible in early-stage state only. |
| Client selector | Dropdown to switch between clients. Sits in toolbar. |
| Blocking conditions toggle | On/off toggle that filters all cards to show only failing items. |
| Export button | Ghost button. Generates PDF eligibility report. |

---

## 7. Design Constraints

- **Brand:** Same tokens as `02-brand-guide.md`. No deviations.
- **Audience:** Internal Toptal tool — professional, data-dense, efficient. Not a marketing surface.
- **Density:** This screen carries a lot of information. Prioritize scannability over whitespace. Use the TABLE_ALT (`#EDF1FD`) alternating background on condition rows.
- **Mobile:** Best-effort — this is primarily a desktop tool used in Toptal's internal portal. Vertical card stack on mobile is sufficient.
- **Accessibility:** WCAG AA. Status is never communicated by color alone — always paired with an icon or text label.
- **Data:** All values are mock/placeholder. Timestamps, client names, certification IDs are illustrative.
- **Interactivity:** The "Partially Ready" state (State 2) should be the interactive prototype state — show the expand/collapse remediation panel as a click-through interaction.
