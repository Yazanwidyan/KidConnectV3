import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStudents } from './billing-students-provider'

export function BillingStudentsPrimaryButtons() {
  const { setOpen } = useStudents()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('assign')}>
        <span>Assign Student</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
