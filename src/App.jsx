import React from 'react'
import { DesignCanvas, DCSection, DCArtboard } from './design-canvas.jsx'

import { FrameOverview } from './screens/screen-overview.jsx'
import { FrameA, FrameB, FrameC, LiveFlow } from './screens/screen1.jsx'
import { FrameSprint, FrameEmergency, FrameProposer, FrameInbox } from './screens/screen2.jsx'
import { FrameBrief, FrameBriefChecklist } from './screens/screen3.jsx'
import { FrameEmergencyCtx, FrameEmergencyCtxMobile } from './screens/screen4.jsx'
import { FrameMgmt, FrameMgmtApproval } from './screens/screen5.jsx'
import { FrameTasoEligible, FrameTasoModal, FrameTasoConfirm, FrameTasoActive, FrameTasoIneligible } from './screens/screen6.jsx'
import { FrameWarNexus, FrameWarMeridian, FrameWarThornfield } from './screens/screen7.jsx'

export default function App() {
  return (
    <DesignCanvas initialZoom={0.95}>
      <DCSection
        id="overview"
        title="Feature Overview · On-Demand Talent"
        subtitle="Team-facing explainer — what it is, what it isn't, how it works, value prop, who it's for, and the access model. 1280px wide."
      >
        <DCArtboard id="overview-full" label="Feature overview — full page" width={1280} height={2400}><FrameOverview /></DCArtboard>
      </DCSection>

      <DCSection
        id="screen1"
        title="Screen 1 · Gap Flag Interface"
        subtitle="Deployed talent · AI-proactive flow · 3 states + a live interactive variant. Mobile-aware (390 px)."
      >
        <DCArtboard id="state-a" label="A · Dashboard with suggestion" width={390} height={780}><FrameA /></DCArtboard>
        <DCArtboard id="state-b" label="B · Pre-filled request form" width={390} height={780}><FrameB /></DCArtboard>
        <DCArtboard id="state-c" label="C · Confirmation + lifecycle" width={390} height={780}><FrameC /></DCArtboard>
        <DCArtboard id="live" label="↻ Interactive — tap through it" width={390} height={780}><LiveFlow /></DCArtboard>
      </DCSection>

      <DCSection
        id="screen2"
        title="Screen 2 · Active Engagement Request"
        subtitle="What a pre-qualified SME sees the moment the system routes a match. Sprint + Emergency variants, plus the alt-time state and the in-context inbox."
      >
        <DCArtboard id="sprint" label="Sprint Support · default" width={680} height={620}><FrameSprint /></DCArtboard>
        <DCArtboard id="emergency" label="Emergency · P1 outage" width={680} height={680}><FrameEmergency /></DCArtboard>
        <DCArtboard id="propose" label="Propose different time" width={680} height={620}><FrameProposer /></DCArtboard>
        <DCArtboard id="inbox" label="In context · SME network inbox" width={1180} height={820}><FrameInbox /></DCArtboard>
      </DCSection>

      <DCSection
        id="screen3"
        title="Screen 3 · SME Onboarding Brief"
        subtitle="Full Sprint Support · AI-generated context package delivered the moment an SME accepts. Document layout — left nav, content column, right meta rail."
      >
        <DCArtboard id="brief-full" label="Full document · top of brief" width={1280} height={1100}><FrameBrief /></DCArtboard>
        <DCArtboard id="brief-quickstart" label="Day-1 view · interactive checklist" width={1280} height={780}><FrameBriefChecklist /></DCArtboard>
      </DCSection>

      <DCSection
        id="screen4"
        title="Screen 4 · Emergency Context Card"
        subtitle="Condensed outage brief delivered post-accept on the Emergency track. 8h SLA · card format · scannable in under 2 minutes."
      >
        <DCArtboard id="ectx" label="Emergency context · desktop" width={820} height={1040}><FrameEmergencyCtx /></DCArtboard>
        <DCArtboard id="ectx-mobile" label="Mobile-aware · on-call from anywhere" width={390} height={1100}><FrameEmergencyCtxMobile /></DCArtboard>
      </DCSection>

      <DCSection
        id="screen5"
        title="Screen 5 · Management Dashboard"
        subtitle="Delivery lead view. Portfolio of in-flight requests · inline approval · SLA tracking · breach risk sorts to the top."
      >
        <DCArtboard id="mgmt" label="Dashboard · default" width={1380} height={900}><FrameMgmt /></DCArtboard>
        <DCArtboard id="mgmt-approve" label="Inline approval popover" width={1380} height={900}><FrameMgmtApproval /></DCArtboard>
      </DCSection>

      <DCSection
        id="taso"
        title="Taso's Button · Client-facing surface"
        subtitle="Lives inside the client's own portal — here, Halyard Capital's project dashboard. Native to the client (dark-slate identity), opens into a Toptal-tinted modal. Eligibility gated on the well-architected review."
      >
        <DCArtboard id="taso-eligible" label="In-portal · eligible" width={1380} height={920}><FrameTasoEligible /></DCArtboard>
        <DCArtboard id="taso-modal" label="Modal · mode + AI pre-fill" width={1380} height={920}><FrameTasoModal /></DCArtboard>
        <DCArtboard id="taso-confirm" label="Confirmation · lifecycle stepper" width={1380} height={920}><FrameTasoConfirm /></DCArtboard>
        <DCArtboard id="taso-active" label="In-portal · request in flight" width={1380} height={920}><FrameTasoActive /></DCArtboard>
        <DCArtboard id="taso-ineligible" label="Not yet eligible · well-architected review" width={1380} height={920}><FrameTasoIneligible /></DCArtboard>
      </DCSection>

      <DCSection
        id="war"
        title="Well-Architected Review · Health Dashboard"
        subtitle="Internal Toptal tool. Real-time eligibility health for a Managed Services client across 4 condition categories. Three states — Partially Ready is the interactive prototype state."
      >
        <DCArtboard id="war-nexus" label="Partially ready · Nexus Capital Partners (interactive)" width={1380} height={1080}><FrameWarNexus /></DCArtboard>
        <DCArtboard id="war-meridian" label="Fully eligible · Meridian Health Systems" width={1380} height={1020}><FrameWarMeridian /></DCArtboard>
        <DCArtboard id="war-thornfield" label="Early stage · Thornfield Logistics" width={1380} height={1280}><FrameWarThornfield /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  )
}
