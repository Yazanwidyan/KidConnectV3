import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGroupEmployees } from './group-employees-provider'

export function GroupEmployeesPrimaryButtons() {
  const { setOpen } = useGroupEmployees()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('assign')}>
        <span>Assign Employees</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
