import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { EmergencyLiveFlow } from '../screens/screen1.jsx'
import { PageLayout, StepHeader, MobileFrame } from './shared.jsx'

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
        title="Production Incident Alert"
        description="The API Gateway is returning 503s in production. Marcus taps 'Request Emergency SME', reviews the AI-prefilled form, and submits — then hit 'See SME request' to continue."
      />
      <MobileFrame>
        <EmergencyLiveFlow onComplete={advance} />
      </MobileFrame>
    </PageLayout>
  )
}
