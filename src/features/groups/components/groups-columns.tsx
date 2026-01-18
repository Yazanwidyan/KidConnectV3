import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes } from '../data/data'
import { type Group } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const groupsColumns: ColumnDef<Group>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Group Name' />
    ),
    cell: ({ row }) => {
      const groupId = row.original.id
      const groupName: string = row.getValue('name')

      return (
        <LongText className='max-w-44 ps-3'>
          <Link
            to='/groups/group-details/$groupId'
            params={{ groupId }}
            className='rounded-sm text-primary underline-offset-4 hover:underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none'
          >
            {groupName}
          </Link>
        </LongText>
      )
    },

    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    id: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Color' />
    ),
    cell: ({ row }) => {
      const { color } = row.original

      return (
        <div className='flex items-center gap-2'>
          <span
            className='h-4 w-4 rounded-xs border'
            style={{ backgroundColor: color }}
          />
        </div>
      )
    },
    meta: { className: 'w-36' },
  },

  {
    accessorKey: 'groupType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-x-2'>
          <span className='text-sm capitalize'>
            {row.getValue('groupType')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'totalStudents',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total Students' />
    ),
    cell: ({ row }) => {
      const { totalStudents } = row.original
      return <LongText className='max-w-36'>{totalStudents}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
