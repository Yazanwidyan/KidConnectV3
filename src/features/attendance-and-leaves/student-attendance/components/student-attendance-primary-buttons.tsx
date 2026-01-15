import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'

import { useStudentAttendance } from './student-attendance-provider'

export function StudentAttendancePrimaryButtons() {
  const { setOpen } = useStudentAttendance()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add StudentAttendance</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
