import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type AdmissionsRejectDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: any
}

export function AdmissionsRejectDialog({
  open,
  onOpenChange,
  currentRow,
}: AdmissionsRejectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject the application of{' '}
            <strong>{currentRow?.name ?? 'this applicant'}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => {
              // TODO: Add rejection logic here
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
