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

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedStudents = selectedRows.map((row) => row.original)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} students...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedStudents.length} student${selectedStudents.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} students`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedStudents = selectedRows.map((row) => row.original)
    toast.promise(sleep(2000), {
      loading: 'Inviting students...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedStudents.length} student${selectedStudents.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting students',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='student'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected students'
              title='Invite selected students'
            >
              <Mail />
              <span className='sr-only'>Invite selected students</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected students</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected students'
              title='Activate selected students'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected students</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected students</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected students'
              title='Deactivate selected students'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected students</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected students</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected students'
              title='Delete selected students'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected students</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected students</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>
    </>
  )
}
