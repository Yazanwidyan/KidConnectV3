import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'

import { useAdmissions } from './admissions-provider'

export function AdmissionsPrimaryButtons() {
  const { setOpen } = useAdmissions()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Admission</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
