import React from 'react'

/* ─── Design tokens (mirror CSS vars for inline use) ─── */
const T = {
  navy:      '#0D1D3E',
  teal:      '#07947C',
  blue:      '#204ECF',
  alert:     '#D42551',
  muted:     '#626679',
  lightBg:   '#F4F6FB',
  tableAlt:  '#EDF1FD',
  body:      '#2D2D2D',
  white:     '#FFFFFF',
  line:      '#E3E8F2',
  lineStrong:'#C7CFE0',
  lineSoft:  '#EDF1FD',
  tealSoft:  '#E5F5F1',
  tealInk:   '#056E5B',
  alertSoft: '#FCE6EC',
  surface:   '#FFFFFF',
  amber:     '#F59E0B',
  amberSoft: '#FEF3DB',
}

const sans = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const mono = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace'

/* ─── Shared micro-components ─── */

function Label({ children, style }) {
  return (
    <div style={{
      fontFamily: mono, fontSize: 10, fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      color: T.muted, marginBottom: 6, ...style
    }}>{children}</div>
  )
}

function Pill({ children, color = T.teal, bg, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: bg ?? T.tealSoft, color: color ?? T.tealInk,
      fontFamily: mono, fontSize: 10, fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '2px 8px', borderRadius: 999, ...style
    }}>{children}</span>
  )
}

/* ─── Section 0: Hero ─── */
function Hero() {
  return (
    <div style={{
      background: T.navy, color: T.white,
      padding: '56px 64px 52px',
      display: 'grid', gridTemplateColumns: '1fr auto',
      gap: 48, alignItems: 'end',
    }}>
      <div>
        {/* Brand mark */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: mono, fontSize: 11, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', marginBottom: 28,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: 2,
            background: T.teal, display: 'inline-block',
          }}/>
          Toptal AI Practice
        </div>

        {/* Title */}
        <div style={{
          fontFamily: sans, fontSize: 52, fontWeight: 600,
          letterSpacing: '-0.03em', lineHeight: 1.05,
          marginBottom: 18, color: T.white,
        }}>
          On-Demand Talent
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: sans, fontSize: 18, fontWeight: 400,
          color: 'rgba(255,255,255,0.62)', lineHeight: 1.5,
          maxWidth: '54ch', marginBottom: 36,
        }}>
          A delivery continuity capability that lets Toptal teams pull a certified expert
          into an active engagement in hours — without starting a new placement process.
        </div>

        {/* Two mode pills */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, padding: '10px 16px',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: 2,
              background: T.teal,
            }}/>
            <div>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.white }}>Full Sprint Support</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginTop: 1 }}>72H ONBOARDING SLA</div>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(212,37,81,0.15)',
            border: '1px solid rgba(212,37,81,0.3)',
            borderRadius: 8, padding: '10px 16px',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: 2,
              background: T.alert,
            }}/>
            <div>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.white }}>Emergency Support</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginTop: 1 }}>8H SLA · AI PLATFORM REQUIRED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: stat cluster */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 2,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12, padding: '28px 32px', minWidth: 220,
      }}>
        {[
          { k: 'Sprint support SLA', v: '72h' },
          { k: 'Emergency SLA', v: '8h' },
          { k: 'Lifecycle phases', v: '6' },
          { k: 'Trigger', v: 'Talent-initiated' },
        ].map(({ k, v }, i) => (
          <div key={k} style={{
            padding: '14px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 }}>{k}</div>
            <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: T.white }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section 1: Is / Isn't ─── */
function IsIsnt() {
  const IS = [
    'A delivery continuity system embedded in active Toptal engagements',
    'Talent-triggered — the people closest to the gap flag it',
    'Full lifecycle managed: flag → match → approve → onboard → close/convert',
    'A two-sided system with a pre-qualified, certified SME supply network',
    'Configurable approval model: pre-authorized or case-by-case',
    'Convertible: sprint engagements can become long-term placements',
  ]
  const ISNT = [
    'A faster version of the standard Toptal placement process',
    'Client-initiated self-serve (that\'s Taso\'s button — one UI surface on top of this)',
    'Available without a well-architected review for Managed Services clients',
    'A fixed SLA for all engagements — speed is configurable per context',
    'Dependent on the AI platform for Full Sprint Support mode',
    'A replacement for delivery management judgment — humans stay in the loop',
  ]

  return (
    <div style={{ padding: '52px 64px', background: T.white, borderBottom: `1px solid ${T.line}` }}>
      <Label style={{ marginBottom: 20, fontSize: 11 }}>Feature definition</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* IS */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: T.tealSoft, display: 'grid', placeItems: 'center',
            }}>
              <CheckIco color={T.teal} />
            </div>
            <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: T.navy }}>What it is</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {IS.map((s, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '11px 14px',
                background: T.lightBg, borderRadius: 8,
                border: `1px solid ${T.lineSoft}`,
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4,
                  background: T.teal, display: 'grid', placeItems: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <CheckIco color="#fff" size={9} />
                </div>
                <div style={{ fontFamily: sans, fontSize: 13.5, color: T.body, lineHeight: 1.45, letterSpacing: '-0.005em' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ISN'T */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: T.alertSoft, display: 'grid', placeItems: 'center',
            }}>
              <XIco color={T.alert} />
            </div>
            <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: T.navy }}>What it isn't</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ISNT.map((s, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '11px 14px',
                background: T.lightBg, borderRadius: 8,
                border: `1px solid ${T.lineSoft}`,
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4,
                  background: '#eee', display: 'grid', placeItems: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <XIco color={T.muted} size={9} />
                </div>
                <div style={{ fontFamily: sans, fontSize: 13.5, color: T.muted, lineHeight: 1.45, letterSpacing: '-0.005em' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Section 2: How it works — Lifecycle ─── */
function HowItWorks() {
  const stages = [
    {
      id: 'FLAG', label: 'Flag', color: T.navy,
      who: 'Deployed talent',
      what: 'AI detects a skill gap from engagement signals or talent flags manually. Max 3 interactions to submit.',
    },
    {
      id: 'MATCH', label: 'Match', color: T.blue,
      who: 'Platform',
      what: 'System searches the pre-qualified SME network. If a certified, available match exists, it pings them directly.',
    },
    {
      id: 'APPROVE', label: 'Approve', color: T.teal,
      who: 'Management / Auto',
      what: 'Pre-authorized budgets skip this step. Case-by-case requests route to delivery lead for one-click approval.',
    },
    {
      id: 'ONBOARD', label: 'Onboard', color: T.teal,
      who: 'AI Platform',
      what: 'AI generates a context package. Full brief (72h) or condensed outage card (8h Emergency). SME is productive fast.',
    },
    {
      id: 'ACTIVE', label: 'Active', color: '#1A7A65',
      who: 'SME + Team',
      what: 'SME works within the engagement for the sprint. Status visible to requestor and management throughout.',
    },
    {
      id: 'CLOSE', label: 'Close / Convert', color: T.navy,
      who: 'Delivery lead',
      what: 'Clean handoff at sprint end, extension, or conversion to long-term placement if the gap is structural.',
    },
  ]

  return (
    <div style={{ padding: '52px 64px', background: T.lightBg, borderBottom: `1px solid ${T.line}` }}>
      <Label style={{ marginBottom: 8, fontSize: 11 }}>Lifecycle</Label>
      <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: T.navy, marginBottom: 36 }}>
        How it works
      </div>

      {/* Flow strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, position: 'relative' }}>
        {/* Connector line */}
        <div style={{
          position: 'absolute', top: 20, left: '8%', right: '8%',
          height: 2, background: `linear-gradient(90deg, ${T.navy}, ${T.teal})`,
          zIndex: 0,
        }}/>

        {stages.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, padding: '0 6px' }}>
            {/* Node */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: s.color, color: T.white,
              display: 'grid', placeItems: 'center',
              fontFamily: mono, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.05em',
              border: `3px solid ${T.lightBg}`,
              boxShadow: `0 0 0 2px ${s.color}`,
              marginBottom: 14,
            }}>
              {i + 1}
            </div>

            {/* Stage card */}
            <div style={{
              background: T.surface, border: `1px solid ${T.line}`,
              borderRadius: 10, padding: '14px 14px',
              width: '100%',
              borderTop: `3px solid ${s.color}`,
            }}>
              <div style={{ fontFamily: mono, fontSize: 9.5, color: s.color, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>{s.id}</div>
              <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.navy, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: mono, fontSize: 9.5, color: T.muted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>{s.who}</div>
              <div style={{ fontFamily: sans, fontSize: 12, color: T.body, lineHeight: 1.5 }}>{s.what}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section 3: Two Modes ─── */
function TwoModes() {
  const rows = [
    { label: 'Trigger', sprint: 'Talent flags a skill gap during delivery', emergency: 'Talent flags a production outage or critical blocker' },
    { label: 'Onboarding SLA', sprint: '72 hours', emergency: '8 hours', emergencyHighlight: true },
    { label: 'Context delivered', sprint: 'Full engagement picture — client overview, team, sprint goals, domain context, working norms', emergency: 'Condensed to outage-relevant info only — what broke, what changed, who to call, runbooks' },
    { label: 'AI platform required', sprint: 'No — accelerates onboarding but does not gate access', emergency: 'Yes — 8h SLA is not achievable without AI-compressed context' },
    { label: 'Approval model', sprint: 'Pre-authorized or case-by-case (configurable per engagement)', emergency: 'Pre-authorized only — case-by-case is incompatible with 8h SLA' },
    { label: 'Active SME fast path', sprint: 'Pre-qualified SME match → accept → skip approval queue', emergency: 'Pre-qualified SME match → accept → skip approval queue' },
    { label: 'Conversion path', sprint: 'Sprint extension or long-term placement', emergency: 'Long-term placement if gap is structural' },
  ]

  return (
    <div style={{ padding: '52px 64px', background: T.white, borderBottom: `1px solid ${T.line}` }}>
      <Label style={{ marginBottom: 8, fontSize: 11 }}>Operating modes</Label>
      <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: T.navy, marginBottom: 32 }}>
        Two architecturally distinct modes
      </div>

      <div style={{ border: `1px solid ${T.line}`, borderRadius: 10, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', background: T.navy }}>
          <div style={{ padding: '16px 20px' }}/>
          <div style={{ padding: '16px 24px', borderLeft: `1px solid rgba(255,255,255,0.1)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: T.teal }}/>
              <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.white }}>Full Sprint Support</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginTop: 4 }}>72H ONBOARDING SLA</div>
          </div>
          <div style={{ padding: '16px 24px', borderLeft: `1px solid rgba(255,255,255,0.1)`, background: 'rgba(212,37,81,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: T.alert }}/>
              <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: T.white }}>Emergency Support</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginTop: 4 }}>8H SLA · AI PLATFORM REQUIRED</div>
          </div>
        </div>

        {/* Rows */}
        {rows.map((r, i) => (
          <div key={r.label} style={{
            display: 'grid', gridTemplateColumns: '180px 1fr 1fr',
            borderTop: `1px solid ${T.line}`,
            background: i % 2 === 0 ? T.white : T.lightBg,
          }}>
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, color: T.muted, letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 2 }}>{r.label}</div>
            </div>
            <div style={{ padding: '14px 24px', borderLeft: `1px solid ${T.line}` }}>
              <div style={{ fontFamily: sans, fontSize: 13, color: T.body, lineHeight: 1.5 }}>{r.sprint}</div>
            </div>
            <div style={{
              padding: '14px 24px', borderLeft: `1px solid ${T.line}`,
              background: r.emergencyHighlight ? T.alertSoft : 'transparent',
            }}>
              <div style={{
                fontFamily: sans, fontSize: 13, lineHeight: 1.5,
                color: r.emergencyHighlight ? T.alert : T.body,
                fontWeight: r.emergencyHighlight ? 700 : 400,
              }}>{r.emergency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section 4: Value drivers ─── */
function ValueDrivers() {
  const cards = [
    {
      label: 'Delivery continuity',
      headline: 'Outcomes, not headcount',
      body: 'When a skill gap opens mid-sprint, the team doesn\'t wait for a new placement cycle. A certified SME can be active within a sprint — keeping commitments intact.',
      color: T.teal,
      bg: T.tealSoft,
    },
    {
      label: 'Speed',
      headline: '72h or 8h to productive',
      body: 'AI-generated onboarding briefs compress context transfer from days to hours. The SME arrives with full engagement context — not a blank slate.',
      color: T.blue,
      bg: T.tableAlt,
    },
    {
      label: 'Revenue optionality',
      headline: 'Sprint → long-term placement',
      body: 'Every on-demand engagement has a conversion path. A sprint that reveals a structural gap becomes a long-term placement — without restarting the matching process.',
      color: T.navy,
      bg: T.lightBg,
    },
    {
      label: 'Supply differentiation',
      headline: 'Pre-certified SME network',
      body: 'The SME network is a Toptal-exclusive supply asset. Certification by skill domain means every on-demand resource has been pre-qualified — not just available.',
      color: '#7C3AED',
      bg: '#F5F3FF',
    },
  ]

  return (
    <div style={{ padding: '52px 64px', background: T.lightBg, borderBottom: `1px solid ${T.line}` }}>
      <Label style={{ marginBottom: 8, fontSize: 11 }}>Value proposition</Label>
      <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: T.navy, marginBottom: 32 }}>
        What it drives
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {cards.map((c) => (
          <div key={c.label} style={{
            background: T.surface, border: `1px solid ${T.line}`,
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{ height: 4, background: c.color }}/>
            <div style={{ padding: '20px 20px 24px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: c.bg, color: c.color,
                fontFamily: mono, fontSize: 9.5, fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                padding: '2px 8px', borderRadius: 999, marginBottom: 14,
              }}>{c.label}</div>
              <div style={{
                fontFamily: sans, fontSize: 16, fontWeight: 600,
                letterSpacing: '-0.015em', color: T.navy,
                lineHeight: 1.25, marginBottom: 10,
              }}>{c.headline}</div>
              <div style={{
                fontFamily: sans, fontSize: 13, color: T.muted,
                lineHeight: 1.58,
              }}>{c.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section 5: Who it's for ─── */
function WhoItsFor() {
  const personas = [
    {
      role: 'Deployed Talent',
      trigger: 'Demand side',
      color: T.navy,
      description: 'The engineers and specialists already working inside a client engagement. They are closest to the gap — so they flag it.',
      actions: [
        'Receive AI-generated suggestion card when gap signals threshold',
        'Flag the gap manually at any time (sidebar, Slack)',
        'Track request status through full lifecycle',
        'Convert sprint SME to long-term placement request',
      ],
      gate: 'No gate — all deployed Toptal talent',
    },
    {
      role: 'Certified SMEs',
      trigger: 'Supply side',
      color: T.teal,
      description: 'Toptal network talent who have completed domain-specific certification. Eligible for active engagement — system reaches out directly when a match is found.',
      actions: [
        'Complete training and certification by skill domain',
        'Set sprint-level availability windows',
        'Receive active engagement request card — accept in one tap',
        'Access AI-generated onboarding brief immediately on accept',
      ],
      gate: 'Requires: domain certification + availability set',
    },
    {
      role: 'Delivery Management',
      trigger: 'Operations',
      color: T.blue,
      description: 'Toptal delivery leads and account managers who monitor engagement health and hold approval authority for case-by-case requests.',
      actions: [
        'Portfolio view of all in-flight requests across engagements',
        'One-click inline approval for case-by-case requests',
        'SLA breach alerting (amber at 50%, red at 80%)',
        'Export eligibility and status reports for client sharing',
      ],
      gate: 'Internal Toptal role — no access gate',
    },
  ]

  return (
    <div style={{ padding: '52px 64px', background: T.white, borderBottom: `1px solid ${T.line}` }}>
      <Label style={{ marginBottom: 8, fontSize: 11 }}>Personas</Label>
      <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: T.navy, marginBottom: 32 }}>
        Who it's for
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {personas.map((p) => (
          <div key={p.role} style={{
            border: `1px solid ${T.line}`, borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{ padding: '22px 24px 0', background: T.surface }}>
              <div style={{
                fontFamily: mono, fontSize: 9.5, fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: p.color, marginBottom: 8,
              }}>{p.trigger}</div>
              <div style={{
                fontFamily: sans, fontSize: 18, fontWeight: 600,
                letterSpacing: '-0.018em', color: T.navy, marginBottom: 10,
              }}>{p.role}</div>
              <div style={{
                fontFamily: sans, fontSize: 13, color: T.muted,
                lineHeight: 1.55, marginBottom: 20,
              }}>{p.description}</div>
            </div>

            <div style={{ background: T.lightBg, padding: '16px 24px', borderTop: `1px solid ${T.lineSoft}` }}>
              <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 600, color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Key interactions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {p.actions.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: 3,
                      background: p.color, flexShrink: 0, marginTop: 2,
                      display: 'grid', placeItems: 'center',
                    }}>
                      <CheckIco color="#fff" size={8} />
                    </div>
                    <div style={{ fontFamily: sans, fontSize: 12.5, color: T.body, lineHeight: 1.45 }}>{a}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '12px 24px',
              background: T.surface,
              borderTop: `1px solid ${T.lineSoft}`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: 1, background: p.color, flexShrink: 0,
              }}/>
              <div style={{ fontFamily: mono, fontSize: 10, color: T.muted, letterSpacing: '0.04em' }}>{p.gate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section 6: Access Model ─── */
function AccessModel() {
  return (
    <div style={{ padding: '52px 64px', background: T.lightBg }}>
      <Label style={{ marginBottom: 8, fontSize: 11 }}>Access model</Label>
      <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: T.navy, marginBottom: 32 }}>
        Who can access it
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Toptal-deployed teams */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`,
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{ background: T.navy, padding: '20px 24px' }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Track A</div>
            <div style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: T.white }}>Toptal-Deployed Teams</div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: T.tealSoft, color: T.tealInk,
              fontFamily: mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 999, marginBottom: 14,
            }}>
              <CheckIco color={T.tealInk} size={9}/> No gate — all active engagements
            </div>
            <div style={{ fontFamily: sans, fontSize: 13.5, color: T.body, lineHeight: 1.55, marginBottom: 16 }}>
              Any Toptal delivery team on an active engagement can access on-demand talent. Both modes are available subject to standard approval configuration.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Full Sprint Support', '72h SLA', T.teal],
                ['Emergency Support', '8h SLA · AI platform required', T.alert],
              ].map(([mode, note, color]) => (
                <div key={mode} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', background: T.lightBg,
                  border: `1px solid ${T.lineSoft}`, borderRadius: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 1, background: color }}/>
                    <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.navy }}>{mode}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: T.muted, letterSpacing: '0.04em' }}>{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Managed Services */}
        <div style={{
          background: T.surface, border: `1px solid ${T.line}`,
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{ background: '#1A1A2E', padding: '20px 24px' }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Track B</div>
            <div style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: T.white }}>Managed Services Clients</div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: T.amberSoft, color: '#92400E',
              fontFamily: mono, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 999, marginBottom: 14,
            }}>
              ⬡ Gated — well-architected review required
            </div>
            <div style={{ fontFamily: sans, fontSize: 13.5, color: T.body, lineHeight: 1.55, marginBottom: 16 }}>
              Managed Services clients must pass Toptal's well-architected review before accessing on-demand talent. Relationship tenure and spend are not qualifying criteria.
            </div>

            {/* Review gate conditions */}
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 600, color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Four conditions required</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Platform Readiness — AI stack deployed and operational',
                'Security & Compliance — threat model + governance active',
                'Engagement Maturity — capability profile P3 or above',
                'Certification Checklist — Toptal-administered review passed',
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '9px 12px', background: T.lightBg,
                  border: `1px solid ${T.lineSoft}`, borderRadius: 7,
                }}>
                  <div style={{
                    fontFamily: mono, fontSize: 10, fontWeight: 700,
                    color: T.muted, width: 14, flexShrink: 0, paddingTop: 1,
                  }}>0{i + 1}</div>
                  <div style={{ fontFamily: sans, fontSize: 12.5, color: T.body, lineHeight: 1.45 }}>{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Tiny SVG icons ─── */
function CheckIco({ color = '#fff', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5.5 L4.2 7.8 L8.5 3"/>
    </svg>
  )
}
function XIco({ color = '#fff', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M2.5 2.5 L7.5 7.5 M7.5 2.5 L2.5 7.5"/>
    </svg>
  )
}

/* ─── Root export ─── */
export function FrameOverview() {
  return (
    <div style={{ fontFamily: sans, background: T.lightBg, width: '100%', height: '100%', overflowY: 'auto' }}>
      <Hero />
      <IsIsnt />
      <HowItWorks />
      <TwoModes />
      <ValueDrivers />
      <WhoItsFor />
      <AccessModel />

      {/* Footer */}
      <div style={{
        padding: '22px 64px',
        background: T.navy,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: T.teal }}/>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>TOPTAL AI PRACTICE · ON-DEMAND TALENT · v0.1</div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 10.5, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>INTERNAL · DRAFT · 2026-05-23</div>
      </div>
    </div>
  )
}
