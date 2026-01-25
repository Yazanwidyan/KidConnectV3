import { StudentDailyReport } from '@/features/reports/student-daily-report'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/student-daily-report/')({
  component: StudentDailyReport,
})
