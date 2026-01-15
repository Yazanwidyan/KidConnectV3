import useDialogState from '@/hooks/use-dialog-state'
import React, { useState } from 'react'

type StudentsDialogType = 'invite' | 'assign' | 'edit' | 'delete'

type StudentsContextType = {
  open: StudentsDialogType | null
  setOpen: (str: StudentsDialogType | null) => void
  currentRow: any | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
}

const StudentsContext = React.createContext<StudentsContextType | null>(null)

export function GroupStudentsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<StudentsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)

  return (
    <StudentsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </StudentsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStudents = () => {
  const studentsContext = React.useContext(StudentsContext)

  if (!studentsContext) {
    throw new Error('useStudents has to be used within <StudentsContext>')
  }

  return studentsContext
}
