import React, { createContext, useContext, useState } from 'react'

const DemoCtx = createContext(null)

const INITIAL = {
  mode: null,           // 'sprint' | 'emergency'
  requestorName: 'Marcus Rivera',
  engagement: 'Halyard Capital · API Migration',
  skillGap: 'Kubernetes — cluster networking and Ingress configuration',
  smeName: 'Priya Nair',
  smeSkill: 'Kubernetes / Cloud Infrastructure',
  stage: 'flag',        // flag | match | approve | onboard | active | closed
  smeAccepted: false,
  approved: false,
}

export function DemoProvider({ children }) {
  const [state, setState] = useState(INITIAL)

  function set(patch) {
    setState(s => ({ ...s, ...patch }))
  }

  function reset() {
    setState(INITIAL)
  }

  return (
    <DemoCtx.Provider value={{ ...state, set, reset }}>
      {children}
    </DemoCtx.Provider>
  )
}

export function useDemo() {
  return useContext(DemoCtx)
}
