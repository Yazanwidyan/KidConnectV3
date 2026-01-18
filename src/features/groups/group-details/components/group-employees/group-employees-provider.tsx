import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type GroupEmployeesDialogType = 'invite' | 'assign' | 'edit' | 'delete'

type GroupEmployeesContextType = {
  open: GroupEmployeesDialogType | null
  setOpen: (str: GroupEmployeesDialogType | null) => void
  currentRow: any | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
}

const GroupEmployeesContext =
  React.createContext<GroupEmployeesContextType | null>(null)

export function GroupEmployeesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<GroupEmployeesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)

  return (
    <GroupEmployeesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </GroupEmployeesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGroupEmployees = () => {
  const groupEmployeesContext = React.useContext(GroupEmployeesContext)

  if (!groupEmployeesContext) {
    throw new Error(
      'useGroupEmployees has to be used within <GroupEmployeesContext>'
    )
  }

  return groupEmployeesContext
}
