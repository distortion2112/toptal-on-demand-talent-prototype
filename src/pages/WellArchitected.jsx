import React, { useState } from 'react'
import { FrameWarNexus, FrameWarMeridian, FrameWarThornfield } from '../screens/screen7.jsx'
import { PageLayout, StepHeader, DesktopFrame } from './shared.jsx'

const CLIENTS = [
  { key: 'nexus', label: 'Nexus Capital — Partially Ready', badge: 'PENDING', badgeColor: '#F59E0B' },
  { key: 'meridian', label: 'Meridian Health — Fully Eligible', badge: 'ELIGIBLE', badgeColor: '#07947C' },
  { key: 'thornfield', label: 'Thornfield Logistics — Not Eligible', badge: 'NOT ELIGIBLE', badgeColor: '#D42551' },
]

export default function WellArchitected() {
  const [active, setActive] = useState('nexus')

  return (
    <PageLayout>
      <StepHeader
        step="Surface · Internal Tool"
        title="Well-Architected Review Dashboard"
        description="Delivery leads monitor whether a Managed Services client meets all conditions required for on-demand talent eligibility. Switch between clients to see the three states."
      />

      {/* Client switcher */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {CLIENTS.map(c => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            style={{
              padding: '7px 14px', borderRadius: 4, cursor: 'pointer',
              border: `1px solid ${active === c.key ? c.badgeColor : 'var(--line)'}`,
              background: active === c.key ? c.badgeColor + '14' : '#fff',
              fontSize: 12.5, fontWeight: active === c.key ? 600 : 400,
              color: active === c.key ? c.badgeColor : 'var(--muted)',
              display: 'flex', alignItems: 'center', gap: 7,
              transition: 'all 0.15s',
            }}
          >
            <span style={{
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em',
              padding: '1px 5px', borderRadius: 999,
              background: c.badgeColor, color: '#fff',
            }}>
              {c.badge}
            </span>
            {c.label.split('—')[0].trim()}
          </button>
        ))}
      </div>

      <DesktopFrame width={1380} minHeight={960}>
        {active === 'nexus' && <FrameWarNexus />}
        {active === 'meridian' && <FrameWarMeridian />}
        {active === 'thornfield' && <FrameWarThornfield />}
      </DesktopFrame>
    </PageLayout>
  )
}
