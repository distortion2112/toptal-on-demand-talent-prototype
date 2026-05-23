import React, { useState } from 'react'

/* Screen 1 — Gap Flag Interface
   Toptal · On-Demand Talent
   Three states + an interactive live flow. */

// ─── Status bar (mobile shell chrome) ───────────────────────────────
function StatusBar({ time = "9:41" }) {
  return (
    <div className="shell-statusbar">
      <span>{time}</span>
      <div className="icons">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 3.6 A11 11 0 0 1 15 3.6" />
          <path d="M3.2 5.8 A7.5 7.5 0 0 1 12.8 5.8" />
          <path d="M5.4 8 A4 4 0 0 1 10.6 8" />
          <circle cx="8" cy="10" r="0.9" fill="currentColor"/>
        </svg>
        {/* battery */}
        <svg width="26" height="11" viewBox="0 0 26 11" fill="none">
          <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" strokeWidth="1"/>
          <rect x="2" y="2" width="18" height="7" rx="1.3" fill="currentColor"/>
          <rect x="23.5" y="3.5" width="2" height="4" rx="1" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}

// ─── App bar ────────────────────────────────────────────────────────
function AppBar({ engagement = "Halyard Capital · API Migration" }) {
  return (
    <div className="appbar">
      <div className="appbar-left">
        <div>
          <div className="appbar-brand"><span className="dot" />Toptal</div>
          <div className="appbar-sub" style={{ marginTop: 1, fontSize: 10.5 }}>{engagement}</div>
        </div>
      </div>
      <div className="appbar-avatar">MR</div>
    </div>
  );
}

// ─── Tiny icons ─────────────────────────────────────────────────────
const Ico = {
  sparkle: (p) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" {...p}>
      <path d="M6 0 L7 4.5 L11.5 5.5 L7 6.5 L6 11 L5 6.5 L0.5 5.5 L5 4.5 Z" />
    </svg>
  ),
  x: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}>
      <path d="M3 3 L10 10 M10 3 L3 10" />
    </svg>
  ),
  arrow: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7 H11 M7.5 3.5 L11 7 L7.5 10.5"/>
    </svg>
  ),
  check: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7.5 L6 10.5 L11 4"/>
    </svg>
  ),
  blocked: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <circle cx="6.5" cy="6.5" r="5"/>
      <path d="M3 3 L10 10" strokeLinecap="round"/>
    </svg>
  ),
  flag: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" {...p}>
      <path d="M3 2 V11 M3 2 L10 2 L8.2 5 L10 8 L3 8"/>
    </svg>
  ),
  pulse: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M1.5 6.5 H3.5 L4.8 3 L6.8 10 L8 6.5 H11.5"/>
    </svg>
  ),
  back: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10 3 L5 8 L10 13"/>
    </svg>
  ),
  bell: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 9 V6 A3.5 3.5 0 0 1 10 6 V9 L11 10.5 H2 L3 9 Z"/>
      <path d="M5.5 11.5 A1.5 1.5 0 0 0 7.5 11.5"/>
    </svg>
  ),
};

// ─── State A: Dashboard with AI suggestion card ─────────────────────
function StateA({ onFlagIt, onDismiss }) {
  return (
    <>
      <StatusBar />
      <AppBar />

      <div className="page-head">
        <div className="greeting">Tuesday, May 26</div>
        <h1 className="h1">Sprint 14 <em>· Day 6 of 10</em></h1>
      </div>

      {/* AI Suggestion — the hero moment */}
      <div className="section-label">
        <span>Suggested for you</span>
        <span className="right">Detected 4m ago</span>
      </div>
      <div className="sugg">
        <div className="sugg-bar" />
        <div className="sugg-head">
          <div className="sugg-eyebrow"><span className="pulse" />AI noticed for you</div>
          <button className="sugg-dismiss" onClick={onDismiss} aria-label="Dismiss"><Ico.x/></button>
        </div>
        <div className="sugg-body">
          <div className="sugg-title">
            4 tasks tagged <span className="skill">Kubernetes</span> have been blocked for <b>6 days</b>. Want to flag this for SME support?
          </div>
          <div className="sugg-meta">
            <div className="sugg-meta-cell">
              <div className="sugg-meta-k">Signal</div>
              <div className="sugg-meta-v">Velocity ↓ 38%</div>
            </div>
            <div className="sugg-meta-cell">
              <div className="sugg-meta-k">Coverage gap</div>
              <div className="sugg-meta-v">k8s · ingress</div>
            </div>
            <div className="sugg-meta-cell">
              <div className="sugg-meta-k">Affected</div>
              <div className="sugg-meta-v">HC-241 · 248 · 252 · 261</div>
            </div>
            <div className="sugg-meta-cell">
              <div className="sugg-meta-k">Est. SME match</div>
              <div className="sugg-meta-v">3 in network</div>
            </div>
          </div>
        </div>
        <div className="sugg-actions">
          <button className="btn btn-quiet btn-block" onClick={onDismiss}>Not now</button>
          <button className="btn btn-clay btn-block" onClick={onFlagIt}>
            Flag it <Ico.arrow/>
          </button>
        </div>
      </div>

      {/* Sprint at a glance */}
      <div className="section-label">
        <span>Today</span>
      </div>
      <div className="card">
        <div className="list-row">
          <div className="glyph blocked"><Ico.blocked/></div>
          <div>
            <div className="title">HC-248 · Ingress fails on burst traffic</div>
            <div className="sub">Blocked 6d · waiting on k8s expertise</div>
          </div>
          <div className="meta">P1</div>
        </div>
        <div className="list-row">
          <div className="glyph blocked"><Ico.blocked/></div>
          <div>
            <div className="title">HC-252 · NodePort drains mid-sprint</div>
            <div className="sub">Blocked 5d</div>
          </div>
          <div className="meta">P2</div>
        </div>
        <div className="list-row">
          <div className="glyph live"><Ico.pulse/></div>
          <div>
            <div className="title">HC-258 · Auth token refresh</div>
            <div className="sub">In review · Marcus</div>
          </div>
          <div className="meta">P2</div>
        </div>
        <div className="list-row">
          <div className="glyph done"><Ico.check/></div>
          <div>
            <div className="title">HC-244 · Migrate user table</div>
            <div className="sub">Closed yesterday</div>
          </div>
          <div className="meta">—</div>
        </div>
      </div>

      <div className="spacer" />
    </>
  );
}

// ─── State B: Pre-filled request form ───────────────────────────────
function StateB({ onBack, onSubmit, initialMode = "sprint" }) {
  const [mode, setMode] = useState(initialMode);
  const [start, setStart] = useState("asap");
  const [urgency, setUrgency] = useState(
    "Two more tasks are likely to land on the same surface this sprint. Pairing with our backend lead would be ideal — they're in CET."
  );

  return (
    <div className="sheet">
      <StatusBar />
      <div className="sheet-head">
        <button className="btn btn-quiet" onClick={onBack} style={{ padding: "4px 6px", marginLeft: -6 }}>
          <Ico.back/> Back
        </button>
        <div className="sheet-title">Request SME Support</div>
        <div style={{ width: 56 }} />
      </div>

      <div className="sheet-body">
        {/* Skill gap — AI populated */}
        <div className="field">
          <div className="field-label">
            <span>Skill gap</span>
            <span className="ai-chip"><Ico.sparkle style={{ marginRight: 3 }}/> AI-FILLED</span>
          </div>
          <div className="field-readonly">
            <button className="edit">Edit</button>
            <span className="skill-inline">Kubernetes</span> — cluster networking, Ingress controller behaviour under burst load, NodePort drain.
          </div>
          <div className="field-help">Inferred from 4 blocked tasks · HC-241, 248, 252, 261</div>
        </div>

        {/* Mode toggle */}
        <div className="field">
          <div className="field-label"><span>Support mode</span></div>
          <div className="mode" role="tablist">
            <button
              className={"mode-opt" + (mode === "sprint" ? " active" : "")}
              role="tab" aria-selected={mode === "sprint"}
              onClick={() => setMode("sprint")}>
              <span className="name">Full Sprint</span>
              <span className="sla">72H ONBOARDING SLA</span>
            </button>
            <button
              className={"mode-opt emergency" + (mode === "emergency" ? " active" : "")}
              role="tab" aria-selected={mode === "emergency"}
              onClick={() => setMode("emergency")}>
              <span className="name">Emergency</span>
              <span className="sla">8H · PROD OUTAGE</span>
            </button>
          </div>
          <div className="field-help">
            {mode === "sprint"
              ? "An SME pairs with the team for the remainder of the sprint."
              : "For production outages only. Routes to on-call certified SMEs immediately."}
          </div>
        </div>

        {/* Urgency notes */}
        <div className="field">
          <div className="field-label"><span>Notes <span style={{ color: "var(--faint)", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>· optional</span></span></div>
          <textarea
            className="field-text"
            rows={3}
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            placeholder="Anything the SME should know up front?"
          />
        </div>

        {/* Preferred start */}
        <div className="field">
          <div className="field-label"><span>Preferred start</span></div>
          <div className="start-opts">
            {["asap", "tomorrow", "monday", "pick"].map((k) => (
              <button
                key={k}
                className={"start-opt" + (start === k ? " active" : "")}
                onClick={() => setStart(k)}>
                {k === "asap" ? "As soon as possible"
                  : k === "tomorrow" ? "Tomorrow AM"
                  : k === "monday" ? "Next Monday"
                  : "Pick a date…"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      <div className="sheet-foot">
        <div className="submit-summary">
          <span>You · <b>Maya R.</b></span>
          <span>Engagement · <b>Halyard Capital</b></span>
        </div>
        <button className={"btn " + (mode === "emergency" ? "btn-clay" : "btn-primary") + " btn-lg btn-block"} style={{ width: "100%" }} onClick={() => onSubmit({ mode, start })}>
          {mode === "emergency" ? "Request emergency SME" : "Request SME support"} <Ico.arrow/>
        </button>
      </div>
    </div>
  );
}

// ─── Lifecycle stepper ──────────────────────────────────────────────
function LifecycleStepper({ stage = 1 }) {
  const stages = ["Flag", "Match", "Approve", "Onboard", "Active", "Closed"];
  return (
    <div className="stepper">
      <div className="stepper-h">
        <div className="name">Lifecycle</div>
        <div className="eta">{stage === 1 ? "ETA · within 4h" : ""}</div>
      </div>
      <div className="steps">
        {stages.map((_, i) => (
          <div key={i} className={"step-bar " + (i < stage ? "done" : i === stage ? "active" : "")} />
        ))}
      </div>
      <div className="step-labels">
        {stages.map((s, i) => (
          <div key={s} className={"step-label " + (i < stage ? "done" : i === stage ? "active" : "")}>{s}</div>
        ))}
      </div>

      <div className="stepper-detail">
        <div className="marker" />
        <div className="text">
          <div className="l1">Matching — searching pre-qualified network</div>
          <div className="l2">3 certified SMEs identified · we're pinging them now. You'll get a push the moment one accepts.</div>
        </div>
      </div>
    </div>
  );
}

// ─── State C: Confirmation + Stepper ────────────────────────────────
function StateC({ onContinue }) {
  return (
    <>
      <StatusBar />
      <AppBar />

      <div className="confirm">
        <div className="confirm-check"><Ico.check/></div>
        <div className="confirm-h">Request submitted.</div>
        <div className="confirm-sub">We're matching you to a certified Kubernetes SME now.</div>
        <div className="confirm-id">REQ · ODT-2614 · MAY 26, 09:42</div>
      </div>

      <LifecycleStepper stage={1} />

      <div className="notify">
        <div style={{ color: "var(--ink-2)", marginTop: 1 }}><Ico.bell/></div>
        <div className="b">
          <b>You'll get a push</b> when an SME accepts. No further action needed unless the system asks for approval.
        </div>
      </div>

      {onContinue && (
        <div style={{ padding: "16px 18px 24px" }}>
          <button
            onClick={onContinue}
            style={{
              width: "100%", padding: "12px",
              background: "var(--teal)", color: "#fff",
              border: "none", borderRadius: "var(--radius-sm)",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            See SME request <Ico.arrow/>
          </button>
        </div>
      )}
    </>
  );
}

// ─── Live interactive flow (state machine) ──────────────────────────
function LiveFlow({ onComplete }) {
  const [state, setState] = useState("A"); // A · B · C
  const [resetKey, setResetKey] = useState(0);

  // Tiny reset chip in the corner
  return (
    <div className="cad shell" style={{ position: "relative", overflowY: "auto" }}>
      {state === "A" && (
        <StateA
          onFlagIt={() => setState("B")}
          onDismiss={() => {/* in live flow we keep card to demo */}}
        />
      )}
      {state === "B" && (
        <StateB onBack={() => setState("A")} onSubmit={() => setState("C")} />
      )}
      {state === "C" && <StateC key={resetKey} onContinue={onComplete} />}

      {/* Reset chip */}
      <button
        onClick={() => { setState("A"); setResetKey((k) => k + 1); }}
        title="Restart flow"
        style={{
          position: "absolute",
          right: 12, bottom: 12,
          background: "var(--ink)",
          color: "var(--paper)",
          border: "none",
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.06em",
          padding: "6px 10px",
          cursor: "pointer",
          boxShadow: "var(--shadow-pop)",
          textTransform: "uppercase",
        }}>
        ↻ Restart
      </button>
    </div>
  );
}

// ─── Static frame wrappers for the static artboards ─────────────────
function FrameA() {
  return <div className="cad shell"><StateA onFlagIt={() => {}} onDismiss={() => {}} /></div>;
}
function FrameB() {
  return <div className="cad shell"><StateB onBack={() => {}} onSubmit={() => {}} /></div>;
}
function FrameC() {
  return <div className="cad shell"><StateC /></div>;
}

export { FrameA, FrameB, FrameC, LiveFlow };
