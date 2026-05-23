import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from './demo-store.jsx'

export default function ScenarioSelect() {
  const navigate = useNavigate()
  const { set, reset } = useDemo()

  function startSprint() {
    reset()
    set({ mode: 'sprint', stage: 'flag' })
    navigate('/sprint/gap-flag')
  }

  function startEmergency() {
    reset()
    set({ mode: 'emergency', stage: 'flag' })
    navigate('/emergency/gap-flag')
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 52px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      background: 'var(--paper)',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 520 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--teal)', marginBottom: 16,
          background: 'var(--clay-soft)', padding: '4px 10px', borderRadius: 999,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
          Interactive Demo · May 2026
        </div>
        <h1 style={{
          fontSize: 32, fontWeight: 700, color: 'var(--navy)',
          margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          On-Demand Talent
        </h1>
        <p style={{
          fontSize: 16, color: 'var(--muted)', margin: 0, lineHeight: 1.6,
        }}>
          Choose a scenario to walk through the full end-to-end operating model.
        </p>
      </div>

      {/* Scenario cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20, width: '100%', maxWidth: 720, marginBottom: 20,
      }}>
        {/* Sprint Support */}
        <button
          onClick={startSprint}
          style={{
            background: '#fff', border: '1px solid var(--line)',
            borderRadius: 8, padding: '28px 24px',
            cursor: 'pointer', textAlign: 'left',
            boxShadow: 'var(--shadow-card)',
            transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
            borderLeft: '4px solid var(--teal)',
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(13,29,62,0.12)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#fff', background: 'var(--teal)',
            padding: '3px 8px', borderRadius: 999, marginBottom: 14,
          }}>
            Full Sprint Support
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, letterSpacing: '-0.01em' }}>
            Skill gap mid-sprint
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 20px', lineHeight: 1.55 }}>
            4 Kubernetes tasks have been blocked for 6 days. The system surfaces a suggestion card, an SME accepts, and onboarding begins.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
            {[
              'AI suggestion card → request form → submitted',
              'SME receives match request → accepts',
              '72h onboarding brief generated',
              'Delivery lead dashboard with approval flow',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--body)' }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: 'var(--clay-soft)',
                  color: 'var(--teal)', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </div>
                {step}
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--teal)',
          }}>
            Start Sprint demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5"/>
            </svg>
          </div>
        </button>

        {/* Emergency */}
        <button
          onClick={startEmergency}
          style={{
            background: '#fff', border: '1px solid var(--line)',
            borderRadius: 8, padding: '28px 24px',
            cursor: 'pointer', textAlign: 'left',
            boxShadow: 'var(--shadow-card)',
            transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
            borderLeft: '4px solid var(--alert)',
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,37,81,0.12)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#fff', background: 'var(--alert)',
            padding: '3px 8px', borderRadius: 999, marginBottom: 14,
          }}>
            Emergency Support
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, letterSpacing: '-0.01em' }}>
            Production outage · P1
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 20px', lineHeight: 1.55 }}>
            API gateway down in production. 8-hour SLA. SME is notified immediately with a condensed outage brief.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
            {[
              'Emergency flag → urgency form → submitted',
              'SME receives P1 request → accept immediately',
              'Condensed outage context card delivered',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--body)' }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: 'var(--alert-soft)',
                  color: 'var(--alert)', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </div>
                {step}
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--alert)',
          }}>
            Start Emergency demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Overview link */}
      <div style={{ width: '100%', maxWidth: 720, marginBottom: 48 }}>
        <button
          onClick={() => navigate('/overview')}
          style={{
            width: '100%',
            background: '#fff', border: '1px solid var(--line)',
            borderRadius: 8, padding: '20px 24px',
            cursor: 'pointer', textAlign: 'left',
            boxShadow: 'var(--shadow-card)',
            transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
            borderLeft: '4px solid var(--navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(13,29,62,0.12)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: '#fff', background: 'var(--navy)',
              padding: '3px 8px', borderRadius: 999, marginBottom: 10,
            }}>
              Feature Overview
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              What is On-Demand Talent?
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              Full feature definition — lifecycle, modes, personas, access model, and value drivers.
            </p>
          </div>
          <svg style={{ flexShrink: 0, marginLeft: 16 }} width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5"/>
          </svg>
        </button>
      </div>

      {/* Other surfaces */}
      <div style={{ width: '100%', maxWidth: 720 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: 12,
        }}>
          Additional surfaces
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: "Taso's Button · Client portal", path: '/client-portal', desc: 'Client-facing trigger in the Halyard portal' },
            { label: 'Well-Architected Review', path: '/well-architected', desc: 'Eligibility health dashboard for delivery leads' },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 6, padding: '12px 16px',
                cursor: 'pointer', textAlign: 'left',
                boxShadow: 'var(--shadow-card)',
                transition: 'box-shadow 0.15s, transform 0.15s',
                flex: '1 1 280px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(13,29,62,0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p style={{
        marginTop: 48, fontSize: 11.5, color: 'var(--muted)', textAlign: 'center',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.03em',
      }}>
        v0.1 · 2026-05-23 · DEMO / MOCK DATA ONLY
      </p>
    </div>
  )
}
