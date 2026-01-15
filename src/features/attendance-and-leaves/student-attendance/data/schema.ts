import { z } from 'zod'

const studentAttendanceStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type StudentStatus = z.infer<typeof studentAttendanceStatusSchema>

const studentAttendanceRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const studentAttendanceSchema = z.object({
  id: z.string(),
  registerId:z.string(),
  studentname: z.string(),
  parent1: z.string(),
  parent2: z.string(),
  age: z.number(),
  status: studentAttendanceStatusSchema,
  role: studentAttendanceRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Student = z.infer<typeof studentAttendanceSchema>

export const studentListSchema = z.array(studentAttendanceSchema)
