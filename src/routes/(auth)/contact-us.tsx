import { createFileRoute } from '@tanstack/react-router'
import ContactUs from '@/features/common/contact-us'

export const Route = createFileRoute('/(auth)/contact-us')({
  component: ContactUs,
})
