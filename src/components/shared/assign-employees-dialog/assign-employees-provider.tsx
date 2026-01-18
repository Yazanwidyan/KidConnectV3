import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type AssignEmployeesDialogType = 'invite' | 'add' | 'edit' | 'delete'

type AssignEmployeesContextType = {
  open: AssignEmployeesDialogType | null
  setOpen: (str: AssignEmployeesDialogType | null) => void
  currentRow: any | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
}

const AssignEmployeesContext =
  React.createContext<AssignEmployeesContextType | null>(null)

export function AssignEmployeesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<AssignEmployeesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)

  return (
    <AssignEmployeesContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </AssignEmployeesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAssignEmployees = () => {
  const assignEmployeesContext = React.useContext(AssignEmployeesContext)

  if (!assignEmployeesContext) {
    throw new Error(
      'useAssignEmployees has to be used within <AssignEmployeesContext>'
    )
  }

  return assignEmployeesContext
}
