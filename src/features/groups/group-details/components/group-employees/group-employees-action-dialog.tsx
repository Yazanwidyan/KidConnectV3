'use client'

import { getRouteApi } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AssignEmployeesProvider } from '@/components/shared/assign-employees-dialog/assign-employees-provider'
import { AssignEmployeesTable } from '@/components/shared/assign-employees-dialog/assign-employees-table'
import { employees } from '@/features/employees/data/employees'

const route = getRouteApi('/_authenticated/groups/group-details/$groupId')

type Props = {
  currentRow?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupEmployeesActionDialog({ open, onOpenChange }: Props) {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen overflow-y-scroll sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Assign Employees</DialogTitle>
        </DialogHeader>

        <AssignEmployeesProvider>
          <AssignEmployeesTable
            data={employees}
            search={search}
            navigate={navigate}
          />
        </AssignEmployeesProvider>

        <DialogFooter className='flex justify-between'>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
