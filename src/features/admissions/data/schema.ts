import { z } from 'zod'

const admissionStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
])
export type AdmissionStatus = z.infer<typeof admissionStatusSchema>

const admissionTypeSchema = z.union([
  z.literal('infants'),
  z.literal('toddlers'),
  z.literal('preschool'),
])

const admissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  maxStudents: z.number(),
  minAge: z.number(),
  maxAge: z.number(),
  status: admissionStatusSchema,
  admissionType: admissionTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Admission = z.infer<typeof admissionSchema>

export const admissionListSchema = z.array(admissionSchema)
