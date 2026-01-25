import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export type Activity = {
  id: string
  title: string
  icon?: React.ReactElement<LucideIcon>
  bgColor?: string
  textColor?: string
}

type SelectActivityDialogProps = {
  open: boolean
  onClose: () => void
  activities: Activity[]
  onSelect: (activityId: string) => void
}

export function SelectActivityDialog({
  open,
  onClose,
  activities,
  onSelect,
}: SelectActivityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Select Activity</DialogTitle>
        </DialogHeader>

        <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
          {activities.map(({ id, title, icon, bgColor, textColor }) => (
            <Card
              key={id}
              role='button'
              tabIndex={0}
              aria-label={`Select activity ${title}`}
              onClick={() => onSelect(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelect(id)
                }
              }}
              className={cn(
                'cursor-pointer transition-all',
                'hover:-translate-y-0.5',
                'focus-visible:ring-2 focus-visible:ring-ring',
                bgColor ?? 'bg-muted'
              )}
            >
              <CardContent className='flex flex-col items-center justify-center gap-3 p-6'>
                {icon && (
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      'bg-white/70',
                      textColor ?? 'text-foreground'
                    )}
                  >
                    {icon}
                  </div>
                )}

                <span
                  className={cn(
                    'text-sm font-semibold',
                    textColor ?? 'text-foreground'
                  )}
                >
                  {title}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter className='mt-4'>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
