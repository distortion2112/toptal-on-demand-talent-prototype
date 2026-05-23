import React, { useState } from 'react'

/* Screen 7 — Well-Architected Review · Health Dashboard
   Internal Toptal tool. 3 states (Partially Ready · Eligible · Early Stage).
   State 2 (Nexus Capital Partners) is the interactive prototype state. */

// ─── Reusable Toptal admin sidebar (matches mgmt/inbox style) ──────
function WarSidebar() {
  return (
    <aside className="mgmt-side">
      <div className="brand"><span className="dot"/>Toptal</div>
      <div className="brand-sub">Delivery ops</div>

      <div className="nav-section">Workspace</div>
      <div className="nav-link"><span>On-demand requests</span><span className="ct">14</span></div>
      <div className="nav-link"><span>Engagements</span><span className="ct">38</span></div>
      <div className="nav-link"><span>SME network</span><span className="ct">126</span></div>
      <div className="nav-link"><span>Approvals</span><span className="ct">2</span></div>

      <div className="nav-section">Eligibility</div>
      <div className="nav-link active"><span>Well-architected review</span><span className="ct">8</span></div>
      <div className="nav-link"><span>Certifications</span></div>
      <div className="nav-link"><span>Renewals</span><span className="ct">3</span></div>

      <div className="nav-section">Reporting</div>
      <div className="nav-link"><span>SLA performance</span></div>
      <div className="nav-link"><span>Conversion funnel</span></div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: "12px 6px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div className="appbar-avatar" style={{ width: 26, height: 26, background: "oklch(85% 0.04 290)" }}>EL</div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Elena Larsen</div>
          <div style={{ fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>DELIVERY LEAD</div>
        </div>
      </div>
    </aside>
  );
}

// ─── Header band (navy) ────────────────────────────────────────────
function WarHeader({ crumb, client, engagement, lastChecked, status, statusMeta }) {
  return (
    <header className="war-head">
      <div className="war-head-l">
        <div className="crumb">{crumb}</div>
        <div className="client">{client}</div>
        <div className="eng">{engagement}</div>
        <div className="last"><span className="pulse"/> {lastChecked}</div>
      </div>

      <div className="elig">
        {status === "eligible" && (
          <>
            <div className="elig-badge eligible"><span className="dot"/> Eligible</div>
            <div className="elig-sub">
              <div>
                <div className="k">Certification ID</div>
                <div className="v">{statusMeta.id}</div>
              </div>
              <div>
                <div className="k">Issued</div>
                <div className="v">{statusMeta.issued}</div>
              </div>
              <div>
                <div className="k">Expires</div>
                <div className="v">{statusMeta.expires}</div>
              </div>
            </div>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="elig-badge pending"><span className="dot"/> Pending</div>
            <div className="elig-sub">
              <div>
                <div className="k">Blocking conditions</div>
                <div className="v warn">{statusMeta.count} not met</div>
              </div>
              <div>
                <div className="k">Stage</div>
                <div className="v">{statusMeta.stage}</div>
              </div>
            </div>
            <a className="scroll-link">Jump to {statusMeta.firstBlocker} →</a>
          </>
        )}

        {status === "not-eligible" && (
          <>
            <div className="elig-badge not-eligible"><span className="dot"/> Not eligible</div>
            <div className="elig-sub">
              <div>
                <div className="k">Conditions not met</div>
                <div className="v alert">{statusMeta.count}</div>
              </div>
              <div>
                <div className="k">Categories failing</div>
                <div className="v alert">{statusMeta.failingCats} of 4</div>
              </div>
            </div>
            <a className="scroll-link">View roadmap to eligibility →</a>
          </>
        )}
      </div>
    </header>
  );
}

// ─── Toolbar ───────────────────────────────────────────────────────
function WarToolbar({ clientLabel, blockingOnly, onToggleBlocking }) {
  return (
    <div className="war-toolbar">
      <button className="war-select">
        <span className="lbl">Client</span>
        <span className="v">{clientLabel}</span>
        <span className="chev">▾</span>
      </button>
      <button className={"war-toggle" + (blockingOnly ? " on" : "")} onClick={onToggleBlocking}>
        <span className="sw"/>
        <span>Show blocking conditions only</span>
      </button>
      <button className="war-export">⇣ Export report</button>
    </div>
  );
}

// ─── Category card ─────────────────────────────────────────────────
function CategoryCard({ name, count, gate, children }) {
  return (
    <div className="war-card">
      <div className="war-card-h">
        <div>
          <span className="name">{name}</span>
          <span className="count">· {count}</span>
        </div>
        <span className={"gate " + gate.kind}>{gate.label}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ─── Condition row ─────────────────────────────────────────────────
function Cond({ code, label, meta, status, time, expandable, expanded, onClick, children }) {
  return (
    <div className={"cond" + (expandable ? " expandable" : "")} onClick={expandable ? onClick : undefined}>
      <div className={"cond-ico " + status}>
        {status === "pass" ? "✓" : status === "fail" ? "✗" : status === "progress" ? "◌" : "·"}
      </div>
      <div className="label">
        <span className="code">{code}</span>{label}
        {meta && <div className="meta">{meta}</div>}
      </div>
      <div className={"cond-status " + status}>
        {status === "pass" ? "Pass" : status === "fail" ? "Fail" : status === "progress" ? "In progress" : "Not checked"}
      </div>
      <div className="cond-time">{time}</div>

      {expandable && expanded && children}
    </div>
  );
}

// ─── Checklist row (Cert Checklist card) ───────────────────────────
function CheckRow({ code, label, status, owner, date, action }) {
  const ico =
    status === "done" ? "pass" :
    status === "doing" ? "progress" :
    "idle";
  const statusLabel =
    status === "done" ? "Complete" :
    status === "doing" ? "In progress" :
    "Not started";
  return (
    <div className="check-row">
      <div className={"cond-ico " + ico}>
        {ico === "pass" ? "✓" : ico === "progress" ? "◌" : "·"}
      </div>
      <div className="lbl-wrap">
        <div className="lbl"><span className="code">{code}</span>{label}</div>
        <div className={"cond-status " + ico} style={{ display: "inline-block", marginTop: 4 }}>{statusLabel}</div>
      </div>
      <div className="owner">
        <b>{owner}</b>
        <span className="date">{date}</span>
      </div>
      {action ? <button className="check-action">{action}</button> : <span style={{ width: 100 }}/>}
    </div>
  );
}

// ─── Remediation panel content ─────────────────────────────────────
function RemediationPanel({ what, steps, owner, docLabel }) {
  return (
    <div className="cond-expand" onClick={(e) => e.stopPropagation()}>
      <div className="h">Remediation required</div>
      <div className="what">{what}</div>
      <div className="rem-steps">
        {steps.map((s, i) => (
          <div className="rem-step" key={i}>
            <div className="n">{String(i + 1).padStart(2, "0")}</div>
            <div>{s}</div>
          </div>
        ))}
      </div>
      <div className="rem-foot">
        <div className="rem-owner">
          <span className="lbl">Owner</span>
          {owner ? <span style={{ color: "var(--ink)", fontWeight: 500 }}>{owner}</span>
                 : <button className="assign-chip">+ Assign owner</button>}
        </div>
        <button className="rem-doc">📄 {docLabel}</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// State 2 · Partially Ready · NEXUS CAPITAL PARTNERS (interactive)
// ═══════════════════════════════════════════════════════════════════
function NexusFrame({ initialExpanded = "SC-5" }) {
  const [blockingOnly, setBlockingOnly] = useState(false);
  const [expanded, setExpanded] = useState(initialExpanded);
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div className="cad war" style={{ position: "relative" }}>
      <WarSidebar/>
      <div className="war-main">
        <WarHeader
          crumb={<><span>Eligibility</span><span className="sep">/</span><span>Well-architected review</span><span className="sep">/</span><span>Nexus Capital Partners</span></>}
          client="Nexus Capital Partners"
          engagement="Quant trading platform · 8 mo · Managed Services"
          lastChecked="Last checked · 2026-05-23 09:41 UTC · auto · every 15 min"
          status="pending"
          statusMeta={{ count: 1, stage: "Awaiting remediation", firstBlocker: "SC-5" }}
        />
        <WarToolbar
          clientLabel="Nexus Capital Partners"
          blockingOnly={blockingOnly}
          onToggleBlocking={() => setBlockingOnly(!blockingOnly)}
        />

        <div className="war-body">
          <div className="war-grid">
            {/* Platform Readiness — PASS */}
            <CategoryCard name="Platform Readiness" count="6 conditions · all pass" gate={{ kind: "pass", label: "Pass" }}>
              <Cond code="PR-1" label="AI platform deployed and reachable" status="pass" time="09:41 UTC" />
              <Cond code="PR-2" label="M1 Connector operational" status="pass" time="09:41 UTC" />
              <Cond code="PR-3" label="M3 Curation Engine operational" status="pass" time="09:41 UTC" />
              <Cond code="PR-4" label="M4 Vector Store provisioned and indexed" meta={<>Doc count <span className="mono">412,308</span> · above threshold</>} status="pass" time="09:38 UTC" />
              <Cond code="PR-5" label="M5 Retrieval API within SLA" meta={<>p95 <span className="mono">218 ms</span></>} status="pass" time="09:41 UTC" />
              <Cond code="PR-6" label="Tenant isolation verified" status="pass" time="09:20 UTC" />
            </CategoryCard>

            {/* Security & Compliance — FAIL (the blocker) */}
            <CategoryCard name="Security & Compliance" count="5 conditions · 1 failing" gate={{ kind: "fail", label: "Fail" }}>
              <Cond code="SC-1" label="Security threat model completed" status="pass" time="May 18" />
              <Cond code="SC-2" label="Data classification schema configured" meta={<>96.4% of corpus classified · above 95%</>} status="pass" time="09:31 UTC" />
              <Cond code="SC-3" label="M8 Governance module operational" status="pass" time="09:41 UTC" />
              <Cond code="SC-4" label="PII classification enabled and validated" status="pass" time="09:30 UTC" />
              <Cond
                code="SC-5"
                label="Credential / secrets scan clean"
                meta={<>Last scan returned <b style={{ color: "var(--alert)" }}>2 findings</b> · unresolved</>}
                status="fail"
                time="May 20"
                expandable
                expanded={expanded === "SC-5"}
                onClick={() => toggle("SC-5")}
              >
                <RemediationPanel
                  what={<>Two credentials were detected in the client's repository scan on <span className="mono">2026-05-20</span>. <b>Both must be rotated and a clean follow-up scan confirmed</b> before this condition will pass.</>}
                  steps={[
                    <>Rotate the two detected credentials (AWS access key in <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>config/staging.env</span> and a GitHub PAT in <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>scripts/release.sh</span>) and audit any downstream usage.</>,
                    <>Remove the findings from git history using <a>git-filter-repo</a> and force-push to the affected branches. Coordinate with Nexus eng-lead before push.</>,
                    <>Re-run the secrets scanner against the cleaned repo. Once it returns zero findings, this condition will auto-pass within 15 minutes.</>,
                  ]}
                  owner={null}
                  docLabel="Runbook · Secrets scan remediation"
                />
              </Cond>
            </CategoryCard>

            {/* Engagement Maturity — PASS */}
            <CategoryCard name="Engagement Maturity" count="5 conditions · all pass" gate={{ kind: "pass", label: "Pass" }}>
              <Cond code="EM-1" label="Engagement capability profile" meta={<>Tier <b>P3</b> · meets minimum</>} status="pass" time="May 19" />
              <Cond code="EM-2" label="Engagement tenure" meta={<>8 months · above threshold</>} status="pass" time="—" />
              <Cond code="EM-3" label="SLA baseline established" status="pass" time="May 11" />
              <Cond code="EM-4" label="Observability active" meta={<>Grafana + Langfuse · receiving data</>} status="pass" time="09:41 UTC" />
              <Cond code="EM-5" label="Incident response process documented" status="pass" time="May 09" />
            </CategoryCard>

            {/* Certification Checklist — PASS */}
            <CategoryCard name="Certification Checklist" count="6 steps · all complete" gate={{ kind: "pass", label: "Pass" }}>
              <CheckRow code="CC-1" label="Client submits well-architected review assessment" status="done" owner="Maya Park (Nexus)" date="MAY 10"/>
              <CheckRow code="CC-2" label="Review team assigned" status="done" owner="Elena Larsen" date="MAY 11"/>
              <CheckRow code="CC-3" label="Technical review completed" status="done" owner="Daniel Wu" date="MAY 16"/>
              <CheckRow code="CC-4" label="Security review completed" status="done" owner="Priya Mehta" date="MAY 17"/>
              <CheckRow code="CC-5" label="Certification issued" status="doing" owner="Elena Larsen" date="HELD · pending SC-5" action="Issue"/>
              <CheckRow code="CC-6" label="Renewal scheduled" status="idle" owner="—" date="—"/>
            </CategoryCard>
          </div>
        </div>

        <div className="war-actions">
          <div className="left">3 of 4 categories pass · <b>1 condition blocking certification</b></div>
          <div className="right">
            <button className="btn btn-ghost">Export PDF</button>
            <button className="btn btn-primary">Continue review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// State 1 · Fully Eligible · MERIDIAN HEALTH SYSTEMS
// ═══════════════════════════════════════════════════════════════════
function MeridianFrame() {
  return (
    <div className="cad war" style={{ position: "relative" }}>
      <WarSidebar/>
      <div className="war-main">
        <WarHeader
          crumb={<><span>Eligibility</span><span className="sep">/</span><span>Well-architected review</span><span className="sep">/</span><span>Meridian Health Systems</span></>}
          client="Meridian Health Systems"
          engagement="Care-pathway analytics · 22 mo · Managed Services"
          lastChecked="Last checked · 2026-05-23 09:41 UTC · auto · every 15 min"
          status="eligible"
          statusMeta={{ id: "WAR-2026-0047", issued: "2026-03-14", expires: "2027-03-14" }}
        />
        <WarToolbar clientLabel="Meridian Health Systems" blockingOnly={false} onToggleBlocking={() => {}}/>

        <div className="war-body">
          <div className="war-grid">
            <CategoryCard name="Platform Readiness" count="6 conditions · all pass" gate={{ kind: "pass", label: "Pass" }}>
              <Cond code="PR-1" label="AI platform deployed and reachable" status="pass" time="09:41 UTC"/>
              <Cond code="PR-2" label="M1 Connector operational" status="pass" time="09:41 UTC"/>
              <Cond code="PR-3" label="M3 Curation Engine operational" status="pass" time="09:41 UTC"/>
              <Cond code="PR-4" label="M4 Vector Store provisioned and indexed" meta={<>Doc count <span className="mono">812,440</span> · above threshold</>} status="pass" time="09:40 UTC"/>
              <Cond code="PR-5" label="M5 Retrieval API within SLA" meta={<>p95 <span className="mono">198 ms</span></>} status="pass" time="09:41 UTC"/>
              <Cond code="PR-6" label="Tenant isolation verified" status="pass" time="08:55 UTC"/>
            </CategoryCard>

            <CategoryCard name="Security & Compliance" count="5 conditions · all pass" gate={{ kind: "pass", label: "Pass" }}>
              <Cond code="SC-1" label="Security threat model completed" status="pass" time="Feb 28"/>
              <Cond code="SC-2" label="Data classification schema configured" meta={<>99.1% of corpus classified</>} status="pass" time="09:31 UTC"/>
              <Cond code="SC-3" label="M8 Governance module operational" status="pass" time="09:41 UTC"/>
              <Cond code="SC-4" label="PII classification enabled and validated" status="pass" time="09:30 UTC"/>
              <Cond code="SC-5" label="Credential / secrets scan clean" status="pass" time="May 21"/>
            </CategoryCard>

            <CategoryCard name="Engagement Maturity" count="5 conditions · all pass" gate={{ kind: "pass", label: "Pass" }}>
              <Cond code="EM-1" label="Engagement capability profile" meta={<>Tier <b>P4</b> · above minimum</>} status="pass" time="May 02"/>
              <Cond code="EM-2" label="Engagement tenure" meta={<>22 months</>} status="pass" time="—"/>
              <Cond code="EM-3" label="SLA baseline established" status="pass" time="Jan 14"/>
              <Cond code="EM-4" label="Observability active" status="pass" time="09:41 UTC"/>
              <Cond code="EM-5" label="Incident response process documented" status="pass" time="Mar 04"/>
            </CategoryCard>

            <CategoryCard name="Certification Checklist" count="6 steps · all complete" gate={{ kind: "pass", label: "Pass" }}>
              <CheckRow code="CC-1" label="Client submits well-architected review assessment" status="done" owner="Dr. R. Okafor (Meridian)" date="FEB 12"/>
              <CheckRow code="CC-2" label="Review team assigned" status="done" owner="Elena Larsen" date="FEB 14"/>
              <CheckRow code="CC-3" label="Technical review completed" status="done" owner="Daniel Wu" date="FEB 28"/>
              <CheckRow code="CC-4" label="Security review completed" status="done" owner="Priya Mehta" date="MAR 06"/>
              <CheckRow code="CC-5" label="Certification issued" status="done" owner="Elena Larsen" date="MAR 14"/>
              <CheckRow code="CC-6" label="Renewal scheduled" status="done" owner="Account team" date="DEC 14, 2026"/>
            </CategoryCard>
          </div>
        </div>

        <div className="war-actions">
          <div className="left">All conditions pass · certified through <b>14 Mar 2027</b></div>
          <div className="right">
            <button className="btn btn-ghost">View certificate</button>
            <button className="btn btn-ghost">Schedule renewal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// State 3 · Early Stage · THORNFIELD LOGISTICS
// ═══════════════════════════════════════════════════════════════════
function ThornfieldFrame() {
  return (
    <div className="cad war" style={{ position: "relative" }}>
      <WarSidebar/>
      <div className="war-main">
        <WarHeader
          crumb={<><span>Eligibility</span><span className="sep">/</span><span>Well-architected review</span><span className="sep">/</span><span>Thornfield Logistics</span></>}
          client="Thornfield Logistics"
          engagement="Freight network optimization · 2 mo · Managed Services"
          lastChecked="Last checked · 2026-05-23 09:41 UTC · auto · every 15 min"
          status="not-eligible"
          statusMeta={{ count: 6, failingCats: 2 }}
        />
        <WarToolbar clientLabel="Thornfield Logistics" blockingOnly={false} onToggleBlocking={() => {}}/>

        <div className="war-body">
          <div className="war-grid">
            <CategoryCard name="Platform Readiness" count="6 conditions · 3 failing" gate={{ kind: "fail", label: "Fail" }}>
              <Cond code="PR-1" label="AI platform deployed and reachable" meta={<>Endpoint not reachable · returns <span className="mono">connection refused</span></>} status="fail" time="09:41 UTC"/>
              <Cond code="PR-2" label="M1 Connector operational" status="pass" time="09:41 UTC"/>
              <Cond code="PR-3" label="M3 Curation Engine operational" status="pass" time="09:41 UTC"/>
              <Cond code="PR-4" label="M4 Vector Store provisioned and indexed" meta={<>Vector store <b style={{ color: "var(--alert)" }}>not provisioned</b></>} status="fail" time="—"/>
              <Cond code="PR-5" label="M5 Retrieval API within SLA" meta={<>Awaiting PR-4 · cannot measure</>} status="idle" time="—"/>
              <Cond code="PR-6" label="Tenant isolation verified" meta={<>Verification pending platform deploy</>} status="fail" time="—"/>
            </CategoryCard>

            <CategoryCard name="Security & Compliance" count="5 conditions · all pass" gate={{ kind: "pass", label: "Pass" }}>
              <Cond code="SC-1" label="Security threat model completed" status="pass" time="Apr 12"/>
              <Cond code="SC-2" label="Data classification schema configured" meta={<>97.8% of corpus classified</>} status="pass" time="09:32 UTC"/>
              <Cond code="SC-3" label="M8 Governance module operational" status="pass" time="09:41 UTC"/>
              <Cond code="SC-4" label="PII classification enabled and validated" status="pass" time="09:30 UTC"/>
              <Cond code="SC-5" label="Credential / secrets scan clean" status="pass" time="May 21"/>
            </CategoryCard>

            <CategoryCard name="Engagement Maturity" count="5 conditions · 2 failing" gate={{ kind: "fail", label: "Fail" }}>
              <Cond code="EM-1" label="Engagement capability profile" meta={<>Tier <b style={{ color: "var(--alert)" }}>P2</b> · below required P3</>} status="fail" time="May 02"/>
              <Cond code="EM-2" label="Engagement tenure" meta={<>2 months · tenure threshold pending configuration (OQ-1)</>} status="progress" time="—"/>
              <Cond code="EM-3" label="SLA baseline established" status="pass" time="Apr 22"/>
              <Cond code="EM-4" label="Observability active" status="pass" time="09:41 UTC"/>
              <Cond code="EM-5" label="Incident response process documented" status="pass" time="Apr 30"/>
            </CategoryCard>

            <CategoryCard name="Certification Checklist" count="6 steps · not started" gate={{ kind: "not-started", label: "Not started" }}>
              <CheckRow code="CC-1" label="Client submits well-architected review assessment" status="idle" owner="—" date="—"/>
              <CheckRow code="CC-2" label="Review team assigned" status="idle" owner="—" date="—"/>
              <CheckRow code="CC-3" label="Technical review completed" status="idle" owner="—" date="—"/>
              <CheckRow code="CC-4" label="Security review completed" status="idle" owner="—" date="—"/>
              <CheckRow code="CC-5" label="Certification issued" status="idle" owner="—" date="—"/>
              <CheckRow code="CC-6" label="Renewal scheduled" status="idle" owner="—" date="—"/>
            </CategoryCard>
          </div>

          {/* Roadmap panel — only on State 3 */}
          <div className="war-roadmap">
            <div className="war-roadmap-h">Roadmap to eligibility</div>
            <div className="war-roadmap-sub">Suggested sequence for closing the gap. Not a blocker — a path you can take to Thornfield's team.</div>

            <div className="war-road-step">
              <div className="num">1</div>
              <div>
                <div className="title"><b>Deploy AI platform</b> + provision vector store
                  <div className="sub">Unblocks PR-1, PR-4, PR-5, PR-6 in one move. Engineering owns deployment.</div>
                </div>
              </div>
              <div className="eta">≈ 2 weeks</div>
            </div>

            <div className="war-road-step">
              <div className="num">2</div>
              <div>
                <div className="title"><b>Run capability-profile uplift</b> P2 → P3
                  <div className="sub">EM-1 currently failing. Requires one sprint with the delivery team and a profile re-assessment.</div>
                </div>
              </div>
              <div className="eta">≈ 1 sprint</div>
            </div>

            <div className="war-road-step">
              <div className="num">3</div>
              <div>
                <div className="title"><b>Pass engagement tenure threshold</b>
                  <div className="sub">EM-2 in progress — pending leadership decision on the threshold value (OQ-1).</div>
                </div>
              </div>
              <div className="eta">Awaits OQ-1</div>
            </div>

            <div className="war-road-step">
              <div className="num">4</div>
              <div>
                <div className="title"><b>Submit assessment + begin certification checklist</b>
                  <div className="sub">CC-1 through CC-5. Toptal review team takes over once submitted.</div>
                </div>
              </div>
              <div className="eta">≈ 2 weeks</div>
            </div>
          </div>
        </div>

        <div className="war-actions">
          <div className="left"><b>6 conditions not met</b> · 2 of 4 categories failing · checklist not started</div>
          <div className="right">
            <button className="btn btn-ghost">Export roadmap</button>
            <button className="btn btn-primary">Begin review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameWarNexus()      { return <NexusFrame initialExpanded="SC-5"/>; }
function FrameWarMeridian()   { return <MeridianFrame/>; }
function FrameWarThornfield() { return <ThornfieldFrame/>; }

export { FrameWarNexus, FrameWarMeridian, FrameWarThornfield };
