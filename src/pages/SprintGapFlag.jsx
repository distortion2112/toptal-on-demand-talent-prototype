import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { LiveFlow } from '../screens/screen1.jsx'
import { StepHeader, NextButton } from './shared.jsx'

export default function SprintGapFlag() {
  const navigate = useNavigate()
  const { set } = useDemo()

  function advance() {
    set({ stage: 'match' })
    navigate('/sprint/sme-request')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Sprint Flow · Step 1 of 4"
        title="Gap Flag Interface"
        description="Deployed talent sees an AI-generated suggestion and submits a request in 3 interactions or fewer."
      />
      <MobileFrame>
        <LiveFlow />
      </MobileFrame>
      <NextButton label="Continue: SME receives the request →" onClick={advance} />
    </PageLayout>
  )
}

function PageLayout({ children }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '32px 24px 64px',
      minHeight: 'calc(100vh - 52px)',
      background: 'var(--paper)',
      gap: 24,
    }}>
      {children}
    </div>
  )
}

function MobileFrame({ children }) {
  return (
    <div className="cad" style={{
      width: 390, minHeight: 700,
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(13,29,62,0.14)',
      border: '1px solid var(--line)', flexShrink: 0,
    }}>
      {children}
    </div>
  )
}
