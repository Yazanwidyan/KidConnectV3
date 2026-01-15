import { StudentAttendanceActionDialog } from './student-attendance-action-dialog'
import { StudentAttendanceDeleteDialog } from './student-attendance-delete-dialog'
import { useStudentAttendance } from './student-attendance-provider'

export function StudentAttendanceDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStudentAttendance()
  return (
    <>
      <StudentAttendanceActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
      {currentRow && (
        <>
          <StudentAttendanceActionDialog
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

          <StudentAttendanceDeleteDialog
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
