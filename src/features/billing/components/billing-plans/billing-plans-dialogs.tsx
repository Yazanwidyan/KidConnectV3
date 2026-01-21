import { BillingPlansActionDialog } from './billing-plans-action-dialog'
import { BillingPlansDeleteDialog } from './billing-plans-delete-dialog'
import { usePlans } from './billing-plans-provider'

export function BillingPlansDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePlans()
  return (
    <>
      <BillingPlansActionDialog
        key='plan-assign'
        open={open === 'assign'}
        onOpenChange={() => setOpen('assign')}
      />

      {currentRow && (
        <>
          <BillingPlansActionDialog
            key={`plan-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <BillingPlansDeleteDialog
            key={`plan-delete-${currentRow.id}`}
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
