import { BillingStudentsActionDialog } from './billing-students-action-dialog'
import { BillingStudentsDeleteDialog } from './billing-students-delete-dialog'
import { useStudents } from './billing-students-provider'

export function BillingStudentsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStudents()
  return (
    <>
      <BillingStudentsActionDialog
        key='student-assign'
        open={open === 'assign'}
        onOpenChange={() => setOpen('assign')}
      />

      {currentRow && (
        <>
          <BillingStudentsActionDialog
            key={`student-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <BillingStudentsDeleteDialog
            key={`student-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
