import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameMgmt } from '../screens/screen5.jsx'
import { PageLayout, StepHeader, NextButton, DesktopFrame } from './shared.jsx'

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
      <DesktopFrame width={1380} minHeight={860}>
        <FrameMgmt />
      </DesktopFrame>
      <div style={{ display: 'flex', gap: 12 }}>
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
