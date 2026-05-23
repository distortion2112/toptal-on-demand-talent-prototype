import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameSprint } from '../screens/screen2.jsx'
import { PageLayout, StepHeader, NextButton, TabletFrame } from './shared.jsx'

export default function SprintSMERequest() {
  const navigate = useNavigate()
  const { set } = useDemo()

  function advance() {
    set({ stage: 'onboard', smeAccepted: true })
    navigate('/sprint/onboarding')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Sprint Flow · Step 2 of 4"
        title="Active Engagement Request"
        description="Priya Nair — a pre-qualified SME in the network — receives a push notification the moment the system finds a match. She can accept, decline, or propose a different time."
      />
      <TabletFrame width={720}>
        <FrameSprint />
      </TabletFrame>
      <NextButton label="Priya accepts → onboarding brief generated" onClick={advance} />
    </PageLayout>
  )
}
