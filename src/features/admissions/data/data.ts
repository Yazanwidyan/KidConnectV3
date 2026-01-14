import { Baby,  Users } from 'lucide-react'
import { type AdmissionStatus } from './schema'

export const callTypes = new Map<AdmissionStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
])

export const admissionTypes = [
  {
    label: 'Infants',
    value: 'infants',
    icon: Baby,
  },
  {
    label: 'Toddlers',
    value: 'toddlers',
    icon: Baby,
  },
  {
    label: 'Preschool',
    value: 'preschool',
    icon: Users,
  },
] as const
