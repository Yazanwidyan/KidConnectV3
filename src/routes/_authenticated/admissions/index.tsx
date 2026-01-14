import { Admissions } from '@/features/admissions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admissions/')({
  component: Admissions,
})
