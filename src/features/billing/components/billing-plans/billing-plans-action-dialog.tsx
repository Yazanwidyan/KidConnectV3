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

const route = getRouteApi('/_authenticated/billing/')

type Props = {
  currentRow?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BillingPlansActionDialog({ open, onOpenChange }: Props) {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen overflow-y-scroll sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Assign Plan</DialogTitle>
        </DialogHeader>

        <DialogFooter className='flex justify-between'>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
