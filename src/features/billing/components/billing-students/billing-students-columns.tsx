import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './data-table-row-actions'

export const billingStudentsColumns: ColumnDef<any>[] = [
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
    accessorKey: 'parent1',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parent 1' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('parent1')}</LongText>
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
    accessorKey: 'parent2',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parent 2' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('parent2')}</LongText>
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
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Age' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3'>{row.getValue('age')}</LongText>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
