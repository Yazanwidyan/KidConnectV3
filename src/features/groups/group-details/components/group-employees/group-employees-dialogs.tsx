import { GroupEmployeesActionDialog } from './group-employees-action-dialog'
import { GroupEmployeesDeleteDialog } from './group-employees-delete-dialog'
import { useGroupEmployees } from './group-employees-provider'

export function GroupEmployeesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useGroupEmployees()
  return (
    <>
      <GroupEmployeesActionDialog
        key='employee-assign'
        open={open === 'assign'}
        onOpenChange={() => setOpen('assign')}
      />

      {currentRow && (
        <>
          <GroupEmployeesActionDialog
            key={`employee-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <GroupEmployeesDeleteDialog
            key={`employee-delete-${currentRow.id}`}
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
