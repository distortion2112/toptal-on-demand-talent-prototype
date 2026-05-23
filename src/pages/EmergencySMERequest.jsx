import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameEmergency } from '../screens/screen2.jsx'
import { PageLayout, StepHeader, NextButton, TabletFrame } from './shared.jsx'

export default function EmergencySMERequest() {
  const navigate = useNavigate()
  const { set } = useDemo()

  function advance() {
    set({ stage: 'onboard', smeAccepted: true })
    navigate('/emergency/context-card')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Emergency Flow · Step 2 of 3"
        title="Emergency Engagement Request"
        description="Priya receives a P1 alert with a countdown. No counter-proposal option — emergency mode requires an immediate accept or decline. Certification is the approval."
      />
      <TabletFrame width={720}>
        <FrameEmergency />
      </TabletFrame>
      <NextButton label="Priya accepts → condensed outage brief" onClick={advance} />
    </PageLayout>
  )
}
