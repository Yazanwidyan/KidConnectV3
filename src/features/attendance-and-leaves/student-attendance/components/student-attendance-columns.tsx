import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes } from '../data/data'
import { type Student } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const studentAttendanceColumns: ColumnDef<Student>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('max-md:sticky start-0 z-10 rounded-tl-[inherit]'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'profilePic',
    header: ({ column }) => <DataTableColumnHeader column={column} title='' />,
    cell: ({ row }) => {
      const profilePic: string = row.getValue('profilePic')
      const studentName: string = row.getValue('studentname')
      return (
        <div className='flex items-center ps-3'>
          <img
            src={profilePic}
            alt={`${studentName} profile`}
            className='h-8 w-8 rounded-full object-cover'
            loading='lazy'
            draggable={false}
          />
        </div>
      )
    },
    meta: {
      className: cn('max-md:sticky start-0 z-10 rounded-tl-[inherit]'),
    },
    enableSorting: false,
    enableHiding: false,
    size: 50, // optional, to control column width
  },
  {
    accessorKey: 'studentname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Student Name' />
    ),
    cell: ({ row }) => {
      const studentId = row.original.id
      const studentName: string = row.getValue('studentname')

      return (
        <LongText className='max-w-44 ps-3'>
          <Link
            to='/students/student-details/$studentId'
            params={{ studentId }}
            className='rounded-sm text-primary underline-offset-4 hover:underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none'
          >
            {studentName}
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
    accessorKey: 'groupName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Group Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('groupName')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableSorting: false,
  },
  {
    accessorKey: 'checkIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='	Check In' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('checkIn')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableSorting: false,
  },
  {
    accessorKey: 'checkOut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check Out' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('checkOut')}</LongText>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'absent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Marked Absent' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('absent')}</LongText>
    ),
    enableSorting: true,
    enableHiding: false,
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
