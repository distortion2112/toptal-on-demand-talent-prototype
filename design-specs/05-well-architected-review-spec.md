# Well-Architected Review — Specification
**Version:** 0.1
**Status:** Draft
**Audience:** Toptal AI Practice delivery team, engineering leads, account managers

---

## Purpose

The well-architected review is Toptal's certification process for determining whether a Managed Services client environment meets the conditions required for on-demand talent deployment. It exists because on-demand talent — particularly Emergency Support — requires a minimum level of platform maturity, security posture, and engagement stability to be delivered reliably. A client who has not passed the review cannot access on-demand talent, regardless of account size or relationship tenure.

The review is not a one-time gate. It is an ongoing health assessment with a formal certification event and a renewal cycle.

---

## Scope

**In scope:**
- Definition of the four condition categories and their measurable items
- Certification lifecycle (assessment → review → issued → renewal)
- Eligibility outcomes and their effect on on-demand talent access
- Open questions requiring leadership decision before implementation

**Out of scope:**
- The internal tooling used to administer the review (covered in the health dashboard design context)
- The client-facing communication of review status
- Pricing or commercial terms associated with certification
- The well-architected review for Toptal-internal engagements (Toptal-deployed teams have no gate)

---

## Condition Categories

Eligibility requires all four categories to pass. Any failing category blocks certification.

---

### Category 1: Platform Readiness

**Purpose:** Verify the technical stack required for AI-accelerated onboarding and Emergency Support is deployed and operational.

**Gate:** All items must pass. Any failure = category fails.

| # | Condition | Measurement Method | Pass Criteria |
|---|---|---|---|
| PR-1 | AI platform deployed and reachable | Health check endpoint response | HTTP 200 within 5s |
| PR-2 | M1 Connector operational | Module status API | Status: active |
| PR-3 | M3 Curation Engine operational | Module status API | Status: active |
| PR-4 | M4 Vector Store provisioned and indexed | Document count query | Count > minimum threshold (TBD) |
| PR-5 | M5 Retrieval API within SLA | p95 latency measurement | p95 < threshold (TBD) |
| PR-6 | Tenant isolation verified | Collection namespace check | Separate collection confirmed per tenant |

**Note:** PR-4 and PR-5 thresholds are not yet defined. Flagged as open questions.

---

### Category 2: Security & Compliance

**Purpose:** Verify the client environment meets the security posture required before Toptal deploys an SME into it.

**Gate:** All items must pass. Any failure = category fails.

| # | Condition | Measurement Method | Pass Criteria |
|---|---|---|---|
| SC-1 | Security threat model completed | Document existence + sign-off record | Present and signed |
| SC-2 | Data classification schema configured | `classification_tier` field coverage across corpus | ≥ 95% of documents classified |
| SC-3 | M8 Governance module operational | Module status API | Status: active |
| SC-4 | PII classification enabled and validated | PII scan result | No unhandled PII categories detected |
| SC-5 | Credential / secrets scan clean | Last scan result | Zero unresolved findings |

---

### Category 3: Engagement Maturity

**Purpose:** Verify the engagement is operationally stable and mature enough to absorb an on-demand resource without creating risk to delivery continuity.

**Gate:** All items must pass. Any failure = category fails.

| # | Condition | Measurement Method | Pass Criteria |
|---|---|---|---|
| EM-1 | Engagement capability profile | Profile tier from capability matrix | P3 or above |
| EM-2 | Engagement tenure | Engagement start date vs. today | ≥ minimum threshold (**OPEN — not yet defined**) |
| EM-3 | SLA baseline established | SLA configuration record | Present and actively measured |
| EM-4 | Observability active | Grafana / Langfuse data ingestion check | Data received in last 24h |
| EM-5 | Incident response process documented | Document existence check | Present and accessible |

**Open item — EM-2:** Minimum engagement tenure has not been defined. This must be decided before the review process can be implemented. Candidates: 30 days, 60 days, one completed sprint cycle, or one completed capability profile milestone.

---

### Category 4: Certification Checklist

**Purpose:** Discrete human-administered steps that Toptal's review team must complete. These are not automated and require deliberate action.

**Gate:** All items complete = Certified. Any incomplete item = In Progress or Not Started.

| # | Step | Owner | Automated? |
|---|---|---|---|
| CC-1 | Client submits well-architected review assessment | Client (Toptal-facilitated) | No |
| CC-2 | Toptal review team assigned | Toptal delivery lead | No |
| CC-3 | Technical review completed | Toptal engineering reviewer | No |
| CC-4 | Security review completed | Toptal security reviewer | No |
| CC-5 | Certification issued | Toptal delivery lead | No — generates certification ID |
| CC-6 | Renewal scheduled | Toptal account manager | No |

---

## Certification Lifecycle

```
Assessment Submitted (CC-1)
        ↓
Review Team Assigned (CC-2)
        ↓
Technical Review (CC-3) ─── parallel ─── Security Review (CC-4)
        ↓
Certification Issued (CC-5)
  - Generates: Certification ID (format: WAR-YYYY-NNNN)
  - Records: Issue date, expiry date, reviewer names
        ↓
Active Certification (client is ELIGIBLE)
        ↓
Renewal Scheduled (CC-6)
  - Triggered: N days before expiry (OPEN — expiry period not yet defined)
  - Process: abbreviated re-review (full re-review only if conditions have materially changed)
```

---

## Eligibility Outcomes

| Status | Condition | Effect on On-Demand Talent |
|---|---|---|
| `ELIGIBLE` | All four categories pass + CC-5 complete | Client can access Full Sprint Support and Emergency Support (if AI platform deployed) |
| `PENDING` | Categories passing but certification checklist incomplete | No access — review in progress |
| `NOT ELIGIBLE` | One or more categories failing | No access — blocking conditions must be remediated |
| `EXPIRED` | Certification past expiry date | Access suspended pending renewal |

---

## Open Questions

| ID | Question | Blocking? | Decision Owner |
|---|---|---|---|
| OQ-1 | What is the minimum engagement tenure for EM-2? | Yes — blocks implementation of EM-2 check | Leadership |
| OQ-2 | What is the certification expiry period? (CC-6) | Yes — blocks renewal scheduling | Leadership |
| OQ-3 | What is the minimum document count threshold for PR-4? | Yes — blocks PR-4 automation | Engineering |
| OQ-4 | What is the Retrieval API p95 latency threshold for PR-5? | Yes — blocks PR-5 automation | Engineering |
| OQ-5 | Is the re-review process abbreviated or full for renewals? | No — can be decided during implementation | Delivery team |
| OQ-6 | Who has authority to issue certification (CC-5)? | No — process question | Delivery team |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-05-23 | Initial draft — four condition categories, certification lifecycle, open questions identified |
