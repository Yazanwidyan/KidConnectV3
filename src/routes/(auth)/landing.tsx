import { createFileRoute } from '@tanstack/react-router'
import Landing from '@/features/common/landing'

export const Route = createFileRoute('/(auth)/landing')({
  component: Landing,
})
