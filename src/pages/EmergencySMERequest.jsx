import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameEmergency } from '../screens/screen2.jsx'
import { PageLayout, StepHeader, TabletFrame } from './shared.jsx'

export default function EmergencySMERequest() {
  const navigate = useNavigate()
  const { set } = useDemo()
  const [view, setView] = useState('emergency') // 'emergency' | 'declined'

  function handleAccept() {
    set({ stage: 'onboard', smeAccepted: true })
    navigate('/emergency/context-card')
  }

  function handleDecline() {
    setView('declined')
  }

  if (view === 'declined') {
    return (
      <PageLayout>
        <StepHeader
          step="Emergency Flow · Step 2 of 3"
          title="SME Declined"
          description="Priya declined. The system escalates immediately — P1 outages route to the next certified on-call SME without delay."
        />
        <div style={{
          maxWidth: 480, width: '100%',
          background: '#fff', border: '1px solid var(--line)',
          borderRadius: 8, padding: '32px 28px', textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--alert-soft)', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--alert)" strokeWidth="2" strokeLinecap="round">
              <path d="M10 6v5M10 14h.01"/>
              <circle cx="10" cy="10" r="8"/>
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Priya declined</div>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 4px', lineHeight: 1.55 }}>
            Escalating immediately — <strong>7h 41m</strong> remaining on SLA.
          </p>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.55 }}>
            Next: <strong>James Okafor</strong> · P1-certified · UTC+1 · response window 15 min.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              onClick={() => setView('emergency')}
              style={{
                padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
                background: 'none', border: '1px solid var(--line)',
                fontSize: 13, color: 'var(--muted)',
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleAccept}
              style={{
                padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
                background: 'var(--alert)', border: 'none',
                fontSize: 13, fontWeight: 600, color: '#fff',
              }}
            >
              Skip to context card →
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <StepHeader
        step="Emergency Flow · Step 2 of 3"
        title="Emergency Engagement Request"
        description="Priya receives a P1 alert with a countdown. Emergency mode requires an immediate accept or decline — no counter-proposal."
      />
      <TabletFrame width={720}>
        <FrameEmergency onAccept={handleAccept} onDecline={handleDecline} />
      </TabletFrame>
    </PageLayout>
  )
}
