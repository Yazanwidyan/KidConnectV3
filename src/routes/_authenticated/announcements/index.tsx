import { Announcements } from '@/features/announcements'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/announcements/')({
  component: Announcements,
})
