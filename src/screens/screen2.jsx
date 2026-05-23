import React, { useState, useEffect } from 'react'

/* Screen 2 — Active Engagement Request Card (SME side)
   Sprint variant + Emergency variant + Propose Time state + SME inbox context. */

// ─── Icons ──────────────────────────────────────────────────────────
const Ico2 = {
  clock: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...p}>
      <circle cx="6.5" cy="6.5" r="5"/>
      <path d="M6.5 3.5 V6.5 L8.5 8"/>
    </svg>
  ),
  zap: (p) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" {...p}>
      <path d="M7 1 L2 7 L5.5 7 L4.5 11 L10 5 L6.5 5 Z"/>
    </svg>
  ),
  doc: (p) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" {...p}>
      <path d="M3 1.5 H8 L10.5 4 V11.5 H3 Z"/>
      <path d="M8 1.5 V4 H10.5"/>
      <path d="M5 7 H8.5 M5 9 H8.5"/>
    </svg>
  ),
  warn: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}>
      <path d="M7 1.5 L13 12 H1 Z"/>
      <path d="M7 5.5 V8.5 M7 10 V10.5"/>
    </svg>
  ),
  link: (p) => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" {...p}>
      <path d="M5.5 3 L8 0.5 A1.5 1.5 0 0 1 10.5 3 L8 5.5"/>
      <path d="M5.5 8 L3 10.5 A1.5 1.5 0 0 1 0.5 8 L3 5.5"/>
      <path d="M4 7 L7 4"/>
    </svg>
  ),
};

// ─── Live countdown hook ────────────────────────────────────────────
function useCountdown(initialSeconds) {
  const [left, setLeft] = useState(initialSeconds);
  useEffect(() => {
    if (left <= 0) return;
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [left]);
  return left;
}

function formatHMS(total) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Sprint Support Request Card ────────────────────────────────────
function SprintRequestCard({ standalone = true, onAccept, onDecline, onPropose }) {
  const left = useCountdown(3 * 3600 + 42 * 60);
  return (
    <div className="req">
      <div className="req-stripe" />

      <div className="req-head">
        <div className="req-eyebrow">
          <span className="badge sprint">Sprint Support</span>
          <span className="req-id">REQ · ODT-2614</span>
        </div>
        <div className="req-timer">
          <span className="lbl">Respond in</span>
          <span className="val">{formatHMS(left)}</span>
        </div>
      </div>

      <div className="req-headline">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="badge match">● Match · 96%</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            You're available · Next 2 sprints
          </span>
        </div>
        <div className="skills">
          React <span className="slash">/</span> Next.js
        </div>
        <div className="for">
          For <b>Halyard Capital · API Migration</b> · pairing with Maya R. (lead)
        </div>
      </div>

      <div className="req-meta">
        <div className="req-meta-cell">
          <div className="req-meta-k">Start</div>
          <div className="req-meta-v">ASAP · Tue 9am CET</div>
        </div>
        <div className="req-meta-cell">
          <div className="req-meta-k">Duration</div>
          <div className="req-meta-v">~1 sprint · 4 days</div>
        </div>
        <div className="req-meta-cell">
          <div className="req-meta-k">Onboarding</div>
          <div className="req-meta-v mono">72H · pkg ready</div>
        </div>
        <div className="req-meta-cell">
          <div className="req-meta-k">Day rate</div>
          <div className="req-meta-v mono">$1,250 · 5d est.</div>
        </div>
      </div>

      <div className="req-note">
        <div className="ico"><Ico2.doc/></div>
        <div>
          <b>Onboarding brief ready.</b> 72 hours to full context — client overview, team roster, sprint goals, and a Day-1 checklist. You'll get repo + Slack access on accept.
        </div>
      </div>

      <div style={{ padding: "14px 22px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 11.5, color: "var(--muted)" }}>You'd join:</span>
        <div className="avatars">
          <div className="a">MR</div>
          <div className="a a2">JK</div>
          <div className="a a3">SN</div>
          <div className="a a4">+2</div>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--faint)", letterSpacing: "0.04em" }}>5-person team</span>
      </div>

      <div className="req-actions">
        <button className="btn btn-primary primary" onClick={onAccept}>Accept</button>
        <button className="btn btn-ghost alt" onClick={onPropose}>Propose different time</button>
        <button className="btn btn-quiet alt" onClick={onDecline}>Decline</button>
      </div>
    </div>
  );
}

// ─── Emergency Request Card ─────────────────────────────────────────
function EmergencyRequestCard({ onAccept, onDecline }) {
  const left = useCountdown(47 * 60 + 12); // 47:12 to make urgency tangible

  return (
    <div className="req">
      <div className="req-stripe emergency" />

      <div className="req-head">
        <div className="req-eyebrow">
          <span className="badge emergency">Emergency · P1</span>
          <span className="req-id">REQ · ODT-2621 · ISSUED 09:14 UTC</span>
        </div>
        <div className="req-timer emergency">
          <span className="lbl">SLA window</span>
          <span className="val">{formatHMS(left)}</span>
        </div>
      </div>

      <div className="req-headline emergency">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="badge match" style={{ background: "var(--alert-soft)", color: "var(--alert)", borderColor: "oklch(88% 0.08 25)" }}>● Match · 91%</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--alert)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            On-call · pre-authorized
          </span>
        </div>
        <div className="skills">
          Kubernetes <span className="slash">/</span> Ingress
        </div>
        <div className="for">
          For <b>Northwind Logistics · Order Pipeline</b> · production outage in progress
        </div>
      </div>

      <div className="outage-cells">
        <div className="outage-cell">
          <div className="k">What's broken</div>
          <div className="v">Ingress controller drops 30% of order-pipeline traffic under burst load since 08:51 UTC.</div>
        </div>
        <div className="outage-cell">
          <div className="k">What changed last</div>
          <div className="v">Deploy <span style={{ fontFamily: "var(--font-mono)" }}>v4.18.2</span> · 07:42 UTC · NGINX config patch.</div>
        </div>
        <div className="outage-cell">
          <div className="k">On-call lead</div>
          <div className="v">Aaron Chen · SRE · <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--muted)" }}>@achen</span></div>
        </div>
        <div className="outage-cell">
          <div className="k">Onboarding</div>
          <div className="v mono">8H SLA · condensed context ready</div>
        </div>
      </div>

      <div className="req-note emergency">
        <div className="ico"><Ico2.warn/></div>
        <div>
          <b>This is a P1 production incident.</b> Condensed outage brief, runbooks, and Slack war-room access route to you on accept. Certification is the approval — no second step.
        </div>
      </div>

      <div className="req-actions">
        <button className="btn btn-clay primary" style={{ background: "var(--alert)" }} onClick={onAccept}>
          <Ico2.zap style={{ marginRight: 2 }}/> Accept immediately
        </button>
        <button className="btn btn-ghost alt" onClick={onDecline}>Decline</button>
      </div>
    </div>
  );
}

// ─── Propose Different Time — Sprint variant alt state ─────────────
function ProposerCard({ onBack, onConfirm }) {
  const [slot, setSlot] = useState("thu-am");
  const left = useCountdown(3 * 3600 + 35 * 60);

  const slots = [
    { id: "wed-pm", d: "Wed", t: "14:00 CET" },
    { id: "thu-am", d: "Thu", t: "09:00 CET" },
    { id: "thu-pm", d: "Thu", t: "15:00 CET" },
    { id: "fri-am", d: "Fri", t: "09:00 CET" },
    { id: "mon-am", d: "Mon", t: "09:00 CET" },
    { id: "custom", d: "Pick…", t: "Custom" },
  ];

  return (
    <div className="req">
      <div className="req-stripe" />

      <div className="req-head">
        <div className="req-eyebrow">
          <span className="badge sprint">Sprint Support</span>
          <span className="req-id">REQ · ODT-2614</span>
        </div>
        <div className="req-timer">
          <span className="lbl">Respond in</span>
          <span className="val">{formatHMS(left)}</span>
        </div>
      </div>

      <div className="req-headline">
        <div className="skills" style={{ fontSize: 22 }}>
          React <span className="slash">/</span> Next.js
        </div>
        <div className="for">
          For <b>Halyard Capital</b> · client requested ASAP · Tue 9am CET
        </div>
      </div>

      <div className="proposer">
        <div className="proposer-h">Propose a different start time</div>
        <div className="proposer-sub">Request stays in <b>Matching</b> until the lead confirms. Pick the earliest slot you can commit to.</div>
        <div className="slot-row">
          {slots.map((s) => (
            <button
              key={s.id}
              className={"slot" + (slot === s.id ? " active" : "")}
              onClick={() => setSlot(s.id)}>
              <span className="d">{s.d}</span>
              <span className="t">{s.t}</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
          Optional note to the lead
        </div>
        <textarea
          className="field-text"
          rows={2}
          placeholder="e.g. Wrapping up another sprint Wed AM — Thu 9am is clean."
          defaultValue="Wrapping up another sprint Wed AM. Thursday 9am is clean and I can do full days."
        />
      </div>

      <div className="req-actions">
        <button className="btn btn-primary primary" onClick={onConfirm}>Send proposal</button>
        <button className="btn btn-quiet alt" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

// ─── SME Inbox (context) ────────────────────────────────────────────
function SMEInbox() {
  return (
    <div className="cad inbox">
      <aside className="inbox-side">
        <div className="brand"><span className="dot"/>Toptal · SME</div>

        <div className="nav-section">Workspace</div>
        <div className="nav-link active">
          <span>Active requests</span>
          <span className="ct">2</span>
        </div>
        <div className="nav-link">
          <span>Availability</span>
        </div>
        <div className="nav-link">
          <span>Engagements</span>
          <span className="ct">12</span>
        </div>

        <div className="nav-section">Certifications</div>
        <div className="nav-link">
          <span>React / Next.js</span>
          <span className="ct" style={{ background: "var(--success-soft)", color: "var(--success)" }}>✓</span>
        </div>
        <div className="nav-link">
          <span>Kubernetes</span>
          <span className="ct" style={{ background: "var(--success-soft)", color: "var(--success)" }}>✓</span>
        </div>
        <div className="nav-link">
          <span>Postgres tuning</span>
          <span className="ct">38%</span>
        </div>

        <div style={{ flex: 1 }}/>
        <div style={{ padding: "12px 6px", borderTop: "1px solid var(--line-soft)", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="appbar-avatar" style={{ width: 26, height: 26 }}>AC</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Aaron Chen</div>
            <div style={{ fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>3 ENGAGEMENTS · BERLIN</div>
          </div>
        </div>
      </aside>

      <main className="inbox-main">
        <div className="inbox-h">
          <div className="title">Active requests</div>
          <div className="right">2 PENDING · UPDATED 1s AGO</div>
        </div>
        <div className="inbox-sub">Pre-qualified matches the network routed to you. Accept moves you straight to onboarding — certification is the approval.</div>

        <div className="you-status">
          <span className="dot"/>
          <div className="t"><b>Available</b> · next 2 sprints · CET working hours</div>
          <div className="right">CHANGE</div>
        </div>

        <div className="inbox-stack">
          <EmergencyRequestCard />
          <SprintRequestCard />
        </div>
      </main>
    </div>
  );
}

// ─── Frames for static artboards ────────────────────────────────────
function FrameSprint() {
  return (
    <div className="cad" style={{ padding: 28, background: "var(--paper)", height: "100%", boxSizing: "border-box" }}>
      <SprintRequestCard />
    </div>
  );
}
function FrameEmergency() {
  return (
    <div className="cad" style={{ padding: 28, background: "var(--paper)", height: "100%", boxSizing: "border-box" }}>
      <EmergencyRequestCard />
    </div>
  );
}
function FrameProposer() {
  return (
    <div className="cad" style={{ padding: 28, background: "var(--paper)", height: "100%", boxSizing: "border-box" }}>
      <ProposerCard onBack={() => {}} onConfirm={() => {}} />
    </div>
  );
}
function FrameInbox() {
  return <div className="cad" style={{ height: "100%" }}><SMEInbox /></div>;
}

export { FrameSprint, FrameEmergency, FrameProposer, FrameInbox };
