import { GroupDetails } from '@/features/groups/group-details'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const groupsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  status: z
    .array(
      z.union([
        z.literal('active'),
        z.literal('inactive'),
        z.literal('invited'),
        z.literal('suspended'),
      ])
    )
    .optional()
    .catch([]),
  username: z.string().optional().catch(''),
})

export const Route = createFileRoute(
  '/_authenticated/groups/group-details/$groupId'
)({
  validateSearch: groupsSearchSchema,
  component: GroupDetails,
})
