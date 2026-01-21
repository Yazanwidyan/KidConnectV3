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
import { AssignStudentsProvider } from '@/components/shared/assign-students-dialog/assign-students-provider'
import { AssignStudentsTable } from '@/components/shared/assign-students-dialog/assign-students-table'
import { students } from '@/features/students/data/students'

const route = getRouteApi('/_authenticated/billing/')

type Props = {
  currentRow?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BillingStudentsActionDialog({ open, onOpenChange }: Props) {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen overflow-y-scroll sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Assign Student</DialogTitle>
        </DialogHeader>

        <AssignStudentsProvider>
          <AssignStudentsTable
            data={students}
            search={search}
            navigate={navigate}
          />
        </AssignStudentsProvider>

        <DialogFooter className='flex justify-between'>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
