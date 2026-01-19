import { AdmissionsActionDialog } from './admissions-action-dialog'
import { AdmissionsApproveDialog } from './admissions-approve-dialog'
import { AdmissionsDeleteDialog } from './admissions-delete-dialog'
import { AdmissionsInviteDialog } from './admissions-invite-dialog'
import { useAdmissions } from './admissions-provider'
import { AdmissionsRejectDialog } from './admissions-reject-dialog'
import { AdmissionsWaitlistDialog } from './admissions-waitlist-dialog'

export function AdmissionsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAdmissions()

  return (
    <>
      {/* ADD */}
      <AdmissionsActionDialog
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null)
        }}
      />

      <AdmissionsInviteDialog
        key='admission-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {/* EDIT + DELETE + OTHER ACTIONS (require a selected row) */}
      {currentRow && (
        <>
          <AdmissionsActionDialog
            open={open === 'edit'}
            currentRow={currentRow}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => setCurrentRow(null), 200)
              }
            }}
          />

          <AdmissionsDeleteDialog
            open={open === 'delete'}
            currentRow={currentRow}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => setCurrentRow(null), 200)
              }
            }}
          />

          <AdmissionsApproveDialog
            open={open === 'approveEnrollment'}
            currentRow={currentRow}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => setCurrentRow(null), 200)
              }
            }}
          />

          <AdmissionsRejectDialog
            open={open === 'rejectApplication'}
            currentRow={currentRow}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => setCurrentRow(null), 200)
              }
            }}
          />

          <AdmissionsWaitlistDialog
            open={open === 'moveToWaitlist'}
            currentRow={currentRow}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => setCurrentRow(null), 200)
              }
            }}
          />
        </>
      )}
    </>
  )
}
