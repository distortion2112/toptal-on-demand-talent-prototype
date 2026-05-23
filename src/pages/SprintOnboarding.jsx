import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameBrief } from '../screens/screen3.jsx'
import { PageLayout, StepHeader, NextButton, DesktopFrame } from './shared.jsx'

export default function SprintOnboarding() {
  const navigate = useNavigate()
  const { set } = useDemo()

  function advance() {
    set({ stage: 'approve' })
    navigate('/sprint/dashboard')
  }

  return (
    <PageLayout>
      <StepHeader
        step="Sprint Flow · Step 3 of 4"
        title="SME Onboarding Brief"
        description="The moment Priya accepts, an AI-generated context package is ready. Full engagement picture — team, sprint goals, domain context, working norms — in one scannable document."
      />
      <DesktopFrame width={1280} minHeight={900}>
        <FrameBrief />
      </DesktopFrame>
      <NextButton label="View delivery lead dashboard →" onClick={advance} />
    </PageLayout>
  )
}
