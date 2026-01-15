import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'

import { useStudents } from './group-students-provider'

export function GroupStudentsPrimaryButtons() {
  const { setOpen } = useStudents()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('assign')}>
        <span>Assign Student</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
