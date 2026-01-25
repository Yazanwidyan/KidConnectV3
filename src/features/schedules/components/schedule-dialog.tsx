import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Controller, useForm } from 'react-hook-form'

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]
const rooms = ['Room 1', 'Room 2', 'Room 3']

export function ScheduleDialog({
  open,
  onClose,
  staffName,
  initialWeekStart = 'Mon Nov 03 2025',
}) {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      schedule: daysOfWeek.reduce((acc, day) => {
        acc[day] = {
          scheduled: false,
          room: '',
          startTime: '',
          endTime: '',
          breakTime: '',
          note: '',
        }
        return acc
      }, {}),
      messageSchedule: false,
    },
  })

  const schedule = watch('schedule')

  const onSubmit = (data) => {
    console.log('Schedule saved:', data)
    onClose()
  }

  const calculateTotalHours = (start, end) => {
    if (!start || !end) return '00:00'
    const [startH, startM] = start.split(':').map(Number)
    const [endH, endM] = end.split(':').map(Number)
    let diffMins = endH * 60 + endM - (startH * 60 + startM)
    if (diffMins < 0) diffMins = 0
    const h = Math.floor(diffMins / 60)
      .toString()
      .padStart(2, '0')
    const m = (diffMins % 60).toString().padStart(2, '0')
    return `${h}:${m}`
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-h-screen overflow-y-auto p-4 sm:max-w-6xl'>
        <DialogHeader className='pb-2'>
          <DialogTitle className='text-base'>
            Schedule for <strong>{staffName}</strong> - week starting{' '}
            <button className='text-sm text-blue-600 underline'>
              {initialWeekStart}
            </button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 text-sm'>
          {/* Table Header */}
          <div className='grid grid-cols-8 items-center border-b border-muted pb-1 font-semibold'>
            <div>Day</div>
            <div>Sched.</div>
            <div>Room</div>
            <div>Start</div>
            <div>End</div>
            <div>Break</div>
            <div>Note</div>
            <div>Total</div>
          </div>

          {/* Schedule rows */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className='grid grid-cols-8 items-center gap-1 border-b border-muted py-1'
            >
              <div>{day}</div>

              {/* Scheduled switch */}
              <Controller
                control={control}
                name={`schedule.${day}.scheduled`}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='scale-75'
                  />
                )}
              />

              {/* Room select */}
              <Controller
                control={control}
                name={`schedule.${day}.room`}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!schedule[day].scheduled}
                  >
                    <SelectTrigger className='h-6 w-full text-xs'>
                      <SelectValue placeholder='Room' />
                    </SelectTrigger>
                    <SelectContent className='text-xs'>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room} className='text-xs'>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {/* Start time */}
              <Controller
                control={control}
                name={`schedule.${day}.startTime`}
                render={({ field }) => (
                  <Input
                    type='time'
                    step={300}
                    disabled={!schedule[day].scheduled}
                    {...field}
                    className='h-6 text-xs'
                  />
                )}
              />

              {/* End time */}
              <Controller
                control={control}
                name={`schedule.${day}.endTime`}
                render={({ field }) => (
                  <Input
                    type='time'
                    step={300}
                    disabled={!schedule[day].scheduled}
                    {...field}
                    className='h-6 text-xs'
                  />
                )}
              />

              {/* Break link */}
              <button
                type='button'
                className='text-xs text-blue-600 underline disabled:text-gray-300'
                disabled={!schedule[day].scheduled}
                onClick={() => alert('Add Break functionality here')}
              >
                Add Break
              </button>

              {/* Note input */}
              <Controller
                control={control}
                name={`schedule.${day}.note`}
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder='Note'
                    disabled={!schedule[day].scheduled}
                    {...field}
                    className='h-6 text-xs'
                  />
                )}
              />

              {/* Total hours */}
              <div className='text-xs text-muted-foreground'>
                {calculateTotalHours(
                  schedule[day].startTime,
                  schedule[day].endTime
                )}{' '}
                h
              </div>
            </div>
          ))}

          <Separator className='my-2' />

          {/* Message schedule checkbox */}
          <Controller
            control={control}
            name='messageSchedule'
            render={({ field }) => (
              <label className='flex items-center space-x-2 text-xs'>
                <input type='checkbox' {...field} className='h-3 w-3' />
                <span>Message schedule to {staffName}.</span>
              </label>
            )}
          />

          {/* Buttons */}
          <DialogFooter className='flex justify-end space-x-2 pt-2'>
            <Button variant='outline' size='sm' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' size='sm'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
