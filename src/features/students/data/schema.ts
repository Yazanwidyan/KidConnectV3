import { z } from 'zod'

const studentStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type StudentStatus = z.infer<typeof studentStatusSchema>

const studentRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const studentSchema = z.object({
  id: z.string(),
  studentname: z.string(),
  parent1: z.string(),
  parent2: z.string(),
  age: z.number(),
  status: studentStatusSchema,
  role: studentRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Student = z.infer<typeof studentSchema>

export const studentListSchema = z.array(studentSchema)
