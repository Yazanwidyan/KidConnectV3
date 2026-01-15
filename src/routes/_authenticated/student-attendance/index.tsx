import { StudentAttendance } from '@/features/attendance-and-leaves/student-attendance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/student-attendance/')({
  component: StudentAttendance,
})
