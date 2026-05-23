import React, { useState } from 'react'
import { FrameTasoEligible } from '../screens/screen6.jsx'
import { PageLayout, StepHeader, DesktopFrame } from './shared.jsx'

const BLOCKERS = [
  { id: 'HC-248', label: 'Ingress fails on burst traffic', tags: ['k8s', 'ingress'], assignee: 'MAYA R', priority: 'P1' },
  { id: 'HC-252', label: 'NodePort drains mid-sprint', tags: ['k8s', 'networking'], assignee: 'MAYA R', priority: 'P2' },
  { id: 'HC-258', label: 'Auth token refresh race condition', tags: ['go service'], assignee: 'JONAS', priority: 'P2' },
  { id: 'HC-261', label: 'Helm chart values for staging', tags: ['k8s'], assignee: 'DIEGO', priority: 'P3' },
]

const TEAM = [
  { i: 'MR', n: 'Maya Rivera', r: 'Lead · Berlin' },
  { i: 'JK', n: 'Jonas Kreft', r: 'Backend · Vienna' },
  { i: 'SN', n: 'Sana Noor', r: 'Frontend · Lahore' },
  { i: 'DT', n: 'Diego Toledo', r: 'Platform · São Paulo' },
  { i: 'EL', n: 'Elena Larsen', r: 'Toptal DL · Copenhagen' },
]

function MobileClientPortal() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Client header */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>HC</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>Halyard Capital</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>API Migration · Sprint 14 · Day 6 of 10</div>
        </div>
        <span style={{ fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'var(--clay-soft)', color: 'var(--clay-ink)', whiteSpace: 'nowrap', flexShrink: 0 }}>T. Cooper</span>
      </div>

      {/* Sprint KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'Throughput', value: '68%', sub: '▼38% vs. plan', color: 'var(--alert)' },
          { label: 'Blocked tasks', value: '4', sub: '+2 since Monday', color: 'var(--alert)' },
          { label: 'Open PRs', value: '7', sub: 'Median age 18h', color: 'var(--muted)' },
          { label: 'Budget · sprint', value: '62%', sub: '$24k / $39k', color: 'var(--muted)' },
        ].map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', lineHeight: 1, marginBottom: 4 }}>{k.value}</div>
            <div style={{ fontSize: 10.5, color: k.color }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Sprint burn progress */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)' }}>Sprint burn-down</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Day 6 · TODAY</div>
        </div>
        <div style={{ height: 8, background: 'var(--line)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '60%', background: 'var(--blue)', borderRadius: 999 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>D-1</span>
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>D-10</span>
        </div>
      </div>

      {/* Blockers */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)' }}>Blockers</div>
          <span style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: 'var(--alert-soft)', color: 'var(--alert)' }}>4 OPEN · 2 NEW</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {BLOCKERS.map(b => (
            <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 10px', background: 'var(--paper)', borderRadius: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--muted)', flexShrink: 0, paddingTop: 1 }}>{b.id}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500, marginBottom: 3 }}>{b.label}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {b.tags.map(t => <span key={t} style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', background: 'var(--line-soft)', color: 'var(--muted)', padding: '1px 5px', borderRadius: 3 }}>{t}</span>)}
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--muted)' }}>{b.assignee}</span>
                </div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', padding: '2px 6px', borderRadius: 999, background: b.priority === 'P1' ? 'var(--alert-soft)' : b.priority === 'P2' ? 'var(--warning-soft)' : 'var(--line-soft)', color: b.priority === 'P1' ? 'var(--alert)' : b.priority === 'P2' ? '#8A4D00' : 'var(--muted)', flexShrink: 0 }}>{b.priority}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 10 }}>Team · 5 active</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TEAM.map(p => (
            <div key={p.i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', flexShrink: 0 }}>{p.i}</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--navy)' }}>{p.n}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{p.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Expert Support CTA */}
      {!submitted ? (
        <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '16px 16px 20px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>via Toptal · Well-architected · Certified ✓</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Pull a pre-qualified specialist into this sprint.</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 14 }}>
            2 blockers tagged Kubernetes have been open 5+ days. A Toptal SME can be in your standup by tomorrow — no new placement, no new contract.
          </div>
          <button
            onClick={() => setModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', minHeight: 44, background: 'var(--teal)', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}
          >
            Request Expert Support
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7H11M7.5 3.5L11 7L7.5 10.5"/></svg>
          </button>
        </div>
      ) : (
        <div style={{ background: 'var(--clay-soft)', border: '1px solid var(--clay-line)', borderRadius: 8, padding: '16px 16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="var(--teal)"/><path d="M5.5 9l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>Request submitted.</div>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--clay-ink)', lineHeight: 1.5, marginBottom: 8 }}>Toptal is matching a certified Kubernetes SME. You'll see status here and your delivery lead gets notified.</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--clay-ink)' }}>REQ · ODT-2614 · 28 MAY 09:42 UTC · 72H SLA</div>
        </div>
      )}

      {/* Request modal bottom sheet */}
      {modalOpen && (
        <>
          <div onClick={() => setModalOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(13,29,62,0.4)', zIndex: 200 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201, background: '#fff', borderRadius: '12px 12px 0 0', padding: '24px 20px 32px', boxShadow: '0 -8px 32px rgba(13,29,62,0.18)', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>T</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>Toptal · On-Demand Talent</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Request expert support</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>An SME will be in your sprint within 72 hours — no new placement, certification is the approval.</div>
            <div style={{ background: 'var(--paper)', borderRadius: 6, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>AI-inferred context (read-only)</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600, marginBottom: 3 }}>Skill gap · Kubernetes</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>Cluster networking, Ingress controller under burst load, NodePort drain. Inferred from 4 blocked tasks — HC-241, 248, 252, 261 — open 5–6 days. Velocity 38% below plan.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setModalOpen(false)} style={{ flex: 1, minHeight: 44, background: '#fff', border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Cancel</button>
              <button onClick={() => { setSubmitted(true); setModalOpen(false) }} style={{ flex: 2, minHeight: 44, background: 'var(--teal)', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}>Submit request</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function ClientPortal() {
  return (
    <PageLayout>
      <StepHeader
        step="Surface · Client Portal"
        title="Taso's Button"
        description="The client-facing trigger lives inside Halyard Capital's own project dashboard. Eligibility is gated on the well-architected review. One button calls the entire operating model."
      />

      {/* Desktop — unchanged */}
      <div className="desktop-only">
        <DesktopFrame width={1380} minHeight={860}>
          <FrameTasoEligible />
        </DesktopFrame>
      </div>

      {/* Mobile — new */}
      <div className="mobile-only">
        <MobileClientPortal />
      </div>
    </PageLayout>
  )
}
