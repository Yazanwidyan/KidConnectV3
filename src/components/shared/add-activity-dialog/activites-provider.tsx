// src/components/shared/add-activity-dialog/activites-provider.tsx

import React, { useState } from 'react'

export type ActivitiesDialogType =
  | 'select-activity'
  | 'potty'
  | 'food'
  | 'sleep'
  | 'upload-photo'
  | null

const ActivitiesContext = React.createContext<any | null>(null)

export function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<any>(null)

  return (
    <ActivitiesContext.Provider value={{ open, setOpen }}>
      {children}
    </ActivitiesContext.Provider>
  )
}

export function useActivities() {
  const context = React.useContext(ActivitiesContext)
  if (!context) {
    throw new Error('useActivities must be used within an <ActivitiesProvider>')
  }
  return context
}
