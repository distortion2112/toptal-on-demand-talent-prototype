import React, { useState } from 'react'

/* Taso's Button — Client-facing surface
   Halyard Capital portal · "Request Expert Support" button + modal flow.
   The portal is intentionally distinct from Toptal's visual identity so
   the button reads as NATIVE to the client. The modal carries Toptal teal
   accents because that's the moment Toptal enters the experience. */

const IcoB = {
  arrow: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 6.5 H10 M7 3.5 L10 6.5 L7 9.5"/>
    </svg>
  ),
  lock: (p) => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="5" width="7" height="5" rx="0.5"/>
      <path d="M3.5 5 V3.5 A2 2 0 0 1 7.5 3.5 V5"/>
    </svg>
  ),
  check: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7.5 L6 10.5 L11 4"/>
    </svg>
  ),
  x: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}>
      <path d="M3 3 L10 10 M10 3 L3 10"/>
    </svg>
  ),
};

// ─── Client portal sidebar ──────────────────────────────────────────
function HalyardSidebar() {
  return (
    <aside className="cli-side">
      <div className="cli-brand">
        <div className="mark"><span>HC</span></div>
        <div>
          <div className="name">Halyard Capital</div>
          <div className="sub">Trading platform</div>
        </div>
      </div>

      <div className="cli-nav-section">Operations</div>
      <div className="cli-nav-link"><span>Risk · Live</span><span className="ct">28</span></div>
      <div className="cli-nav-link"><span>Execution venues</span></div>
      <div className="cli-nav-link"><span>Positions</span></div>

      <div className="cli-nav-section">Engineering</div>
      <div className="cli-nav-link active"><span>API migration</span><span className="ct">14·6</span></div>
      <div className="cli-nav-link"><span>Data platform</span></div>
      <div className="cli-nav-link"><span>Infra · prod</span></div>
      <div className="cli-nav-link"><span>Incidents</span><span className="ct">0</span></div>

      <div className="cli-nav-section">Partners</div>
      <div className="cli-nav-link"><span>Toptal · delivery</span></div>
      <div className="cli-nav-link"><span>Datadog · obs</span></div>
      <div className="cli-nav-link"><span>Snowflake</span></div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: "12px 6px", borderTop: "1px solid var(--cli-line-soft)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--cli-ink)", color: "#fff", display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 600 }}>TC</div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>T. Cooper</div>
          <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9.5, color: "var(--cli-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>VP · Engineering</div>
        </div>
      </div>
    </aside>
  );
}

// ─── Sprint burn chart placeholder ──────────────────────────────────
function BurnChart() {
  return (
    <svg viewBox="0 0 320 120" preserveAspectRatio="none">
      {/* ideal line */}
      <path d="M0 8 L320 112" stroke="#A4AAB8" strokeWidth="1" strokeDasharray="3,3"/>
      {/* actual */}
      <path d="M0 8 L40 22 L80 30 L120 36 L160 56 L200 78 L200 78 L240 78 L280 76 L320 76"
            stroke="#1F2230" strokeWidth="1.5" fill="none"/>
      {/* fill under actual */}
      <path d="M0 8 L40 22 L80 30 L120 36 L160 56 L200 78 L240 78 L280 76 L320 76 L320 120 L0 120 Z"
            fill="#1F2230" fillOpacity="0.04"/>
      {/* today line */}
      <line x1="200" y1="0" x2="200" y2="120" stroke="#C2410C" strokeWidth="1"/>
      <circle cx="200" cy="78" r="3" fill="#C2410C"/>
    </svg>
  );
}

// ─── Project dashboard ──────────────────────────────────────────────
function HalyardDashboard({ ineligible = false, hasActiveRequest = false, onClickButton }) {
  return (
    <main className="cli-main">
      <div className="cli-topbar">
        <div className="cli-crumb">
          Engineering <span className="sep">/</span> API Migration <span className="sep">/</span> Sprint 14
        </div>
        <div className="right">
          <span className="pill">● Sprint live</span>
          <div className="av">TC</div>
        </div>
      </div>

      <div className="cli-h">
        <div>
          <div className="cli-title">API Migration · Sprint 14</div>
        </div>
      </div>
      <div className="cli-deck">Day 6 of 10 · cutover from legacy Python monolith to Go service mesh. Toptal-deployed team of 5 + you. Live status, blockers, and partner contacts in one view.</div>

      <div className="cli-kpis">
        <div className="cli-kpi">
          <div className="k">Throughput</div>
          <div className="v">68<span style={{ fontSize: 14, color: "var(--cli-muted)", marginLeft: 2 }}>%</span></div>
          <div className="delta">▼ 38% vs. plan</div>
        </div>
        <div className="cli-kpi">
          <div className="k">Blocked tasks</div>
          <div className="v danger">4</div>
          <div className="delta warn">+2 since Monday</div>
        </div>
        <div className="cli-kpi">
          <div className="k">Open PRs</div>
          <div className="v">7</div>
          <div className="delta">Median age 18h</div>
        </div>
        <div className="cli-kpi">
          <div className="k">Budget · sprint</div>
          <div className="v">62<span style={{ fontSize: 14, color: "var(--cli-muted)", marginLeft: 2 }}>%</span></div>
          <div className="delta">$24k / $39k</div>
        </div>
      </div>

      <div className="cli-grid">
        {/* Left column: burn + blockers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="cli-card">
            <div className="cli-card-h">
              <div className="t">Sprint burn-down</div>
              <div className="meta">Day 6 · TODAY</div>
            </div>
            <div className="cli-card-b">
              <div className="cli-burn"><BurnChart/></div>
              <div className="cli-burn-labels">
                <span>D-1</span><span>D-3</span><span>D-5</span><span>D-7</span><span>D-9</span>
              </div>
            </div>
          </div>

          <div className="cli-card">
            <div className="cli-card-h">
              <div className="t">Blockers</div>
              <div className="meta">4 OPEN · 2 NEW</div>
            </div>
            <div className="cli-card-b">
              <div className="cli-issue blocked">
                <span className="dot"/>
                <div>
                  <div className="t">HC-248 · Ingress fails on burst traffic</div>
                  <div className="s">k8s · ingress · OWNER · MAYA R · BLOCKED 6D</div>
                </div>
                <div className="tag">P1 · 6d</div>
              </div>
              <div className="cli-issue blocked">
                <span className="dot"/>
                <div>
                  <div className="t">HC-252 · NodePort drains mid-sprint</div>
                  <div className="s">k8s · networking · OWNER · MAYA R · BLOCKED 5D</div>
                </div>
                <div className="tag">P2 · 5d</div>
              </div>
              <div className="cli-issue live">
                <span className="dot"/>
                <div>
                  <div className="t">HC-258 · Auth token refresh</div>
                  <div className="s">go service · OWNER · JONAS · IN REVIEW</div>
                </div>
                <div className="tag">P2</div>
              </div>
              <div className="cli-issue">
                <span className="dot"/>
                <div>
                  <div className="t">HC-261 · Helm chart values for staging</div>
                  <div className="s">k8s · OWNER · DIEGO · TODO</div>
                </div>
                <div className="tag">P3</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: the BUTTON + team */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {!ineligible ? (
            <div className="cli-support">
              <div className="powered">via <b>Toptal</b></div>
              <div className="cli-elig"><span className="check"/> Well-architected · Certified</div>
              <div className="eyebrow">Need expert support</div>
              <div className="h">Pull a pre-qualified specialist into this sprint.</div>
              <div className="sub">2 blockers tagged Kubernetes have been open 5+ days. A Toptal SME can be in your standup by tomorrow — no new placement, no new contract.</div>

              <button className="cli-btn cli-btn-primary" onClick={onClickButton}>
                Request Expert Support <IcoB.arrow/>
              </button>

              {hasActiveRequest && (
                <div className="cli-active-req">
                  <div className="pulse"/>
                  <div className="text">
                    <div><b>Request in flight</b> · <span className="mono">REQ ODT-2614</span></div>
                    <div style={{ marginTop: 2 }}>Matching a Kubernetes SME · expected onboard within 48h</div>
                  </div>
                  <div className="stage">MATCH</div>
                </div>
              )}
            </div>
          ) : (
            <div className="cli-locked">
              <div className="powered" style={{ position: "absolute", top: 12, right: 14, fontFamily: "IBM Plex Mono, monospace", fontSize: 9.5, color: "var(--cli-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                via <b style={{ color: "var(--teal)", fontWeight: 600 }}>Toptal</b>
              </div>
              <div className="lock"><IcoB.lock/> Well-architected · Pending</div>
              <div className="h">Available once you complete the well-architected review.</div>
              <div className="sub">On-demand expert support requires Toptal's free architecture audit — a 30-minute review of your stack and delivery model. Tenure and spend are not qualifying criteria.</div>

              <ul className="review-list">
                <li><span className="num">01</span>Architecture walkthrough · <b style={{ color: "var(--cli-positive)", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 }}>· COMPLETE</b></li>
                <li><span className="num">02</span>Delivery-model interview · <b style={{ color: "var(--cli-positive)", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 }}>· COMPLETE</b></li>
                <li><span className="num">03</span>Data-handling addendum · <b style={{ color: "var(--cli-accent)", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 }}>· IN PROGRESS</b></li>
                <li><span className="num">04</span>Sign-off & schedule</li>
              </ul>

              <div className="progress"><div className="fill"/></div>
              <div className="progress-text">2 OF 4 STEPS · EST. 4 DAYS TO ELIGIBLE</div>

              <button className="cli-btn cli-btn-ghost" style={{ marginRight: 8 }}>Resume review</button>
              <button className="cli-btn cli-btn-disabled">Request Expert Support</button>
            </div>
          )}

          <div className="cli-card">
            <div className="cli-card-h">
              <div className="t">Toptal team on engagement</div>
              <div className="meta">5 ACTIVE · CET</div>
            </div>
            <div className="cli-card-b">
              <div className="cli-team">
                <div className="cli-team-mem">
                  <div className="av" style={{ background: "#E5EAF5", color: "#0D1D3E" }}>MR</div>
                  <div>
                    <div className="n">Maya Rivera</div>
                    <div className="r">LEAD · BERLIN</div>
                  </div>
                  <div className="badge">Lead</div>
                </div>
                <div className="cli-team-mem">
                  <div className="av" style={{ background: "#DCE7F8", color: "#0D1D3E" }}>JK</div>
                  <div>
                    <div className="n">Jonas Kreft</div>
                    <div className="r">BACKEND · VIENNA</div>
                  </div>
                </div>
                <div className="cli-team-mem">
                  <div className="av" style={{ background: "#E0EBE6", color: "#0D1D3E" }}>SN</div>
                  <div>
                    <div className="n">Sana Noor</div>
                    <div className="r">FRONTEND · LAHORE</div>
                  </div>
                </div>
                <div className="cli-team-mem">
                  <div className="av" style={{ background: "#ECECEC", color: "#0D1D3E" }}>DT</div>
                  <div>
                    <div className="n">Diego Toledo</div>
                    <div className="r">PLATFORM · SÃO PAULO</div>
                  </div>
                </div>
                <div className="cli-team-mem">
                  <div className="av" style={{ background: "#F5E5E5", color: "#0D1D3E" }}>EL</div>
                  <div>
                    <div className="n">Elena Larsen</div>
                    <div className="r">DELIVERY LEAD · COPENHAGEN</div>
                  </div>
                  <div className="badge">Toptal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Modal: Request Expert Support ──────────────────────────────────
function RequestModal({ onClose, onSubmit }) {
  const [mode, setMode] = useState("sprint");
  const [note, setNote] = useState("");

  return (
    <div className="cli-modal-overlay" onClick={onClose}>
      <div className="cli-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cli-modal-h">
          <div className="stamp"><span className="mark">T</span> Toptal · On-Demand Talent</div>
          <div className="t">Request expert support</div>
          <div className="s">An SME will be in your sprint within {mode === "sprint" ? "72 hours" : "8 hours"} — no new placement, certification is the approval.</div>
        </div>

        <div className="cli-modal-b">
          {/* 1 · Mode selector */}
          <div className="cli-mode">
            <button className={"cli-mode-opt" + (mode === "sprint" ? " active" : "")} onClick={() => setMode("sprint")}>
              <span className="name">Full Sprint Support</span>
              <span className="meta">72H ONBOARDING · STANDARD</span>
            </button>
            <button className={"cli-mode-opt" + (mode === "emergency" ? " active" : "")} onClick={() => setMode("emergency")}>
              <span className="name">Emergency Support</span>
              <span className="meta">8H · PROD OUTAGE</span>
            </button>
          </div>

          {/* 2 · AI prefilled context (read-only) */}
          <div className="cli-context">
            <div className="cli-context-h">
              <div className="lbl"><span className="pulse"/> Toptal AI · pre-filled from this engagement</div>
              <button className="edit">Edit context</button>
            </div>
            <div className="body">
              <b>Skill gap · <span className="pill">Kubernetes</span></b> (cluster networking, Ingress controller behaviour under burst load, NodePort drain).
              Inferred from <b>4 blocked tasks</b> in sprint 14 — <span className="mono">HC-241, 248, 252, 261</span> — open <b>5–6 days</b>. Velocity is <b>38% below plan</b>.
            </div>
          </div>

          {/* 3 · Optional note */}
          <textarea
            className="cli-note"
            rows={2}
            placeholder="Anything the SME should know up front? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="cli-modal-f">
          <div className="left">Request from · <b>T. Cooper · VP Eng</b></div>
          <div className="acts">
            <button className="cli-btn cli-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="cli-btn cli-btn-teal" onClick={onSubmit}>Submit request <IcoB.arrow/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Confirmation modal ─────────────────────────────────────────────
function ConfirmModal({ onClose }) {
  const stages = ["Flag", "Match", "Approve", "Onboard", "Active", "Closed"];
  const activeIdx = 1;
  return (
    <div className="cli-modal-overlay" onClick={onClose}>
      <div className="cli-modal confirm" onClick={(e) => e.stopPropagation()}>
        <div className="cli-modal-b">
          <div className="cli-confirm-check"><IcoB.check/></div>
          <div className="cli-confirm-h">Request submitted.</div>
          <div className="cli-confirm-sub">Toptal is matching a certified Kubernetes SME now. You'll see status here and your delivery lead gets notified.</div>
          <div className="cli-confirm-id">REQ · ODT-2614 · 28 MAY 09:42 UTC · 72H SLA</div>

          <div className="cli-mini-stepper">
            <div className="mini-h">
              <span>Lifecycle</span>
              <span className="eta">ETA · WITHIN 4H</span>
            </div>
            <div className="cli-mini-bars">
              {stages.map((_, i) => (
                <div key={i} className={"cli-mini-bar " + (i < activeIdx ? "done" : i === activeIdx ? "active" : "")}/>
              ))}
            </div>
            <div className="cli-mini-labels">
              {stages.map((s, i) => (
                <div key={s} className={"l " + (i < activeIdx ? "done" : i === activeIdx ? "active" : "")}>{s}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="cli-modal-f">
          <div className="left">You can track this in <b>Engineering / Partners / Toptal</b></div>
          <div className="acts">
            <button className="cli-btn cli-btn-teal" onClick={onClose}>Got it</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Composed frames ────────────────────────────────────────────────
function HalyardPortalFrame({ initialState = "eligible" }) {
  const [state, setState] = useState(initialState); // eligible · modal · confirm · active · ineligible
  const isIneligible = state === "ineligible";
  const hasActive = state === "active";
  return (
    <div className="cli">
      <HalyardSidebar/>
      <HalyardDashboard
        ineligible={isIneligible}
        hasActiveRequest={hasActive}
        onClickButton={() => setState("modal")}
      />
      {state === "modal" && <RequestModal onClose={() => setState("eligible")} onSubmit={() => setState("confirm")}/>}
      {state === "confirm" && <ConfirmModal onClose={() => setState("active")}/>}
    </div>
  );
}

function FrameTasoEligible()    { return <HalyardPortalFrame initialState="eligible"/>; }
function FrameTasoModal()       { return <HalyardPortalFrame initialState="modal"/>; }
function FrameTasoConfirm()     { return <HalyardPortalFrame initialState="confirm"/>; }
function FrameTasoActive()      { return <HalyardPortalFrame initialState="active"/>; }
function FrameTasoIneligible()  { return <HalyardPortalFrame initialState="ineligible"/>; }

export {
  FrameTasoEligible, FrameTasoModal, FrameTasoConfirm, FrameTasoActive, FrameTasoIneligible,
  HalyardPortalFrame,
};
