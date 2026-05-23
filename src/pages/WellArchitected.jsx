import React, { useState } from 'react'
import { FrameWarNexus, FrameWarMeridian, FrameWarThornfield } from '../screens/screen7.jsx'
import { PageLayout, StepHeader, DesktopFrame } from './shared.jsx'

const CLIENTS = [
  { key: 'nexus', label: 'Nexus Capital — Partially Ready', shortLabel: 'Nexus Capital', badge: 'PENDING', badgeColor: '#F59E0B' },
  { key: 'meridian', label: 'Meridian Health — Fully Eligible', shortLabel: 'Meridian Health', badge: 'ELIGIBLE', badgeColor: '#07947C' },
  { key: 'thornfield', label: 'Thornfield Logistics — Not Eligible', shortLabel: 'Thornfield Logistics', badge: 'NOT ELIGIBLE', badgeColor: '#D42551' },
]

const MOBILE_DATA = {
  nexus: {
    status: 'PENDING',
    statusColor: '#F59E0B',
    statusBg: '#FEF3DB',
    blocking: '1 blocking condition',
    summary: 'Platform Readiness, Engagement Maturity, and Cert Checklist all pass. One failing condition in Security & Compliance is blocking eligibility.',
    categories: [
      { name: 'Platform Readiness', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'PR-1', label: 'AI platform deployed and reachable', status: 'pass' },
        { code: 'PR-2', label: 'M1 Connector operational', status: 'pass' },
        { code: 'PR-3', label: 'M3 Curation Engine operational', status: 'pass' },
        { code: 'PR-4', label: 'M4 Vector Store provisioned and indexed', status: 'pass' },
        { code: 'PR-5', label: 'M5 Retrieval API within SLA', status: 'pass' },
        { code: 'PR-6', label: 'Tenant isolation verified', status: 'pass' },
      ]},
      { name: 'Security & Compliance', gate: 'FAIL', gateColor: '#D42551', conditions: [
        { code: 'SC-1', label: 'Security threat model completed', status: 'pass' },
        { code: 'SC-2', label: 'Data classification schema configured', status: 'pass' },
        { code: 'SC-3', label: 'M8 Governance module operational', status: 'pass' },
        { code: 'SC-4', label: 'PII classification enabled and validated', status: 'pass' },
        { code: 'SC-5', label: 'Credential / secrets scan clean — 2 findings unresolved', status: 'fail' },
      ]},
      { name: 'Engagement Maturity', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'EM-1', label: 'Engagement capability profile — Tier P3', status: 'pass' },
        { code: 'EM-2', label: 'Engagement tenure — 8 months', status: 'pass' },
        { code: 'EM-3', label: 'SLA baseline established', status: 'pass' },
        { code: 'EM-4', label: 'Observability active — Grafana + Langfuse', status: 'pass' },
        { code: 'EM-5', label: 'Incident response process documented', status: 'pass' },
      ]},
      { name: 'Certification Checklist', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'CC-1', label: 'Client submits well-architected assessment', status: 'pass' },
        { code: 'CC-2', label: 'Review team assigned', status: 'pass' },
        { code: 'CC-3', label: 'Conditions reviewed and scored', status: 'pass' },
        { code: 'CC-4', label: 'Remediation plan accepted by client', status: 'pass' },
        { code: 'CC-5', label: 'Final sign-off', status: 'pass' },
        { code: 'CC-6', label: 'Certificate issued', status: 'pass' },
      ]},
    ],
  },
  meridian: {
    status: 'ELIGIBLE',
    statusColor: '#07947C',
    statusBg: '#E5F5F1',
    blocking: 'Fully certified',
    summary: 'All 4 categories pass. Certification ID WAR-MH-2024-003. On-demand talent is enabled.',
    categories: [
      { name: 'Platform Readiness', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'PR-1', label: 'AI platform deployed and reachable', status: 'pass' },
        { code: 'PR-2', label: 'M1 Connector operational', status: 'pass' },
        { code: 'PR-3', label: 'M3 Curation Engine operational', status: 'pass' },
        { code: 'PR-4', label: 'M4 Vector Store provisioned', status: 'pass' },
        { code: 'PR-5', label: 'M5 Retrieval API within SLA', status: 'pass' },
        { code: 'PR-6', label: 'Tenant isolation verified', status: 'pass' },
      ]},
      { name: 'Security & Compliance', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'SC-1', label: 'Security threat model completed', status: 'pass' },
        { code: 'SC-2', label: 'Data classification schema configured', status: 'pass' },
        { code: 'SC-3', label: 'M8 Governance module operational', status: 'pass' },
        { code: 'SC-4', label: 'PII classification enabled', status: 'pass' },
        { code: 'SC-5', label: 'Credential / secrets scan clean', status: 'pass' },
      ]},
      { name: 'Engagement Maturity', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'EM-1', label: 'Engagement capability profile', status: 'pass' },
        { code: 'EM-2', label: 'Engagement tenure', status: 'pass' },
        { code: 'EM-3', label: 'SLA baseline established', status: 'pass' },
        { code: 'EM-4', label: 'Observability active', status: 'pass' },
        { code: 'EM-5', label: 'Incident response process documented', status: 'pass' },
      ]},
      { name: 'Certification Checklist', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'CC-1', label: 'Well-architected assessment submitted', status: 'pass' },
        { code: 'CC-2', label: 'Review team assigned', status: 'pass' },
        { code: 'CC-3', label: 'Conditions reviewed and scored', status: 'pass' },
        { code: 'CC-6', label: 'Certificate issued', status: 'pass' },
      ]},
    ],
  },
  thornfield: {
    status: 'NOT ELIGIBLE',
    statusColor: '#D42551',
    statusBg: '#FCE6EC',
    blocking: '4 failing conditions',
    summary: '3 of 4 categories failing. Platform Readiness and Security have multiple unmet conditions. Roadmap to eligibility available.',
    categories: [
      { name: 'Platform Readiness', gate: 'FAIL', gateColor: '#D42551', conditions: [
        { code: 'PR-1', label: 'AI platform deployed and reachable', status: 'fail' },
        { code: 'PR-2', label: 'M1 Connector operational', status: 'fail' },
        { code: 'PR-3', label: 'M3 Curation Engine operational', status: 'idle' },
        { code: 'PR-4', label: 'M4 Vector Store provisioned', status: 'idle' },
        { code: 'PR-5', label: 'M5 Retrieval API within SLA', status: 'idle' },
        { code: 'PR-6', label: 'Tenant isolation verified', status: 'idle' },
      ]},
      { name: 'Security & Compliance', gate: 'FAIL', gateColor: '#D42551', conditions: [
        { code: 'SC-1', label: 'Security threat model completed', status: 'fail' },
        { code: 'SC-2', label: 'Data classification schema configured', status: 'fail' },
        { code: 'SC-3', label: 'M8 Governance module operational', status: 'idle' },
        { code: 'SC-4', label: 'PII classification enabled', status: 'idle' },
        { code: 'SC-5', label: 'Credential / secrets scan clean', status: 'idle' },
      ]},
      { name: 'Engagement Maturity', gate: 'PASS', gateColor: '#07947C', conditions: [
        { code: 'EM-1', label: 'Engagement capability profile', status: 'pass' },
        { code: 'EM-2', label: 'Engagement tenure', status: 'pass' },
        { code: 'EM-3', label: 'SLA baseline established', status: 'pass' },
        { code: 'EM-4', label: 'Observability active', status: 'pass' },
        { code: 'EM-5', label: 'Incident response process documented', status: 'pass' },
      ]},
      { name: 'Certification Checklist', gate: 'FAIL', gateColor: '#D42551', conditions: [
        { code: 'CC-1', label: 'Well-architected assessment submitted', status: 'idle' },
        { code: 'CC-2', label: 'Review team assigned', status: 'idle' },
      ]},
    ],
  },
}

const STATUS_ICO = { pass: '✓', fail: '✗', progress: '◌', idle: '·' }
const STATUS_COLORS = {
  pass: { bg: '#E5F5F1', color: '#056E5B' },
  fail: { bg: '#FCE6EC', color: '#D42551' },
  progress: { bg: '#FEF3DB', color: '#8A4D00' },
  idle: { bg: '#EDF1FD', color: '#626679' },
}

function MobileWellArchitected({ active, setActive }) {
  const data = MOBILE_DATA[active]
  const client = CLIENTS.find(c => c.key === active)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Client selector pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CLIENTS.map(c => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              minHeight: 44, padding: '8px 14px', borderRadius: 6, cursor: 'pointer',
              border: `1px solid ${active === c.key ? c.badgeColor : 'var(--line)'}`,
              background: active === c.key ? c.badgeColor + '14' : '#fff',
              fontFamily: 'var(--font-sans)', textAlign: 'left',
              transition: 'all 0.12s',
            }}
          >
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', padding: '2px 7px', borderRadius: 999, background: c.badgeColor, color: '#fff', flexShrink: 0 }}>{c.badge}</span>
            <span style={{ fontSize: 13, fontWeight: active === c.key ? 600 : 400, color: active === c.key ? c.badgeColor : 'var(--muted)' }}>{c.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Active client status banner */}
      <div style={{ background: data.statusBg, border: `1px solid ${data.statusColor}30`, borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', padding: '3px 10px', borderRadius: 999, background: data.statusColor, color: '#fff' }}>{data.status}</span>
          <span style={{ fontSize: 12, color: data.statusColor, fontWeight: 600 }}>{data.blocking}</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{data.summary}</div>
      </div>

      {/* Category sections */}
      {data.categories.map(cat => (
        <div key={cat.name} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden' }}>
          {/* Category header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>{cat.name}</div>
            <span style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: cat.gateColor + '18', color: cat.gateColor, border: `1px solid ${cat.gateColor}30` }}>{cat.gate}</span>
          </div>
          {/* Condition rows */}
          {cat.conditions.map(cond => (
            <div key={cond.code} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--line-soft)' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: STATUS_COLORS[cond.status].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: STATUS_COLORS[cond.status].color, flexShrink: 0 }}>
                {STATUS_ICO[cond.status]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--muted)', marginRight: 5 }}>{cond.code}</span>
                <span style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500 }}>{cond.label}</span>
              </div>
              <span style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: STATUS_COLORS[cond.status].bg, color: STATUS_COLORS[cond.status].color, flexShrink: 0, whiteSpace: 'nowrap' }}>
                {cond.status === 'pass' ? 'Pass' : cond.status === 'fail' ? 'Fail' : cond.status === 'progress' ? 'In progress' : 'Not checked'}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* Footer actions */}
      <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
        <button style={{ flex: 1, minHeight: 44, background: '#fff', border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
          Export PDF
        </button>
        <button style={{ flex: 2, minHeight: 44, background: active === 'nexus' ? '#F59E0B' : active === 'meridian' ? 'var(--teal)' : 'var(--muted)', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}>
          {active === 'meridian' ? 'Issue certificate' : 'Continue review'}
        </button>
      </div>
    </div>
  )
}

export default function WellArchitected() {
  const [active, setActive] = useState('nexus')

  return (
    <PageLayout>
      <StepHeader
        step="Surface · Internal Tool"
        title="Well-Architected Review Dashboard"
        description="Delivery leads monitor whether a Managed Services client meets all conditions required for on-demand talent eligibility. Switch between clients to see the three states."
      />

      {/* Desktop — unchanged (includes client switcher + frame) */}
      <div className="desktop-only">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CLIENTS.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              style={{
                padding: '7px 14px', borderRadius: 4, cursor: 'pointer',
                border: `1px solid ${active === c.key ? c.badgeColor : 'var(--line)'}`,
                background: active === c.key ? c.badgeColor + '14' : '#fff',
                fontSize: 12.5, fontWeight: active === c.key ? 600 : 400,
                color: active === c.key ? c.badgeColor : 'var(--muted)',
                display: 'flex', alignItems: 'center', gap: 7,
                transition: 'all 0.15s',
                minHeight: 44,
              }}
            >
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', padding: '1px 5px', borderRadius: 999, background: c.badgeColor, color: '#fff' }}>
                {c.badge}
              </span>
              {c.label.split('—')[0].trim()}
            </button>
          ))}
        </div>
        <DesktopFrame width={1380} minHeight={960}>
          {active === 'nexus' && <FrameWarNexus />}
          {active === 'meridian' && <FrameWarMeridian />}
          {active === 'thornfield' && <FrameWarThornfield />}
        </DesktopFrame>
      </div>

      {/* Mobile — new */}
      <div className="mobile-only">
        <MobileWellArchitected active={active} setActive={setActive} />
      </div>
    </PageLayout>
  )
}
