import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlans } from './billing-plans-provider'

export function BillingPlansPrimaryButtons() {
  const { setOpen } = usePlans()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('assign')}>
        <span>Assign Plan</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
