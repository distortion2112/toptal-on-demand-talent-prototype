import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { LiveFlow } from '../screens/screen1.jsx'
import { PageLayout, StepHeader, NextButton, MobileFrame } from './shared.jsx'

export default function EmergencyGapFlag() {
  const navigate = useNavigate()
  const { set } = useDemo()

  function advance() {
    set({ stage: 'match' })
    navigate('/emergency/sme-request')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Emergency Flow · Step 1 of 3"
        title="Emergency Flag Interface"
        description="Production is down. Marcus flags it as Emergency Support — the system routes to a pre-authorized fast path with an 8-hour SLA."
      />
      <div style={{
        background: 'var(--alert-soft)', border: '1px solid rgba(212,37,81,0.2)',
        borderRadius: 6, padding: '10px 16px',
        fontSize: 12.5, color: 'var(--alert)', fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 8, maxWidth: 390, width: '100%',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1L13 12H1L7 1Z" />
          <path d="M7 5V8" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="7" cy="10" r="0.7" fill="white"/>
        </svg>
        Emergency mode — pre-authorized SME fast path · 8h SLA
      </div>
      <MobileFrame>
        <LiveFlow />
      </MobileFrame>
      <NextButton label="Continue: SME receives P1 alert →" onClick={advance} />
    </PageLayout>
  )
}
