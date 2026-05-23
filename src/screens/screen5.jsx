import React, { useState } from 'react'

/* Screen 5 — Management Dashboard
   Delivery lead view · in-flight requests · inline approve · SLA tracking */

const Ico5 = {
  search: (p) => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" {...p}>
      <circle cx="4.5" cy="4.5" r="3"/>
      <path d="M6.8 6.8 L9.5 9.5"/>
    </svg>
  ),
  arrow5: (p) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2.5 6 H9.5 M6.5 3 L9.5 6 L6.5 9"/>
    </svg>
  ),
  filter: (p) => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" {...p}>
      <path d="M1 2 H10 L7 6 V10 L4 8.5 V6 Z"/>
    </svg>
  ),
};

const ROWS = [
  {
    id: "r1", new: false,
    name: "Maya Rivera", handle: "@maya",
    avc: "c1",
    engagement: "Halyard Capital",
    engNote: "Sprint 14 · day 6",
    skill: "Kubernetes",
    skillSub: "Cluster networking, Ingress",
    mode: "sprint",
    stage: "approving", stageLabel: "Pending approval",
    sla: { pct: 87, text: "62h / 72h", state: "red" },
    action: "approve",
  },
  {
    id: "r2", new: true,
    name: "Ravi Sharma", handle: "@ravi",
    avc: "c3",
    engagement: "Northwind Logistics",
    engNote: "Order pipeline · P1",
    skill: "Kubernetes",
    skillSub: "Ingress · burst load",
    mode: "emergency",
    stage: "active", stageLabel: "Active · incident",
    sla: { pct: 64, text: "5h / 8h", state: "amber" },
    action: "view",
  },
  {
    id: "r3", new: true,
    name: "Sam Park", handle: "@sampark",
    avc: "c4",
    engagement: "Acme Bank",
    engNote: "Mobile checkout",
    skill: "Postgres",
    skillSub: "Query plan tuning",
    mode: "sprint",
    stage: "matching", stageLabel: "Matching",
    sla: { pct: 52, text: "2h 5m / 4h", state: "amber" },
    action: "view",
  },
  {
    id: "r4", new: false,
    name: "Lisa Bourne", handle: "@lbourne",
    avc: "c2",
    engagement: "Mistral Studio",
    engNote: "Public site rebuild",
    skill: "React / Next.js",
    skillSub: "App router migration",
    mode: "sprint",
    stage: "active", stageLabel: "Active",
    sla: { pct: 18, text: "12h / 72h", state: "green" },
    action: "view",
  },
  {
    id: "r5", new: false,
    name: "Nadia Vasquez", handle: "@nadia",
    avc: "c6",
    engagement: "OmniLabs",
    engNote: "Type-safety push",
    skill: "TypeScript",
    skillSub: "Conditional types",
    mode: "sprint",
    stage: "matching", stageLabel: "Matching",
    sla: { pct: 12, text: "38m / 4h", state: "green" },
    action: "view",
  },
  {
    id: "r6", new: false, muted: true,
    name: "Kai Tanaka", handle: "@kai",
    avc: "c5",
    engagement: "Foxglove Health",
    engNote: "Closed May 24",
    skill: "Postgres",
    skillSub: "Replication setup",
    mode: "sprint",
    stage: "closed converted", stageLabel: "Closed · Converted",
    sla: { pct: 100, text: "Met · 38h", state: "green" },
    action: "log",
    convert: true,
  },
];

function Row({ row, openApproval, onApprove }) {
  const cls = [
    "mtable-row",
    row.muted ? "muted" : "",
    row.sla.state === "amber" ? "sla-amber" : "",
    row.sla.state === "red" ? "sla-red" : "",
  ].join(" ");
  return (
    <div className={cls}>
      <div className="req-cell-mark">
        <span className={"marker" + (row.new ? " new" : "")}/>
      </div>

      <div className="req-cell-name">
        <div className={"av " + row.avc}>{row.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}</div>
        <div>
          <div className="n">{row.name}</div>
          <div className="h">{row.handle}</div>
        </div>
      </div>

      <div className="req-cell-eng">
        <div className="e">{row.engagement}</div>
        <div className="s">{row.engNote}</div>
      </div>

      <div className="req-cell-skill">
        <span className="pill">{row.skill}</span>
        <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 3, fontFamily: "var(--font-sans)" }}>{row.skillSub}</div>
      </div>

      <div>
        <span className={"mode-chip " + row.mode}>{row.mode === "emergency" ? "Emergency" : "Sprint"}</span>
      </div>

      <div>
        <div className={"stage-chip " + row.stage}>
          <span className="dot"/>
          <span>{row.stageLabel}</span>
        </div>
        {row.convert && (
          <div style={{ marginTop: 6 }}>
            <span className="convert-flag">Long-term placement</span>
          </div>
        )}
      </div>

      <div className="sla-cell">
        <div className={"sla-bar " + row.sla.state}>
          <div className="fill" style={{ width: row.sla.pct + "%" }}/>
        </div>
        <div className={"sla-text " + row.sla.state}>{row.sla.text}</div>
      </div>

      <div className="act-cell">
        {row.action === "approve" ? (
          <button className="act-btn warning" onClick={(e) => { e.stopPropagation(); onApprove && onApprove(row.id); }}>Approve</button>
        ) : row.action === "log" ? (
          <button className="act-link">View log</button>
        ) : (
          <button className="act-link">View →</button>
        )}

        {openApproval === row.id && (
          <div className="approval-pop" onClick={(e) => e.stopPropagation()}>
            <div className="h">Case-by-case approval · ODT-2614</div>
            <div className="title">Approve SME engagement?</div>
            <div className="sub">Marcus flagged this gap. The matched SME has accepted and is awaiting your sign-off to start onboarding.</div>
            <div className="facts">
              <div className="fact"><span className="k">SME</span><span className="v sans">Priya Nair · @pnair</span></div>
              <div className="fact"><span className="k">Skill</span><span className="v sans">Kubernetes · Ingress</span></div>
              <div className="fact"><span className="k">Duration</span><span className="v">~1 sprint · 4d</span></div>
              <div className="fact"><span className="k">Est. cost</span><span className="v">$5,000 · 5d × $1,250</span></div>
              <div className="fact"><span className="k">SLA window</span><span className="v" style={{ color: "var(--alert)" }}>62h / 72h · breach risk</span></div>
            </div>
            <div className="acts">
              <button className="btn btn-quiet" onClick={(e) => { e.stopPropagation(); onApprove && onApprove(null); }}>Decline</button>
              <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onApprove && onApprove(null); }}>Approve & onboard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MgmtDashboard({ defaultPopover = null }) {
  const [filter, setFilter] = useState("all");
  const [popover, setPopover] = useState(defaultPopover);

  return (
    <div className="cad mgmt">
      <aside className="mgmt-side">
        <div className="brand"><span className="dot"/>Toptal</div>
        <div className="brand-sub">Delivery ops</div>

        <div className="nav-section">Workspace</div>
        <div className="nav-link active">
          <span>On-demand requests</span>
          <span className="ct">14</span>
        </div>
        <div className="nav-link">
          <span>Engagements</span>
          <span className="ct">38</span>
        </div>
        <div className="nav-link">
          <span>SME network</span>
          <span className="ct">126</span>
        </div>
        <div className="nav-link">
          <span>Approvals</span>
          <span className="ct" style={{ background: "var(--warning-soft)", color: oklchAmber() }}>2</span>
        </div>

        <div className="nav-section">Reporting</div>
        <div className="nav-link"><span>SLA performance</span></div>
        <div className="nav-link"><span>Conversion funnel</span></div>
        <div className="nav-link"><span>Capacity planning</span></div>

        <div style={{ flex: 1 }}/>
        <div style={{ padding: "12px 6px", borderTop: "1px solid var(--line-soft)", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="appbar-avatar" style={{ width: 26, height: 26, background: "oklch(85% 0.04 290)" }}>EL</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Elena Larsen</div>
            <div style={{ fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>DELIVERY LEAD</div>
          </div>
        </div>
      </aside>

      <main className="mgmt-main">
        <div className="mgmt-h">
          <div>
            <div className="mgmt-title">On-demand requests</div>
            <div className="mgmt-quick"><span className="live"/> LIVE · Synced 8s ago · 14 in flight across 9 engagements</div>
          </div>
        </div>
        <div className="mgmt-sub">Every on-demand talent request in flight. Approve case-by-case requests inline; click any row to drill into the lifecycle. Breach risk and emergencies sort to the top.</div>

        {/* KPI strip */}
        <div className="kpis">
          <div className="kpi">
            <div className="k">In flight</div>
            <div className="v">14</div>
            <div className="delta up">▲ 3 vs. last week</div>
          </div>
          <div className="kpi">
            <div className="k">Awaiting approval</div>
            <div className="v">2</div>
            <div className="delta flat">— stable</div>
          </div>
          <div className="kpi urgent">
            <div className="k">Breach risk</div>
            <div className="v">1</div>
            <div className="delta down">▲ 1 since 09:00 UTC</div>
          </div>
          <div className="kpi">
            <div className="k">Median flag → onboard</div>
            <div className="v">11<span className="unit">h 22m</span></div>
            <div className="delta up">▼ 38% MoM</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="filters">
          <div className="filter-grp">
            <span className="filter-lbl">Mode</span>
            {[
              ["all", "All"],
              ["sprint", "Sprint"],
              ["emergency", "Emergency"],
            ].map(([k, l]) => (
              <button key={k} className={"filter-chip" + (filter === k ? " active" : "")} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
          <div className="filter-sep"/>
          <div className="filter-grp">
            <span className="filter-lbl">Stage</span>
            <button className="filter-chip active">In progress</button>
            <button className="filter-chip">Active</button>
            <button className="filter-chip">Closed</button>
          </div>
          <div className="filter-sep"/>
          <div className="filter-grp">
            <span className="filter-lbl">Engagement</span>
            <button className="filter-chip">All 9 ▾</button>
          </div>
          <div className="filter-search">
            <Ico5.search/> Search requests
            <span className="kbd">⌘ K</span>
          </div>
        </div>

        {/* Table */}
        <div className="mtable">
          <div className="mtable-head">
            <div/>
            <div>Requestor</div>
            <div>Engagement</div>
            <div>Skill gap</div>
            <div>Mode</div>
            <div>Stage</div>
            <div>SLA · time elapsed</div>
            <div style={{ textAlign: "right" }}>Action</div>
          </div>
          {ROWS
            .filter((r) => filter === "all" || r.mode === filter)
            .map((row) => (
              <Row key={row.id} row={row} openApproval={popover} onApprove={(id) => setPopover(popover === row.id ? null : id)}/>
            ))}
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          <span>SHOWING 6 OF 14 · 8 ACTIVE · 4 CLOSED · 2 PENDING</span>
          <span>EXPORT CSV · PUSH TO LOOKER</span>
        </div>
      </main>
    </div>
  );
}

// Small helper so the inline amber color doesn't sprawl
function oklchAmber() { return "oklch(48% 0.13 75)"; }

function FrameMgmt() { return <MgmtDashboard />; }
function FrameMgmtApproval() { return <MgmtDashboard defaultPopover="r1"/>; }

export { FrameMgmt, FrameMgmtApproval, MgmtDashboard };
