import { z } from 'zod'

const groupStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
])
export type GroupStatus = z.infer<typeof groupStatusSchema>

export const groupTypeSchema = z.union([
  z.literal('infants'),
  z.literal('toddlers'),
  z.literal('preschool'),
])

const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  totalStudents:z.number(),
  maxStudents: z.number(),
  minAge: z.number(),
  maxAge: z.number(),
  status: groupStatusSchema,
  ageRange:z.number(),
  groupType: groupTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Group = z.infer<typeof groupSchema>

export const groupListSchema = z.array(groupSchema)
