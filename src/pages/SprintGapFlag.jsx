import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { LiveFlow } from '../screens/screen1.jsx'
import { PageLayout, StepHeader, MobileFrame } from './shared.jsx'

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
        description="Marcus sees an AI-generated suggestion. Tap 'Flag it', fill in the form, and submit — the confirmation screen has a 'See SME request' button to continue the demo."
      />
      <MobileFrame>
        <LiveFlow onComplete={advance} />
      </MobileFrame>
    </PageLayout>
  )
}
