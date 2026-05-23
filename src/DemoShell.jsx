import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDemo } from './demo-store.jsx'

const STAGES = ['Flag', 'Match', 'Approve', 'Onboard', 'Active', 'Closed']
const STAGE_KEYS = ['flag', 'match', 'approve', 'onboard', 'active', 'closed']

// Route → persona + stage config
const ROUTE_META = {
  '/': { persona: null, stage: null },
  '/sprint/gap-flag': { persona: 'Deployed Talent · Marcus Rivera', stage: 'flag' },
  '/sprint/sme-request': { persona: 'SME Network · Priya Nair', stage: 'match' },
  '/sprint/onboarding': { persona: 'SME Network · Priya Nair', stage: 'onboard' },
  '/sprint/dashboard': { persona: 'Delivery Lead · Alex Chen', stage: 'approve' },
  '/emergency/gap-flag': { persona: 'Deployed Talent · Marcus Rivera', stage: 'flag' },
  '/emergency/sme-request': { persona: 'SME Network · Priya Nair', stage: 'match' },
  '/emergency/context-card': { persona: 'SME Network · Priya Nair', stage: 'onboard' },
  '/client-portal': { persona: 'Client · Halyard Capital', stage: null },
  '/well-architected': { persona: 'Delivery Lead · Alex Chen', stage: null },
}

const NAV_LINKS = [
  {
    label: 'Sprint Flow',
    steps: [
      { label: 'Flag Gap', path: '/sprint/gap-flag' },
      { label: 'SME Request', path: '/sprint/sme-request' },
      { label: 'Onboarding', path: '/sprint/onboarding' },
      { label: 'Dashboard', path: '/sprint/dashboard' },
    ],
  },
  {
    label: 'Emergency Flow',
    steps: [
      { label: 'Flag Gap', path: '/emergency/gap-flag' },
      { label: 'SME Request', path: '/emergency/sme-request' },
      { label: 'Context Card', path: '/emergency/context-card' },
    ],
  },
  {
    label: 'Other Surfaces',
    steps: [
      { label: "Taso's Button", path: '/client-portal' },
      { label: 'WAR Dashboard', path: '/well-architected' },
    ],
  },
]

export default function DemoShell({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, stage, reset } = useDemo()
  const [navOpen, setNavOpen] = useState(false)

  const meta = ROUTE_META[location.pathname] || { persona: null, stage: null }
  const activeStageIdx = STAGE_KEYS.indexOf(meta.stage ?? stage)
  const isHome = location.pathname === '/'

  function handleHome() {
    reset()
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top bar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 52,
        background: 'var(--navy)',
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
        gap: 16,
        boxShadow: '0 1px 0 rgba(255,255,255,0.08)',
      }}>
        {/* Brand */}
        <button onClick={handleHome} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          flexShrink: 0,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: 2, background: 'var(--teal)',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
            Toptal
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>
            On-Demand Talent
          </span>
        </button>

        {/* Mode badge */}
        {mode && (
          <span style={{
            fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 999,
            background: mode === 'emergency' ? 'var(--alert)' : 'var(--teal)',
            color: '#fff', flexShrink: 0,
          }}>
            {mode === 'emergency' ? 'Emergency' : 'Sprint Support'}
          </span>
        )}

        {/* Lifecycle stepper (shown when in a flow) */}
        {meta.stage && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            flex: 1, minWidth: 0, overflow: 'hidden',
          }}>
            {STAGES.map((s, i) => {
              const done = i < activeStageIdx
              const active = i === activeStageIdx
              const upcoming = i > activeStageIdx
              return (
                <React.Fragment key={s}>
                  {i > 0 && (
                    <div style={{
                      flex: 1, height: 1,
                      background: done ? 'var(--teal)' : 'rgba(255,255,255,0.15)',
                      minWidth: 8, maxWidth: 32,
                    }} />
                  )}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
                    opacity: upcoming ? 0.4 : 1,
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: done ? 'var(--teal)' : active ? '#fff' : 'transparent',
                      border: `2px solid ${done ? 'var(--teal)' : active ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      {done ? (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M2 4.5L3.8 6.5L7 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : active ? (
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: 'var(--navy)',
                          animation: 'pulse-dot 1.6s ease-in-out infinite',
                        }} />
                      ) : null}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? '#fff' : 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
                      {s}
                    </span>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        )}

        <div style={{ flex: meta.stage ? 0 : 1 }} />

        {/* Persona chip */}
        {meta.persona && (
          <div style={{
            fontSize: 11.5, color: 'rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.08)',
            padding: '4px 10px', borderRadius: 4, flexShrink: 0,
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: '#fff',
            }}>
              {meta.persona.split('·')[1]?.trim().split(' ').map(w => w[0]).join('').slice(0,2) || 'U'}
            </div>
            <span>{meta.persona}</span>
          </div>
        )}

        {/* Nav menu button */}
        <button
          onClick={() => setNavOpen(o => !o)}
          style={{
            background: navOpen ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4, padding: '5px 10px',
            cursor: 'pointer', color: '#fff', fontSize: 11.5, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
          }}
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="0" y1="1.5" x2="12" y2="1.5"/>
            <line x1="0" y1="5" x2="12" y2="5"/>
            <line x1="0" y1="8.5" x2="12" y2="8.5"/>
          </svg>
          All screens
        </button>
      </header>

      {/* Dropdown nav */}
      {navOpen && (
        <>
          <div
            onClick={() => setNavOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 98 }}
          />
          <div style={{
            position: 'fixed', top: 52, right: 20, zIndex: 99,
            background: '#fff', borderRadius: 6,
            boxShadow: 'var(--shadow-pop)',
            border: '1px solid var(--line)',
            padding: '12px 0', minWidth: 220,
          }}>
            {NAV_LINKS.map(group => (
              <div key={group.label}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                  padding: '6px 16px 4px',
                }}>
                  {group.label}
                </div>
                {group.steps.map(step => (
                  <button
                    key={step.path}
                    onClick={() => { navigate(step.path); setNavOpen(false) }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '7px 16px',
                      background: location.pathname === step.path ? 'var(--table-alt)' : 'none',
                      border: 'none', cursor: 'pointer',
                      fontSize: 13, color: 'var(--ink)',
                      fontWeight: location.pathname === step.path ? 600 : 400,
                    }}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--line)', margin: '8px 0 4px' }} />
            <button
              onClick={() => { handleHome(); setNavOpen(false) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '7px 16px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, color: 'var(--muted)',
              }}
            >
              ↩ Back to scenario select
            </button>
          </div>
        </>
      )}

      {/* Page content */}
      <main style={{ paddingTop: 52, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
