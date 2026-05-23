import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameMgmt } from '../screens/screen5.jsx'
import { PageLayout, StepHeader, NextButton, DesktopFrame } from './shared.jsx'

const MOBILE_KPIS = [
  { label: 'In flight', value: '14', delta: '▲3 vs. last week', deltaColor: 'var(--teal)' },
  { label: 'Awaiting approval', value: '2', delta: '— stable', deltaColor: 'var(--muted)' },
  { label: 'Breach risk', value: '1', delta: '▲1 since 09:00 UTC', deltaColor: 'var(--alert)' },
  { label: 'Median flag → onboard', value: '11h 22m', delta: '▼38% MoM', deltaColor: 'var(--teal)' },
]

const MOBILE_REQUESTS = [
  { initials: 'MR', name: 'Maya Rivera', handle: '@maya', client: 'Halyard Capital', sprint: 'Sprint 14 · day 6', skill: 'Kubernetes · Cluster networking, Ingress', mode: 'Sprint', stage: 'Pending approval', stageColor: '#F59E0B', sla: '62h / 72h', slaPercent: 87, slaDanger: true, canApprove: true },
  { initials: 'AC', name: 'Aaron Chen', handle: '@achen', client: 'Northwind Logistics', sprint: 'Order pipeline · P1', skill: 'Kubernetes · Ingress · burst load', mode: 'Emergency', stage: 'Active · incident', stageColor: 'var(--alert)', sla: '5h / 8h', slaPercent: 64, slaDanger: false, canApprove: false },
  { initials: 'SP', name: 'Sam Park', handle: '@sampark', client: 'Acme Bank', sprint: 'Mobile checkout', skill: 'Postgres · Query plan tuning', mode: 'Sprint', stage: 'Matching', stageColor: 'var(--blue)', sla: '2h 5m / 4h', slaPercent: 52, slaDanger: false, canApprove: false },
  { initials: 'LB', name: 'Lisa Bourne', handle: '@lbourne', client: 'Mistral Studio', sprint: 'Public site rebuild', skill: 'React/Next.js · App router migration', mode: 'Sprint', stage: 'Active', stageColor: 'var(--teal)', sla: '12h / 72h', slaPercent: 18, slaDanger: false, canApprove: false },
  { initials: 'PS', name: 'Priya Sharma', handle: '@priya', client: 'OmniLabs', sprint: 'Type-safety push', skill: 'TypeScript · Conditional types', mode: 'Sprint', stage: 'Matching', stageColor: 'var(--blue)', sla: '38m / 4h', slaPercent: 12, slaDanger: false, canApprove: false },
  { initials: 'KT', name: 'Kai Tanaka', handle: '@kai', client: 'Foxglove Health', sprint: 'Closed May 24', skill: 'Postgres · Replication setup', mode: 'Sprint', stage: 'Closed · Converted', stageColor: 'var(--muted)', sla: 'Met · 38h', slaPercent: 100, slaDanger: false, canApprove: false },
]

function SlaBar({ percent, danger }) {
  const color = danger ? 'var(--alert)' : percent > 60 ? '#F59E0B' : 'var(--teal)'
  return (
    <div style={{ height: 4, background: 'var(--line)', borderRadius: 999, overflow: 'hidden', width: '100%', marginTop: 4 }}>
      <div style={{ height: '100%', width: `${Math.min(percent, 100)}%`, background: color, borderRadius: 999 }} />
    </div>
  )
}

function MobileDashboard() {
  const [approveOpen, setApproveOpen] = useState(false)
  const [approved, setApproved] = useState(false)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {MOBILE_KPIS.map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', lineHeight: 1, marginBottom: 4 }}>{k.value}</div>
            <div style={{ fontSize: 10.5, color: k.deltaColor }}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', paddingLeft: 2 }}>In-flight requests</div>

      {/* Request cards */}
      {MOBILE_REQUESTS.map((r, i) => (
        <div key={i} style={{ background: '#fff', border: `1px solid ${r.canApprove && !approved ? '#F59E0B' : 'var(--line)'}`, borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: r.canApprove ? 'var(--warning-soft)' : 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: r.canApprove ? '#F59E0B' : 'var(--muted)', flexShrink: 0 }}>{r.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{r.name} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--faint)', fontWeight: 400 }}>{r.handle}</span></div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.client} · {r.sprint}</div>
            </div>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999, background: r.stageColor + '1a', color: r.stageColor, whiteSpace: 'nowrap', flexShrink: 0 }}>{r.stage}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 8, paddingLeft: 44 }}>{r.skill}</div>
          <div style={{ paddingLeft: 44 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10.5, color: r.slaDanger ? 'var(--alert)' : 'var(--muted)', fontFamily: 'var(--font-mono)' }}>SLA · {r.sla}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: r.slaDanger ? 'var(--alert)' : 'var(--muted)' }}>{r.slaPercent}%</span>
            </div>
            <SlaBar percent={r.slaPercent} danger={r.slaDanger} />
          </div>
          {r.canApprove && !approved && (
            <button onClick={() => setApproveOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 10, minHeight: 44, background: '#F59E0B', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}>
              Approve engagement
            </button>
          )}
          {r.canApprove && approved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '10px 14px', background: 'var(--clay-soft)', borderRadius: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="var(--teal)"/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--clay-ink)' }}>Approved — onboarding in progress</span>
            </div>
          )}
        </div>
      ))}

      {/* Approve bottom sheet */}
      {approveOpen && (
        <>
          <div onClick={() => setApproveOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(13,29,62,0.4)', zIndex: 200 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201, background: '#fff', borderRadius: '12px 12px 0 0', padding: '24px 20px 32px', boxShadow: '0 -8px 32px rgba(13,29,62,0.18)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Case-by-case approval · ODT-2614</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Approve SME engagement?</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[['SME', 'Aaron Chen · @achen'], ['Skill', 'Kubernetes · Ingress'], ['Duration', '~1 sprint · 4d'], ['Est. cost', '$5,000 · 5d × $1,250']].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--paper)', borderRadius: 6, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--alert-soft)', border: '1px solid #F4C6D2', borderRadius: 6, padding: '8px 12px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--alert)" strokeWidth="1.4"/><path d="M7 4v3.5M7 9.5h.01" stroke="var(--alert)" strokeWidth="1.4" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 12, color: 'var(--alert)', fontWeight: 500 }}>SLA window 62h/72h — breach risk</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setApproveOpen(false)} style={{ flex: 1, minHeight: 44, background: '#fff', border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Decline</button>
              <button onClick={() => { setApproved(true); setApproveOpen(false) }} style={{ flex: 2, minHeight: 44, background: 'var(--teal)', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}>Approve &amp; onboard</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function SprintDashboard() {
  const navigate = useNavigate()
  const { set, reset } = useDemo()

  function restart() {
    reset()
    navigate('/')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Sprint Flow · Step 4 of 4"
        title="Management Dashboard"
        description="Alex Chen — the delivery lead — has full portfolio visibility. One row shows the pending approval from Marcus. SLA tracking across all in-flight requests, with inline approve action."
      />

      {/* Desktop — unchanged */}
      <div className="desktop-only">
        <DesktopFrame width={1380} minHeight={860}>
          <FrameMgmt />
        </DesktopFrame>
      </div>

      {/* Mobile — new */}
      <div className="mobile-only">
        <MobileDashboard />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <NextButton label="View emergency flow →" onClick={() => { reset(); set({ mode: 'emergency', stage: 'flag' }); navigate('/emergency/gap-flag') }} />
        <button
          onClick={restart}
          style={{
            background: 'none', border: '1px solid var(--line)',
            borderRadius: 4, padding: '10px 20px',
            cursor: 'pointer', fontSize: 13, color: 'var(--muted)',
          }}
        >
          ↩ Back to start
        </button>
      </div>
    </PageLayout>
  )
}
