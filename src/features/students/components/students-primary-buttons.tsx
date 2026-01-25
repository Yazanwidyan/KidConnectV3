import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { MailPlus, UserPlus } from 'lucide-react'

import { useStudents } from './students-provider'

export function StudentsPrimaryButtons() {
  const { setOpen } = useStudents()
  const navigate = useNavigate()

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Get Registration Link</span> <MailPlus size={18} />
      </Button>
      <Button
        className='space-x-1'
        onClick={() =>
          navigate({
            to: '/admissions',
            search: { open: 'add' },
          })
        }
      >
        <span>Register New Student</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
