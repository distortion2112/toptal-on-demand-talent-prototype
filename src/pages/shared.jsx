import React from 'react'

export function PageLayout({ children }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '32px 24px 64px',
      minHeight: 'calc(100vh - 52px)',
      background: 'var(--paper)',
      gap: 24,
    }}>
      {children}
    </div>
  )
}

export function StepHeader({ step, title, description }) {
  return (
    <div style={{ width: '100%', maxWidth: 720, textAlign: 'center' }}>
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
        color: 'var(--teal)', marginBottom: 8,
      }}>{step}</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.55 }}>{description}</p>
    </div>
  )
}

export function NextButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
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
      {label}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5"/>
      </svg>
    </button>
  )
}

export function MobileFrame({ children }) {
  return (
    <div className="cad" style={{
      width: 390, height: 780,
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(13,29,62,0.14)',
      border: '1px solid var(--line)', flexShrink: 0,
      position: 'relative',
    }}>
      {children}
    </div>
  )
}

export function DesktopFrame({ children, width = 1280, minHeight = 800 }) {
  return (
    <div className="cad" style={{
      width: '100%', maxWidth: width, minHeight,
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(13,29,62,0.14)',
      border: '1px solid var(--line)',
    }}>
      {children}
    </div>
  )
}

export function TabletFrame({ children, width = 680 }) {
  return (
    <div className="cad" style={{
      width: '100%', maxWidth: width,
      background: '#fff', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(13,29,62,0.14)',
      border: '1px solid var(--line)', flexShrink: 0,
    }}>
      {children}
    </div>
  )
}
