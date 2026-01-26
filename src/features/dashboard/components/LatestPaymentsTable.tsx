// src/components/tables/LatestPaymentsTable.tsx
import { useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Payment {
  id: number
  student: string
  amount: number
  status: 'Paid' | 'Pending' | 'Failed'
  date: string
}

interface LatestPaymentsTableProps {
  data: Payment[]
}

export const LatestPaymentsTable = ({ data }: LatestPaymentsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const columns = [
    {
      accessorKey: 'student',
      header: 'Student',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info: any) => `$${info.getValue()}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info: any) => {
        const status = info.getValue() as string
        const colors: Record<string, string> = {
          Paid: 'text-green-600',
          Pending: 'text-yellow-600',
          Failed: 'text-red-600',
        }
        return (
          <span className={cn('font-medium', colors[status])}>{status}</span>
        )
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (info: any) =>
        new Date(info.getValue() as string).toLocaleDateString(),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Optional: Pagination Controls */}
      <div className='mt-2 flex items-center justify-end space-x-2'>
        <button
          className='rounded border px-2 py-1 disabled:opacity-50'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          className='rounded border px-2 py-1 disabled:opacity-50'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}
