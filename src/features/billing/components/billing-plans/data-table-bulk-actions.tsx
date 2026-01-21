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
    const selectedPlans = selectedRows.map((row) => row.original)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} plans...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedPlans.length} plan${selectedPlans.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} plans`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedPlans = selectedRows.map((row) => row.original)
    toast.promise(sleep(2000), {
      loading: 'Inviting plans...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedPlans.length} plan${selectedPlans.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting plans',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='plan'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected plans'
              title='Invite selected plans'
            >
              <Mail />
              <span className='sr-only'>Invite selected plans</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected plans</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected plans'
              title='Activate selected plans'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected plans</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected plans</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected plans'
              title='Deactivate selected plans'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected plans</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected plans</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected plans'
              title='Delete selected plans'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected plans</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected plans</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>
    </>
  )
}
