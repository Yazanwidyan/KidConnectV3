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
import { AdmissionsMultiDeleteDialog } from './admissions-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedAdmissions = selectedRows.map((row) => row.original as any)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} admissions...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedAdmissions.length} admission${selectedAdmissions.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} admissions`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedAdmissions = selectedRows.map((row) => row.original as any)
    toast.promise(sleep(2000), {
      loading: 'Inviting admissions...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedAdmissions.length} admission${selectedAdmissions.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting admissions',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='admission'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected admissions'
              title='Invite selected admissions'
            >
              <Mail />
              <span className='sr-only'>Invite selected admissions</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected admissions</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected admissions'
              title='Activate selected admissions'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected admissions</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected admissions</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected admissions'
              title='Deactivate selected admissions'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected admissions</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected admissions</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected admissions'
              title='Delete selected admissions'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected admissions</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected admissions</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <AdmissionsMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
