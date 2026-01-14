import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Admission } from '../data/schema'

type AdmissionsDialogType = 'add' | 'edit' | 'delete'

type AdmissionsContextType = {
  open: AdmissionsDialogType | null
  setOpen: (str: AdmissionsDialogType | null) => void
  currentRow: Admission | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Admission | null>>
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
  const [currentRow, setCurrentRow] = useState<Admission | null>(null)

  return (
    <AdmissionsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </AdmissionsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmissions = () => {
  const admissionsContext = React.useContext(AdmissionsContext)

  if (!admissionsContext) {
    throw new Error('useAdmissions has to be used within <AdmissionsContext>')
  }

  return admissionsContext
}
