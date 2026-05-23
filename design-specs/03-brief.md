# On-Demand Talent — Meeting Brief
**Version:** 0.1
**Meeting:** 2026-05-29
**Attendees:** Taso (CEO), Josh Rucker (VP of AI Practice)
**Purpose:** Align on operating model design; surface one required leadership decision

---

## 1. What We're Building

On-demand talent is a capability that lets Toptal-deployed teams pull a qualified expert into an active engagement within hours — without starting a new placement process. When a skill gap opens mid-sprint, the assigned talent flags it, Toptal matches and routes a pre-vetted SME, and the gap is covered with full engagement context already loaded. <!-- INT-0001, INT-0002, INT-0005 -->

This is a two-sided system. On the demand side, deployed talent flags gaps and the platform routes requests through an automated workflow. On the supply side, a pre-qualified SME network — talent who have completed Toptal's certification program — can be actively engaged the moment a matching gap is flagged, bypassing the standard approval queue entirely.

This is not a staffing feature. It is a delivery continuity capability — the mechanism that allows Toptal to guarantee outcomes, not just headcount. <!-- INT-0015 -->

Taso's button concept is real and we want to build it. What makes it fulfillable is the operating model underneath it — match logic, approval workflow, onboarding protocol, and status visibility. The button is the client-facing surface; this document defines what the button calls. <!-- INT-0015, INT-0009 -->

---

## 2. Two Operating Modes

These are architecturally distinct — not the same flow with different timers. <!-- INT-0006, INT-0017 -->

| | **Full Sprint Support** | **Emergency Support** |
|---|---|---|
| **Trigger** | Talent flags a skill gap during delivery | Talent flags a production outage or critical blocker |
| **Onboarding SLA** | 72 hours <!-- INT-0006 --> | 8 hours <!-- INT-0006 --> |
| **Context delivered** | Full engagement picture | Condensed to outage-relevant information only |
| **AI platform required** | No — AI platform accelerates, does not gate <!-- INT-0017 --> | Yes — required for 8-hour SLA <!-- INT-0017 --> |
| **Approval model** | Pre-authorized or case-by-case (configurable) <!-- INT-0011 --> | Pre-authorized only |
| **Active engagement fast path** | Available if pre-qualified SME is in network | Available if pre-qualified SME is in network |
| **Conversion path** | Sprint extension or long-term placement <!-- INT-0004 --> | Long-term placement if gap is structural <!-- INT-0004 --> |

---

## 3. How It Works

The lifecycle has six phases: <!-- INT-0002 -->

**Flag** — The assigned talent identifies a skill gap and submits a structured request. Clients and delivery leads do not initiate this; the talent does. <!-- INT-0001 -->

**Match** — Toptal routes the request against the pre-qualified SME network. If a certified, available SME matches the required profile, the system actively reaches out to them directly — "You're a match for an active gap. Available?" On accept, they move straight to Onboard. If no pre-qualified match is available, the request enters the standard matching queue. <!-- INT-0011 -->

**Approve** — For non-fast-path requests, the request clears the configured approval model (pre-authorized or case-by-case). Pre-qualified SMEs who accept bypass this step — their certification is the approval. <!-- INT-0011 -->

**Onboard** — The SME is brought in with context delivered per mode: full engagement picture for Full Sprint Support, outage-scoped for Emergency Support. <!-- INT-0006 -->

**Operate** — The SME works within the engagement for the sprint duration. <!-- INT-0003 -->

**Close or Convert** — Sprint ends with a clean handoff, or the engagement extends, or the SME converts to a long-term placement if the gap is structural. <!-- INT-0004 -->

Status is visible to both the requestor and management throughout. <!-- INT-0007, INT-0008 -->

---

## 4. Who Can Access It

**Toptal-deployed teams** — available on all active engagements. No additional gate. <!-- INT-0002 -->

**Managed Services clients** — gated. A client is eligible only after passing Toptal's **well-architected review** — a certification and data process Toptal will build and administer. Relationship tenure and spend are not qualifying criteria. A client who has not passed the review cannot access on-demand talent regardless of account size or history. <!-- INT-0013 -->

**Emergency Support specifically** — available only in engagements where the AI platform is deployed. The 8-hour SLA depends on AI-accelerated context delivery and cannot be met without it. <!-- INT-0017 -->

---

## 5. What Makes It Viable

**A pre-qualified SME network.** Toptal talent who complete a certification program become eligible for on-demand deployment. Certification is domain-specific (an SME may be certified for React but not Kubernetes) and comes with training requirements and periodic renewal. This is the supply-side investment that makes the active engagement fast path possible — and that differentiates on-demand talent from a faster version of a normal placement.

**AI platform as accelerant.** For Full Sprint Support, the AI platform compresses onboarding time but the mode is available without it. For Emergency Support, the AI platform is load-bearing — context compression to outage-relevant scope in under 8 hours is not achievable manually. <!-- INT-0014, INT-0017 -->

**Approval workflow designed against the bottleneck.** The primary failure mode of on-demand talent is approval friction and onboarding delay. The operating model explicitly designs against this — pre-authorization as the default, configurable per engagement, with SLA tracking from flag to onboard. <!-- INT-0005, INT-0010, INT-0011 -->

**Management visibility from day one.** A separate management integration surface gives delivery leadership and account owners real-time status without going through the requestor. This is required for Toptal to operate this at scale. <!-- INT-0007, INT-0008 -->

---

## 6. Open Decision for This Meeting

**G-002 — Base financial feasibility: required leadership decision.** <!-- INT-0012 -->

> What is the minimum viable margin structure for on-demand talent placement? Specifically: what is the floor on SME day-rate, what is Toptal's take, and does this model work at sprint-scoped durations (1–2 weeks) or does it require a minimum engagement length to be unit-economically sound?

This is a leadership-level decision. It determines whether certain approval configurations, SLA commitments, and conversion models are commercially viable. It must be resolved before the operating model moves from design to build.

---

## 7. How Taso's Idea Fits

The button is exactly right as a concept — a client-facing surface that lets a team request expert coverage without starting a new hiring process. What this design adds is the operating model that makes the button fulfillable: the match logic that routes the right SME, the approval workflow that doesn't create three days of friction, the onboarding protocol that gets someone context-loaded in hours, and the management surface that gives Toptal and the client visibility throughout. <!-- INT-0015, INT-0009, INT-0016 --> The button calls our operating model. Without the model, the button is a form with a mailbox behind it. With it, the button is a delivery continuity guarantee.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-05-23 | Initial draft from spec-agent EXTRACT + SYNTHESIZE pass; SME pre-qualification and active engagement fast path added |
