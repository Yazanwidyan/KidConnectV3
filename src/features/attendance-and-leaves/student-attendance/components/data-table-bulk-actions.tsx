import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { StudentAttendanceMultiDeleteDialog } from './student-attendance-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedStudentAttendance = selectedRows.map(
      (row) => row.original as any
    )
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} studentAttendance...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedStudentAttendance.length} studentAttendance${selectedStudentAttendance.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} studentAttendance`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedStudentAttendance = selectedRows.map(
      (row) => row.original as any
    )
    toast.promise(sleep(2000), {
      loading: 'Inviting studentAttendance...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedStudentAttendance.length} studentAttendance${selectedStudentAttendance.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting studentAttendance',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='studentAttendance'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected studentAttendance'
              title='Invite selected studentAttendance'
            >
              <Mail />
              <span className='sr-only'>Invite selected studentAttendance</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected studentAttendance</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected studentAttendance'
              title='Activate selected studentAttendance'
            >
              <UserCheck />
              <span className='sr-only'>
                Activate selected studentAttendance
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected studentAttendance</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected studentAttendance'
              title='Deactivate selected studentAttendance'
            >
              <UserX />
              <span className='sr-only'>
                Deactivate selected studentAttendance
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected studentAttendance</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected studentAttendance'
              title='Delete selected studentAttendance'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected studentAttendance</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected studentAttendance</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <StudentAttendanceMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
