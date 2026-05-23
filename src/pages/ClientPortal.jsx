import React from 'react'
import { FrameTasoEligible } from '../screens/screen6.jsx'
import { PageLayout, StepHeader, DesktopFrame } from './shared.jsx'

export default function ClientPortal() {
  return (
    <PageLayout>
      <StepHeader
        step="Surface · Client Portal"
        title="Taso's Button"
        description="The client-facing trigger lives inside Halyard Capital's own project dashboard. Eligibility is gated on the well-architected review. One button calls the entire operating model."
      />
      <DesktopFrame width={1380} minHeight={860}>
        <FrameTasoEligible />
      </DesktopFrame>
    </PageLayout>
  )
}
