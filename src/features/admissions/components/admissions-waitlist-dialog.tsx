import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type AdmissionsWaitlistDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: any
}

export function AdmissionsWaitlistDialog({
  open,
  onOpenChange,
  currentRow,
}: AdmissionsWaitlistDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move to Waitlist</DialogTitle>
          <DialogDescription>
            Are you sure you want to move{' '}
            <strong>{currentRow?.name ?? 'this applicant'}</strong> to the
            waitlist?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // TODO: Add waitlist logic here
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
