import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameEmergencyCtx } from '../screens/screen4.jsx'
import { PageLayout, StepHeader, DesktopFrame } from './shared.jsx'

export default function EmergencyContextCard() {
  const navigate = useNavigate()
  const { reset, set } = useDemo()

  return (
    <PageLayout>
      <StepHeader
        step="Emergency Flow · Step 3 of 4"
        title="Emergency Context Card"
        description="Condensed to outage-relevant information only. Scannable in under 2 minutes. Context valid for 4 hours — generated the moment the SME accepts."
      />
      <DesktopFrame width={860} minHeight={900}>
        <FrameEmergencyCtx onOpenWarRoom={() => navigate('/emergency/war-room')} />
      </DesktopFrame>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => { reset(); set({ mode: 'sprint', stage: 'flag' }); navigate('/sprint/gap-flag') }}
          style={{
            background: 'var(--teal)', border: 'none',
            borderRadius: 4, padding: '10px 20px',
            cursor: 'pointer', fontSize: 13.5, fontWeight: 600, color: '#fff',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--teal)'}
        >
          View sprint flow →
        </button>
        <button
          onClick={() => { reset(); navigate('/') }}
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
