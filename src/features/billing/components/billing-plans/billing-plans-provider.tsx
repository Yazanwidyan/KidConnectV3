import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type PlansDialogType = 'invite' | 'assign' | 'edit' | 'delete'

type PlansContextType = {
  open: PlansDialogType | null
  setOpen: (str: PlansDialogType | null) => void
  currentRow: any | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
}

const PlansContext = React.createContext<PlansContextType | null>(null)

export function BillingPlansProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<PlansDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)

  return (
    <PlansContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PlansContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlans = () => {
  const plansContext = React.useContext(PlansContext)

  if (!plansContext) {
    throw new Error('usePlans has to be used within <PlansContext>')
  }

  return plansContext
}
