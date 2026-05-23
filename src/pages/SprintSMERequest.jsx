import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../demo-store.jsx'
import { FrameSprint, FrameProposer } from '../screens/screen2.jsx'
import { PageLayout, StepHeader, TabletFrame } from './shared.jsx'

export default function SprintSMERequest() {
  const navigate = useNavigate()
  const { set } = useDemo()
  const [view, setView] = useState('sprint') // 'sprint' | 'propose' | 'declined'

  function handleAccept() {
    set({ stage: 'onboard', smeAccepted: true })
    navigate('/sprint/onboarding')
  }

  function handleDecline() {
    setView('declined')
  }

  function handlePropose() {
    setView('propose')
  }

  function handleProposeSent() {
    // Proposal sent — show a brief confirmation then return to sprint card
    setView('proposed')
  }

  if (view === 'declined') {
    return (
      <PageLayout>
        <StepHeader
          step="Sprint Flow · Step 2 of 4"
          title="SME Declined"
          description="Priya declined the request. The system automatically routes to the next qualified SME in the network."
        />
        <div style={{
          maxWidth: 480, width: '100%',
          background: '#fff', border: '1px solid var(--line)',
          borderRadius: 8, padding: '32px 28px', textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--warning-soft)', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round">
              <path d="M10 6v5M10 14h.01"/>
              <circle cx="10" cy="10" r="8"/>
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Priya declined</div>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.55 }}>
            Next SME in queue: <strong>James Okafor</strong> · Kubernetes / GCP · UTC+1<br />
            Notifying now — response expected within 30 min.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              onClick={() => setView('sprint')}
              style={{
                padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
                background: 'var(--teal)', border: 'none',
                fontSize: 13, fontWeight: 600, color: '#fff',
              }}
            >
              ← Back to request card
            </button>
            <button
              onClick={handleAccept}
              style={{
                padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
                background: 'none', border: '1px solid var(--line)',
                fontSize: 13, color: 'var(--muted)',
              }}
            >
              Skip to onboarding →
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (view === 'proposed') {
    return (
      <PageLayout>
        <StepHeader
          step="Sprint Flow · Step 2 of 4"
          title="Proposal Sent"
          description="Priya proposed an alternative time. Marcus will be notified to confirm or find another slot."
        />
        <div style={{
          maxWidth: 480, width: '100%',
          background: '#fff', border: '1px solid var(--line)',
          borderRadius: 8, padding: '32px 28px', textAlign: 'center',
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--clay-soft)', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12M10 4l6 6-6 6"/>
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Proposal sent</div>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.55 }}>
            Priya proposed <strong>Wed May 28 · 10:00 CET</strong>. Marcus will be notified to confirm.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              onClick={() => setView('sprint')}
              style={{
                padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
                background: 'none', border: '1px solid var(--line)',
                fontSize: 13, color: 'var(--muted)',
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleAccept}
              style={{
                padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
                background: 'var(--teal)', border: 'none',
                fontSize: 13, fontWeight: 600, color: '#fff',
              }}
            >
              Continue to onboarding →
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (view === 'propose') {
    return (
      <PageLayout>
        <StepHeader
          step="Sprint Flow · Step 2 of 4"
          title="Propose a Different Time"
          description="Priya can't make the suggested slot but wants to help. She proposes an alternative."
        />
        <TabletFrame width={720}>
          <FrameProposer onBack={() => setView('sprint')} onConfirm={handleProposeSent} />
        </TabletFrame>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <StepHeader
        step="Sprint Flow · Step 2 of 4"
        title="Active Engagement Request"
        description="Priya Nair — a pre-qualified Kubernetes SME — receives a push notification the moment the system finds a match."
      />
      <TabletFrame width={720}>
        <FrameSprint onAccept={handleAccept} onDecline={handleDecline} onPropose={handlePropose} />
      </TabletFrame>
    </PageLayout>
  )
}
