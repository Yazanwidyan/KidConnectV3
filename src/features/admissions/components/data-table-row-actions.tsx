import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Trash2, UserPen, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAdmissions } from './admissions-provider'

type DataTableRowActionsProps = {
  row: Row<any>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useAdmissions()

  const openAction = (
    action:
      | 'edit'
      | 'delete'
      | 'moveToWaitlist'
      | 'approveEnrollment'
      | 'rejectApplication'
  ) => {
    setCurrentRow(row.original)
    setOpen(action)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56'>
        {/* ===== ADMISSION DECISIONS ===== */}
        <DropdownMenuItem onClick={() => openAction('moveToWaitlist')}>
          Move to Waitlist
          <DropdownMenuShortcut>
            <Clock size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => openAction('approveEnrollment')}
          className='text-emerald-600!'
        >
          Approve Enrollment
          <DropdownMenuShortcut>
            <CheckCircle size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => openAction('rejectApplication')}
          className='text-red-600!'
        >
          Reject Application
          <DropdownMenuShortcut>
            <XCircle size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ===== MANAGEMENT ===== */}
        <DropdownMenuItem onClick={() => openAction('edit')}>
          Edit Application
          <DropdownMenuShortcut>
            <UserPen size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => openAction('delete')}
          className='text-red-500!'
        >
          Delete Record
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
