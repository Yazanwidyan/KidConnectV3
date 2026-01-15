import useDialogState from '@/hooks/use-dialog-state'
import React, { useState } from 'react'

type StudentAttendanceDialogType = 'add' | 'edit' | 'delete'

type StudentAttendanceContextType = {
  open: StudentAttendanceDialogType | null
  setOpen: (str: StudentAttendanceDialogType | null) => void
  currentRow: any | null
  setCurrentRow: React.Dispatch<React.SetStateAction<any | null>>
}

const StudentAttendanceContext =
  React.createContext<StudentAttendanceContextType | null>(null)

export function StudentAttendanceProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<StudentAttendanceDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any | null>(null)

  return (
    <StudentAttendanceContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </StudentAttendanceContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStudentAttendance = () => {
  const studentAttendanceContext = React.useContext(StudentAttendanceContext)

  if (!studentAttendanceContext) {
    throw new Error(
      'useStudentAttendance has to be used within <StudentAttendanceContext>'
    )
  }

  return studentAttendanceContext
}
