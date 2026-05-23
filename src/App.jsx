import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DemoProvider } from './demo-store.jsx'
import DemoShell from './DemoShell.jsx'

import ScenarioSelect from './ScenarioSelect.jsx'
import SprintGapFlag from './pages/SprintGapFlag.jsx'
import SprintSMERequest from './pages/SprintSMERequest.jsx'
import SprintOnboarding from './pages/SprintOnboarding.jsx'
import SprintDashboard from './pages/SprintDashboard.jsx'
import EmergencyGapFlag from './pages/EmergencyGapFlag.jsx'
import EmergencySMERequest from './pages/EmergencySMERequest.jsx'
import EmergencyContextCard from './pages/EmergencyContextCard.jsx'
import ClientPortal from './pages/ClientPortal.jsx'
import WellArchitected from './pages/WellArchitected.jsx'
import FeatureOverview from './pages/FeatureOverview.jsx'
import EmergencyWarRoom from './pages/EmergencyWarRoom.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <DemoShell>
          <Routes>
            <Route path="/" element={<ScenarioSelect />} />
            <Route path="/overview" element={<FeatureOverview />} />
            <Route path="/sprint/gap-flag" element={<SprintGapFlag />} />
            <Route path="/sprint/sme-request" element={<SprintSMERequest />} />
            <Route path="/sprint/onboarding" element={<SprintOnboarding />} />
            <Route path="/sprint/dashboard" element={<SprintDashboard />} />
            <Route path="/emergency/gap-flag" element={<EmergencyGapFlag />} />
            <Route path="/emergency/sme-request" element={<EmergencySMERequest />} />
            <Route path="/emergency/context-card" element={<EmergencyContextCard />} />
            <Route path="/emergency/war-room" element={<EmergencyWarRoom />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/well-architected" element={<WellArchitected />} />
          </Routes>
        </DemoShell>
      </DemoProvider>
    </BrowserRouter>
  )
}
