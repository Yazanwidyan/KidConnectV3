import { GroupStudentsActionDialog } from './group-students-action-dialog'
import { GroupStudentsDeleteDialog } from './group-students-delete-dialog'
import { useStudents } from './group-students-provider'

export function GroupStudentsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStudents()
  return (
    <>
      <GroupStudentsActionDialog
        key='student-assign'
        open={open === 'assign'}
        onOpenChange={() => setOpen('assign')}
      />

      {currentRow && (
        <>
          <GroupStudentsActionDialog
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

          <GroupStudentsDeleteDialog
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
