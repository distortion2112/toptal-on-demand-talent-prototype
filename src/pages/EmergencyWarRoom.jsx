import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'

/* ─── Design tokens ─── */
const T = {
  navy: '#0D1D3E', teal: '#07947C', blue: '#204ECF',
  alert: '#D42551', muted: '#626679', lightBg: '#F4F6FB',
  tableAlt: '#EDF1FD', body: '#2D2D2D', white: '#FFFFFF',
  line: '#E3E8F2', lineSoft: '#EDF1FD', surface: '#FFFFFF',
  tealSoft: '#E5F5F1', tealInk: '#056E5B',
  alertSoft: '#FCE6EC', amber: '#F59E0B', amberSoft: '#FEF3DB',
}
const sans = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const mono = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace'

/* ─── Elapsed timer ─── */
function useElapsed(startMinutes = 23) {
  const [secs, setSecs] = useState(startMinutes * 60)
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
}

/* ─── SLA countdown ─── */
function useSLA(initialSeconds = 25380) { // 7h 03m
  const [secs, setSecs] = useState(initialSeconds)
  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return { display: `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`, pct: secs / 28800 }
}

/* ─── Participant ─── */
function Participant({ initials, name, role, status = 'active', isYou, color = '#E8D5B0' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 0',
      borderBottom: `1px solid ${T.lineSoft}`,
    }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: isYou ? T.navy : color,
          color: isYou ? T.white : T.navy,
          display: 'grid', placeItems: 'center',
          fontFamily: sans, fontSize: 11, fontWeight: 700,
          border: isYou ? `2px solid ${T.teal}` : 'none',
        }}>{initials}</div>
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 9, height: 9, borderRadius: '50%',
          background: status === 'active' ? T.teal : status === 'idle' ? T.amber : '#ccc',
          border: `1.5px solid ${T.surface}`,
        }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: sans, fontSize: 13, fontWeight: isYou ? 700 : 500,
          color: T.navy, letterSpacing: '-0.005em',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {name}
          {isYou && (
            <span style={{
              fontFamily: mono, fontSize: 9, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              background: T.teal, color: T.white,
              padding: '1px 5px', borderRadius: 3,
            }}>YOU</span>
          )}
        </div>
        <div style={{ fontFamily: sans, fontSize: 11.5, color: T.muted, marginTop: 1 }}>{role}</div>
      </div>
      <div style={{
        fontFamily: mono, fontSize: 10, color: status === 'active' ? T.tealInk : T.muted,
        letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>{status}</div>
    </div>
  )
}

/* ─── Timeline event ─── */
function TimelineEvent({ time, actor, actorColor = '#E8D5B0', initials, text, highlight, tag }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      padding: '10px 0',
      borderBottom: `1px solid ${T.lineSoft}`,
      background: highlight ? 'rgba(7,148,124,0.04)' : 'transparent',
      borderLeft: highlight ? `3px solid ${T.teal}` : '3px solid transparent',
      paddingLeft: highlight ? 10 : 0,
      marginLeft: highlight ? -10 : 0,
    }}>
      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: highlight ? T.navy : actorColor,
          color: highlight ? T.white : T.navy,
          display: 'grid', placeItems: 'center',
          fontFamily: sans, fontSize: 9.5, fontWeight: 700,
        }}>{initials}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontFamily: mono, fontSize: 10.5, color: T.muted, letterSpacing: '0.04em' }}>{time}</span>
          <span style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: T.navy }}>{actor}</span>
          {tag && (
            <span style={{
              fontFamily: mono, fontSize: 9.5, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              background: highlight ? T.tealSoft : T.tableAlt,
              color: highlight ? T.tealInk : T.muted,
              padding: '1px 6px', borderRadius: 3,
            }}>{tag}</span>
          )}
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, color: T.body, lineHeight: 1.5 }}>{text}</div>
      </div>
    </div>
  )
}

/* ─── Checklist item ─── */
function CheckItem({ done, active, text, owner, isYou }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '22px 1fr auto',
      gap: 10, alignItems: 'flex-start',
      padding: '10px 12px',
      background: active ? T.tealSoft : done ? T.surface : T.surface,
      border: `1px solid ${active ? T.tealInk + '33' : T.lineSoft}`,
      borderRadius: 7,
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: 4, marginTop: 2,
        background: done ? T.navy : active ? T.teal : 'transparent',
        border: done || active ? 'none' : `1.5px solid ${T.line}`,
        display: 'grid', placeItems: 'center', flexShrink: 0,
      }}>
        {done && <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke={T.white} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 5L3.5 7L7.5 2.5"/></svg>}
        {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.white }}/>}
      </div>
      <div>
        <div style={{
          fontFamily: sans, fontSize: 13, fontWeight: active ? 600 : 400,
          color: done ? T.muted : T.navy,
          textDecoration: done ? 'line-through' : 'none',
          textDecorationColor: T.line,
          letterSpacing: '-0.005em',
        }}>{text}</div>
        {owner && (
          <div style={{ fontFamily: mono, fontSize: 10, color: active ? T.tealInk : T.muted, marginTop: 2, letterSpacing: '0.03em' }}>
            {isYou ? '→ YOU' : owner}
          </div>
        )}
      </div>
      {active && (
        <div style={{
          fontFamily: mono, fontSize: 9.5, fontWeight: 600,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          background: T.teal, color: T.white,
          padding: '2px 7px', borderRadius: 3, marginTop: 2,
        }}>In progress</div>
      )}
    </div>
  )
}

/* ─── Resource link ─── */
function ResourceLink({ icon, label, sub, urgent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px',
      background: urgent ? T.alertSoft : T.surface,
      border: `1px solid ${urgent ? '#F2A0B0' : T.line}`,
      borderRadius: 7, cursor: 'pointer',
    }}>
      <div style={{ color: urgent ? T.alert : T.muted, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: urgent ? T.alert : T.navy, letterSpacing: '-0.005em' }}>{label}</div>
        {sub && <div style={{ fontFamily: mono, fontSize: 10.5, color: T.muted, marginTop: 1, letterSpacing: '0.03em' }}>{sub}</div>}
      </div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={T.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6 H10 M6.5 2.5 L10 6 L6.5 9.5"/>
      </svg>
    </div>
  )
}

/* ─── Section label ─── */
function SLabel({ children }) {
  return (
    <div style={{
      fontFamily: mono, fontSize: 10, fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: T.muted, marginBottom: 10,
    }}>{children}</div>
  )
}

/* ─── Main war room ─── */
export default function EmergencyWarRoom() {
  const navigate = useNavigate()
  const { reset } = useDemo()
  const elapsed = useElapsed(23)
  const sla = useSLA(25380)
  const [resolved, setResolved] = useState(false)
  const [mobileTab, setMobileTab] = useState('incident') // 'incident' | 'timeline' | 'room'

  const slaPct = sla.pct
  const slaColor = slaPct > 0.5 ? T.teal : slaPct > 0.25 ? T.amber : T.alert

  if (resolved) {
    return (
      <div style={{
        minHeight: '100vh', background: T.lightBg,
        display: 'grid', placeItems: 'center',
        fontFamily: sans, padding: '24px 16px',
      }}>
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`,
          borderRadius: 12, padding: 'clamp(28px, 5vw, 48px) clamp(20px, 5vw, 52px)',
          maxWidth: 520, width: '100%', textAlign: 'center',
          boxShadow: '0 4px 24px -4px rgba(13,29,62,0.12)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: T.tealSoft, margin: '0 auto 20px',
            display: 'grid', placeItems: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.teal} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13L9 17L19 7"/>
            </svg>
          </div>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: T.tealInk, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>Incident resolved</div>
          <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, color: T.navy, letterSpacing: '-0.02em', marginBottom: 10 }}>P1 closed · 38m 44s</div>
          <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 28 }}>
            Kong rate_limiting policy patched back to redis. /v2/trade routes restored. Traffic normalized. Root cause confirmed: <strong style={{ color: T.body }}>v2.9.1 Kong plugin misconfiguration.</strong>
          </div>
          <div style={{
            background: T.lightBg, borderRadius: 8,
            padding: '14px 18px', marginBottom: 24,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
          }}>
            {[['Time to resolve', '38m 44s'], ['SME onboard in', '8h SLA ✓'], ['Root cause', 'Kong misconfiguration']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: mono, fontSize: 9.5, color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.navy }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { reset(); navigate('/') }}
              style={{
                background: T.teal, border: 'none', borderRadius: 4,
                padding: '10px 22px', cursor: 'pointer',
                fontSize: 13.5, fontWeight: 600, color: T.white,
              }}>Back to start</button>
            <button
              onClick={() => { reset(); navigate('/sprint/gap-flag') }}
              style={{
                background: 'none', border: `1px solid ${T.line}`, borderRadius: 4,
                padding: '10px 22px', cursor: 'pointer',
                fontSize: 13, color: T.muted,
              }}>View sprint flow →</button>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Shared panel content ─── */
  const LeftPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: T.navy, borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontFamily: mono, fontSize: 9.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Slack war room</div>
        <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.white, marginBottom: 8 }}>#incident-halyard</div>
        <div style={{ fontFamily: mono, fontSize: 10.5, color: 'rgba(255,255,255,0.5)' }}>51 messages · last 1m ago</div>
      </div>
      <div>
        <SLabel>In this room · 5</SLabel>
        <Participant initials="PN" name="Priya Nair" role="API Gateway SME · Toptal" status="active" isYou color="#C7D9F0" />
        <Participant initials="AS" name="Aaron Sokol" role="SRE · On-call lead" status="active" color="#D4E8D0" />
        <Participant initials="DT" name="Diego Toledo" role="Backend eng · deploy author" status="active" color="#F5D9C8" />
        <Participant initials="EL" name="Elena Larsen" role="Toptal escalation" status="idle" color="#E8D5F0" />
        <Participant initials="MR" name="Marcus Rivera" role="Requestor · Halyard Capital" status="idle" color="#E8D5B0" />
      </div>
      <div>
        <SLabel>Active hypothesis · 91% confidence</SLabel>
        <div style={{ background: T.amberSoft, border: `1px solid #F5D78E`, borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: '#92400E', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Root cause theory</div>
          <div style={{ fontFamily: sans, fontSize: 13, color: '#78350F', lineHeight: 1.55 }}>
            <strong>v2.9.1</strong> set Kong's <code style={{ background: 'rgba(0,0,0,0.08)', padding: '0 4px', borderRadius: 3, fontFamily: mono, fontSize: 11 }}>rate_limiting</code> policy to <strong>local</strong> instead of <strong>redis</strong>. Each node enforces limits independently → distributed checks fail → gateway blocks /v2/trade.
          </div>
          <div style={{ marginTop: 10, fontFamily: mono, fontSize: 10, color: '#92400E', letterSpacing: '0.04em' }}>
            Proposed fix: patch policy back to redis or revert to v2.8.4
          </div>
        </div>
      </div>
    </div>
  )

  const CenterPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ background: T.navy, borderRadius: 10, padding: '18px 22px', border: `2px solid ${T.teal}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#C7D9F0', display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 11, fontWeight: 700, color: T.navy, border: `2px solid ${T.teal}` }}>PN</div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, color: T.teal, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 2 }}>Your first actions · just joined</div>
            <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.white }}>Start here, Priya</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Join #incident-halyard — Aaron is live and waiting',
            'Review the Kong plugin config diff in commit b7e4c12 (v2.9.1 → v2.8.4)',
            'Confirm whether rate_limiting policy (local vs redis) is the root cause',
            'Give Aaron a go/no-go on the config patch within 15 minutes',
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: T.teal, display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontFamily: mono, fontSize: 9, color: T.white, fontWeight: 700 }}>{i + 1}</span>
              </div>
              <div style={{ fontFamily: sans, fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SLabel>Resolution checklist</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <CheckItem done text="P1 declared — incident channel opened" owner="Aaron Sokol" />
          <CheckItem done text="Deploy diff identified — commit b7e4c12 in v2.9.1" owner="Diego Toledo" />
          <CheckItem done text="SME requested and accepted" owner="Marcus Rivera" />
          <CheckItem active text="Root cause confirmed by API Gateway SME" owner="Priya Nair" isYou />
          <CheckItem text="Patch decision made — fix policy or revert" owner="Priya + Aaron" />
          <CheckItem text="Kong config patched or v2.8.4 revert deployed" owner="Diego Toledo" />
          <CheckItem text="Traffic normalized — 503 error rate < 0.1%" owner="Aaron Sokol" />
          <CheckItem text="P1 closed — postmortem scheduled" owner="Elena Larsen" />
        </div>
      </div>

      <div>
        <SLabel>Activity timeline</SLabel>
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10, padding: '6px 18px', overflow: 'hidden' }}>
          <TimelineEvent time="14:07" initials="AS" actorColor="#D4E8D0" actor="Aaron Sokol" tag="Incident opened" text="API Gateway error rate spiked to 94%. All /v2/trade routes returning 503. P1 declared. #incident-halyard created." />
          <TimelineEvent time="14:09" initials="DT" actorColor="#F5D9C8" actor="Diego Toledo" tag="Joined" text="Pulled last 3 deploys. Reviewing Kong plugin config changes from v2.9.1 deploy at 14:04." />
          <TimelineEvent time="14:11" initials="DT" actorColor="#F5D9C8" actor="Diego Toledo" tag="Finding" text="Confirmed: rate_limiting policy changed from redis → local in v2.9.1. Each node enforcing independently. Awaiting SME to confirm fix path." />
          <TimelineEvent time="14:10" initials="MR" actorColor="#E8D5B0" actor="Marcus Rivera" tag="SME requested" text="Flagged API Gateway skill gap. On-demand SME request submitted — P1 fast path. Priya matched." />
          <TimelineEvent time="14:15" initials="EL" actorColor="#E8D5F0" actor="Elena Larsen" tag="Escalation" text="Toptal escalation on standby. Priya notified with 8h SLA context card." />
          <TimelineEvent time="14:18" initials="PN" actorColor="#C7D9F0" actor="Priya Nair" tag="Accepted" text="Accepted P1 engagement. Condensed context card received and reviewed." />
          <TimelineEvent time="14:33" initials="PN" actorColor="#C7D9F0" actor="Priya Nair" tag="Now · joined" text="Priya is in the war room. Root cause review in progress." highlight />
        </div>
      </div>
    </div>
  )

  const RightPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <SLabel>Live impact</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { k: 'Error rate', v: '94%', color: T.alert },
            { k: 'Req/min failing', v: '1,400', color: T.alert },
            { k: 'Routes affected', v: '/v2/trade', color: T.amber },
            { k: 'Services down', v: '2', color: T.amber },
          ].map(({ k, v, color }) => (
            <div key={k} style={{ background: T.lightBg, border: `1px solid ${T.lineSoft}`, borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontFamily: mono, fontSize: 9.5, color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>{k}</div>
              <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SLabel>Resources</SLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <ResourceLink urgent icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1.5"/><path d="M5 6.5 H8 M5 5 H8 M5 8 H6.5"/></svg>} label="Kong plugin runbook" sub="P1 playbook · last updated 3d ago" />
          <ResourceLink icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="2" y="2.5" width="9" height="8" rx="1.2"/><path d="M4 5.5 H9 M4 7.5 H9 M4 9.5 H7"/></svg>} label="Datadog · live 503s" sub="/v2/trade routes · last 30m" />
          <ResourceLink icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 11 H11.5 M2.5 11 V8 M5 11 V4 M7.5 11 V6 M10 11 V2.5"/></svg>} label="Grafana dashboard" sub="halyard-api-gateway · error rate" />
          <ResourceLink icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"><path d="M3 1.5 H8 L10.5 4 V11.5 H3 Z"/><path d="M8 1.5 V4 H10.5"/><path d="M5 7 H8.5 M5 9 H8.5"/></svg>} label="Commit diff · b7e4c12" sub="v2.9.1 → rate_limiting policy" />
        </div>
      </div>

      <div style={{ background: T.lightBg, border: `1px solid ${T.lineSoft}`, borderRadius: 8, padding: '12px 14px' }}>
        <div style={{ fontFamily: mono, fontSize: 9.5, color: T.muted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>Your context brief</div>
        <div style={{ fontFamily: sans, fontSize: 12.5, color: T.body, lineHeight: 1.5, marginBottom: 10 }}>
          AI-condensed onboarding brief delivered at accept. Valid for <strong style={{ color: T.navy }}>3h 47m</strong>.
        </div>
        <button onClick={() => navigate('/emergency/context-card')} style={{ background: 'none', border: `1px solid ${T.line}`, borderRadius: 4, padding: '6px 12px', cursor: 'pointer', fontSize: 12, color: T.muted, fontFamily: sans, width: '100%' }}>← Review context card</button>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ background: T.tealSoft, border: `1px solid ${T.tealInk}33`, borderRadius: 8, padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ fontFamily: sans, fontSize: 12.5, color: T.tealInk, lineHeight: 1.5 }}>
            When traffic is normalized and the fix is confirmed, close the incident.
          </div>
        </div>
        <button onClick={() => setResolved(true)} style={{ width: '100%', background: T.teal, border: 'none', borderRadius: 6, padding: '12px 16px', cursor: 'pointer', fontFamily: sans, fontSize: 14, fontWeight: 700, color: T.white, letterSpacing: '-0.005em' }}>
          Mark P1 resolved ✓
        </button>
      </div>
    </div>
  )

  /* ─── Incident header (shared) ─── */
  const IncidentHeader = (
    <div style={{
      background: T.navy, color: T.white,
      borderBottom: `3px solid ${T.alert}`,
      position: 'sticky', top: 52, zIndex: 10,
    }}>
      {/* Main row */}
      <div style={{ padding: '0 clamp(12px, 3vw, 32px)', display: 'flex', alignItems: 'center', height: 56, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: T.alert, color: T.white, fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, flexShrink: 0 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.white, animation: 'warPulse 1.4s ease-in-out infinite' }}/>
          P1
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: sans, fontSize: 'clamp(11px, 2.5vw, 14px)', fontWeight: 600, color: T.white, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            API Gateway 503s · Halyard Capital
          </div>
          <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', marginTop: 1 }}>
            INC-P1-0042 · since 14:07 UTC
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', marginBottom: 1 }}>Live</div>
          <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{elapsed}</div>
        </div>
        <div className="war-sla-block" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '6px 12px', textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 9.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>SLA</div>
          <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: slaColor, fontVariantNumeric: 'tabular-nums' }}>{sla.display}</div>
          <div style={{ marginTop: 3, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 99, overflow: 'hidden', minWidth: 80 }}>
            <div style={{ width: `${slaPct * 100}%`, height: '100%', background: slaColor, borderRadius: 99, transition: 'width 1s linear' }}/>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: T.lightBg, minHeight: '100vh', fontFamily: sans }}>
      <style>{`
        @keyframes warPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @media (max-width: 640px) {
          .war-sla-block { display: none !important; }
          .war-desktop-body { display: none !important; }
          .war-mobile-body { display: flex !important; }
        }
        @media (min-width: 641px) {
          .war-mobile-body { display: none !important; }
          .war-desktop-body { display: grid !important; }
        }
      `}</style>

      {IncidentHeader}

      {/* ─── Desktop: 3-column grid ─── */}
      <div className="war-desktop-body" style={{
        gridTemplateColumns: '280px 1fr 300px',
        gap: 0, height: 'calc(100vh - 108px)',
      }}>
        <div style={{ background: T.surface, borderRight: `1px solid ${T.line}`, padding: '22px 20px', overflowY: 'auto' }}>
          {LeftPanel}
        </div>
        <div style={{ overflowY: 'auto', padding: '22px 28px' }}>
          {CenterPanel}
        </div>
        <div style={{ background: T.surface, borderLeft: `1px solid ${T.line}`, padding: '22px 20px', overflowY: 'auto' }}>
          {RightPanel}
        </div>
      </div>

      {/* ─── Mobile: tabbed layout ─── */}
      <div className="war-mobile-body" style={{ flexDirection: 'column', minHeight: 'calc(100vh - 108px)' }}>
        {/* Tab bar */}
        <div style={{ background: T.surface, borderBottom: `1px solid ${T.line}`, display: 'flex', position: 'sticky', top: 108, zIndex: 9 }}>
          {[
            { id: 'incident', label: 'Incident' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'room', label: 'Room' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id)}
              style={{
                flex: 1, padding: '12px 8px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: sans, fontSize: 13, fontWeight: mobileTab === tab.id ? 600 : 400,
                color: mobileTab === tab.id ? T.navy : T.muted,
                borderBottom: `2px solid ${mobileTab === tab.id ? T.teal : 'transparent'}`,
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '20px 16px', flex: 1 }}>
          {mobileTab === 'incident' && CenterPanel}
          {mobileTab === 'timeline' && LeftPanel}
          {mobileTab === 'room' && RightPanel}
        </div>
      </div>
    </div>
  )
}
