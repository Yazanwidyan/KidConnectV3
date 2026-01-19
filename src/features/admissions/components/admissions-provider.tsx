import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

export type AdmissionsDialogType =
  | 'add'
  | 'edit'
  | 'delete'
  | 'invite'
  | 'moveToWaitlist'
  | 'approveEnrollment'
  | 'rejectApplication'

type AdmissionsContextType = {
  open: AdmissionsDialogType | null
  setOpen: (value: AdmissionsDialogType | null) => void
  currentRow: any | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
}

const AdmissionsContext = React.createContext<AdmissionsContextType | null>(
  null
)

export function AdmissionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<AdmissionsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)

  return (
    <AdmissionsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </AdmissionsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmissions = () => {
  const admissionsContext = React.useContext(AdmissionsContext)

  if (!admissionsContext) {
    throw new Error('useAdmissions must be used within <AdmissionsProvider>')
  }

  return admissionsContext
}
