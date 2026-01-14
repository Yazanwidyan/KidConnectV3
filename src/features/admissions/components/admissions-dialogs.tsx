import { AdmissionsActionDialog } from './admissions-action-dialog'
import { AdmissionsDeleteDialog } from './admissions-delete-dialog'
import { useAdmissions } from './admissions-provider'

export function AdmissionsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAdmissions()
  return (
    <>
      <AdmissionsActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      {currentRow && (
        <>
          <AdmissionsActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AdmissionsDeleteDialog
            key={`user-delete-${currentRow.id}`}
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
