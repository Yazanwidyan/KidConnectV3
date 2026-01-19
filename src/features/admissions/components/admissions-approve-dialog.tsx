import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type AdmissionsApproveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: any
}

export function AdmissionsApproveDialog({
  open,
  onOpenChange,
  currentRow,
}: AdmissionsApproveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Enrollment</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve enrollment for{' '}
            <strong>{currentRow?.name ?? 'this applicant'}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // TODO: Add approval logic here
              onOpenChange(false)
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
