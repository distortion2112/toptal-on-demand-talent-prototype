import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameBrief } from '../screens/screen3.jsx'
import { PageLayout, StepHeader, NextButton, DesktopFrame } from './shared.jsx'

const SECTIONS = [
  {
    num: '01', label: 'Client Overview',
    content: (
      <>
        <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>
          <strong style={{ color: 'var(--navy)' }}>Halyard Capital</strong> — NYC-based quantitative trading firm, Series A, 42 FTE.
          Migrating from a monolithic Python API to a Go service mesh. Legacy caps at ~120 req/s; target is 4,000 req/s by September.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['Industry', 'Quantitative trading'], ['Engagement', '14 months · extended'], ['Stack', 'Go · K8s · Postgres'], ['Location', 'NYC (remote-first)']].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--paper)', borderRadius: 6, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    num: '02', label: 'Your Team',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { i: 'MR', n: 'Maya Rivera', r: 'Lead engineer · Berlin', you: false },
          { i: 'AC', n: 'Aaron Chen', r: 'SME · Kubernetes/Ingress · Berlin', you: true },
          { i: 'JK', n: 'Jonas Kreft', r: 'Backend · Go services · Vienna', you: false },
          { i: 'SN', n: 'Sana Noor', r: 'Frontend · Next.js · Lahore', you: false },
          { i: 'DT', n: 'Diego Toledo', r: 'Platform · SRE · São Paulo', you: false },
          { i: 'EL', n: 'Elena Larsen', r: 'Delivery lead · Toptal · Copenhagen', you: false },
        ].map(p => (
          <div key={p.i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: p.you ? 'var(--clay-soft)' : 'var(--paper)', borderRadius: 6, border: p.you ? '1px solid var(--clay-line)' : '1px solid transparent' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.you ? 'var(--teal)' : 'var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: p.you ? '#fff' : 'var(--muted)', flexShrink: 0 }}>{p.i}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {p.n}
                {p.you && <span style={{ fontSize: 9.5, fontWeight: 700, background: 'var(--teal)', color: '#fff', padding: '1px 6px', borderRadius: 999 }}>YOU</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{p.r}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '03', label: 'Sprint Goals',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { badge: 'DONE', color: 'var(--teal)', label: 'Migrate user-auth surface to Go service' },
          { badge: 'BLOCKED 6D', color: 'var(--alert)', label: 'Get ingress stable under burst load (HC-248, HC-252) — 30% drop at peak' },
          { badge: 'IN PROGRESS', color: 'var(--amber-warn)', label: 'Cut over order-pipeline reads to new service (behind feature flag)' },
          { badge: 'UPCOMING', color: 'var(--muted)', label: 'Decommission legacy Python /v1/orders endpoint' },
        ].map((g, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'var(--paper)', borderRadius: 6 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 7px', borderRadius: 999, background: g.color, color: '#fff', whiteSpace: 'nowrap', marginTop: 1, flexShrink: 0 }}>{g.badge}</span>
            <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{g.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '04', label: 'Domain Context',
    content: (
      <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)' }}>
        <p style={{ margin: '0 0 10px' }}>Halyard runs a <strong>quantitative trading platform</strong> handling live order execution for institutional clients. Latency is mission-critical — sub-5ms p99 on the hot path.</p>
        <p style={{ margin: '0 0 10px' }}>The Go migration is replacing a Python monolith. The <strong>Ingress layer (Kong/nginx)</strong> is the current bottleneck — NodePort drain under burst causes a 30% error spike.</p>
        <p style={{ margin: 0 }}>Stack: <code style={{ background: 'var(--line-soft)', padding: '1px 5px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>Go · K8s 1.27 · Kong · Postgres 15 · Grafana</code></p>
      </div>
    ),
  },
  {
    num: '05', label: 'Working Norms',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['Standup', 'Daily · 10:00 CET · 30 min · Hangouts · async OK'],
          ['Decisions', 'Lightweight RFC process'],
          ['Comms', 'Slack · #eng-halyard · @here for blockers only'],
          ['Code review', '≥1 approver within 4h'],
          ['Culture', 'Direct, written-first (long Slack threads > meetings)'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, padding: '8px 10px', background: 'var(--paper)', borderRadius: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--teal)', whiteSpace: 'nowrap', minWidth: 80, paddingTop: 1 }}>{k}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{v}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '06', label: 'Quick Start',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['Accept invite to Halyard GitHub org', 'OPEN INVITE'],
          ['Join Slack channel #eng-halyard', 'JOIN'],
          ['30-min sync with Maya (lead) — Today 16:00 CET', 'RSVP'],
          ['Skim Domain Context section above', 'OPEN'],
          ['Pick up HC-248 (Ingress fails on burst)', 'ASSIGN'],
        ].map(([label, action], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--paper)', borderRadius: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)' }}>{i + 1}</span>
            </div>
            <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4 }}>{label}</div>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 7px', borderRadius: 999, background: 'var(--clay-soft)', color: 'var(--clay-ink)', whiteSpace: 'nowrap', flexShrink: 0 }}>{action}</span>
          </div>
        ))}
      </div>
    ),
  },
]

function MobileOnboardingBrief({ onAdvance }) {
  const [activeSection, setActiveSection] = useState(0)

  return (
    <div style={{ width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Section tab strip — horizontally scrollable */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', gap: 6, paddingBottom: 4, scrollbarWidth: 'none', minWidth: 0, width: '100%' }}>
        {SECTIONS.map((s, i) => (
          <button
            key={s.num}
            onClick={() => setActiveSection(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              height: 44, padding: '0 14px', borderRadius: 6, cursor: 'pointer',
              border: `1px solid ${activeSection === i ? 'var(--teal)' : 'var(--line)'}`,
              background: activeSection === i ? 'var(--clay-soft)' : '#fff',
              color: activeSection === i ? 'var(--clay-ink)' : 'var(--muted)',
              fontSize: 12, fontWeight: activeSection === i ? 600 : 400,
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.12s',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', color: activeSection === i ? 'var(--teal)' : 'var(--faint)' }}>{s.num}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Active section body */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid var(--line)', padding: '16px 16px 20px', marginTop: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>
          {SECTIONS[activeSection].num} · {SECTIONS[activeSection].label}
        </div>
        {SECTIONS[activeSection].content}
      </div>

      {/* AI metadata strip */}
      <div style={{ background: 'var(--clay-soft)', borderRadius: 6, padding: '10px 14px', marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="var(--teal)" strokeWidth="1.4"/>
          <path d="M7 4v3.5L9 9" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 11.5, color: 'var(--clay-ink)' }}>AI-generated · valid 72h · refreshes May 28 · Halyard Capital</span>
      </div>
    </div>
  )
}

export default function SprintOnboarding() {
  const navigate = useNavigate()
  const { set } = useDemo()

  function advance() {
    set({ stage: 'approve' })
    navigate('/sprint/dashboard')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Sprint Flow · Step 3 of 4"
        title="SME Onboarding Brief"
        description="The moment Priya accepts, an AI-generated context package is ready. Full engagement picture — team, sprint goals, domain context, working norms — in one scannable document."
      />

      {/* Desktop — unchanged */}
      <div className="desktop-only">
        <DesktopFrame width={1280} minHeight={900}>
          <FrameBrief />
        </DesktopFrame>
      </div>

      {/* Mobile — new */}
      <div className="mobile-only">
        <MobileOnboardingBrief />
      </div>

      <NextButton label="View delivery lead dashboard →" onClick={advance} />
    </PageLayout>
  )
}
