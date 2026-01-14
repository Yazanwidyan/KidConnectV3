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
import { type Group } from '../data/schema'
import { GroupsMultiDeleteDialog } from './groups-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    const selectedGroups = selectedRows.map((row) => row.original as Group)
    toast.promise(sleep(2000), {
      loading: `${status === 'active' ? 'Activating' : 'Deactivating'} groups...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'active' ? 'Activated' : 'Deactivated'} ${selectedGroups.length} group${selectedGroups.length > 1 ? 's' : ''}`
      },
      error: `Error ${status === 'active' ? 'activating' : 'deactivating'} groups`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedGroups = selectedRows.map((row) => row.original as Group)
    toast.promise(sleep(2000), {
      loading: 'Inviting groups...',
      success: () => {
        table.resetRowSelection()
        return `Invited ${selectedGroups.length} group${selectedGroups.length > 1 ? 's' : ''}`
      },
      error: 'Error inviting groups',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='group'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invite selected groups'
              title='Invite selected groups'
            >
              <Mail />
              <span className='sr-only'>Invite selected groups</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invite selected groups</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected groups'
              title='Activate selected groups'
            >
              <UserCheck />
              <span className='sr-only'>Activate selected groups</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected groups</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected groups'
              title='Deactivate selected groups'
            >
              <UserX />
              <span className='sr-only'>Deactivate selected groups</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected groups</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected groups'
              title='Delete selected groups'
            >
              <Trash2 />
              <span className='sr-only'>Delete selected groups</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected groups</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <GroupsMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
