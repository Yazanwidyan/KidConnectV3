import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdmissions } from './admissions-provider'

export function AdmissionsPrimaryButtons() {
  const { setOpen } = useAdmissions()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Get Registration Link</span> <MailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Admission</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
