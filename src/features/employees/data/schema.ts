import { z } from 'zod'

const employeeStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type EmployeeStatus = z.infer<typeof employeeStatusSchema>

const employeeRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const employeeSchema = z.object({
  id: z.string(),
  employeename: z.string(),
  parent1: z.string(),
  parent2: z.string(),
  age: z.number(),
  status: employeeStatusSchema,
  role: employeeRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Employee = z.infer<typeof employeeSchema>

export const employeeListSchema = z.array(employeeSchema)
