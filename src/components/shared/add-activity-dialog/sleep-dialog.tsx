import { DatePicker } from '@/components/date-picker'
import { MultiSelectPopover } from '@/components/multi-select-popover'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

export function SleepDialog({ open, onClose, groups, students, onSave }: any) {
  const groupOptions = groups.map((g) => ({ label: g.name, value: g.id }))
  const [selectedGroups, setSelectedGroups] = useState<string[]>([
    groups[0]?.id ?? '',
  ])
  const selectedGroupId = selectedGroups[0] ?? ''

  const filteredStudents = students.filter((s) => s.groupId === selectedGroupId)
  const studentOptions = filteredStudents.map((s) => ({
    label: s.name,
    value: s.id,
  }))

  const [selectedStudent, setSelectedStudent] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [sleepStartTime, setSleepStartTime] = useState<string>('')
  const [sleepEndTime, setSleepEndTime] = useState<string>('')
  const [duration, setDuration] = useState<string>('') // hh:mm format
  const [notes, setNotes] = useState('')

  function onSingleSelectChange(
    setter: (vals: string[]) => void,
    vals: string[]
  ) {
    if (vals.length > 0) setter([vals[vals.length - 1]])
    else setter([])
  }

  // Calculate duration whenever start or end time changes
  useEffect(() => {
    if (sleepStartTime && sleepEndTime) {
      const [startH, startM] = sleepStartTime.split(':').map(Number)
      const [endH, endM] = sleepEndTime.split(':').map(Number)
      let startMinutes = startH * 60 + startM
      let endMinutes = endH * 60 + endM

      // Handle overnight sleep (end time less than start time)
      if (endMinutes <= startMinutes) {
        endMinutes += 24 * 60
      }

      const diff = endMinutes - startMinutes
      const hours = Math.floor(diff / 60)
      const minutes = diff % 60
      setDuration(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      )
    } else {
      setDuration('')
    }
  }, [sleepStartTime, sleepEndTime])

  const handleSave = () => {
    if (!selectedStudent.length) {
      alert('Please select a student.')
      return
    }
    if (!selectedGroups.length) {
      alert('Please select a group.')
      return
    }
    if (!selectedDate) {
      alert('Please select a date.')
      return
    }
    if (!sleepStartTime) {
      alert('Please enter sleep start time.')
      return
    }
    if (!sleepEndTime) {
      alert('Please enter sleep end time.')
      return
    }

    onSave({
      groupId: selectedGroups[0],
      studentId: selectedStudent[0],
      date: selectedDate.toISOString().slice(0, 10),
      sleepStartTime,
      sleepEndTime,
      duration,
      notes,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Sleep Activity</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          className='space-y-6'
        >
          {/* Groups & Student */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <Label htmlFor='groups' className='mb-1 block font-semibold'>
                Groups
              </Label>
              <MultiSelectPopover
                id='groups'
                title='Select Group(s)'
                options={groupOptions}
                selected={selectedGroups}
                onChange={setSelectedGroups}
              />
            </div>

            <div>
              <Label htmlFor='student' className='mb-1 block font-semibold'>
                Student
              </Label>
              <MultiSelectPopover
                id='student'
                title='Select Student'
                options={studentOptions}
                selected={selectedStudent}
                onChange={(vals) =>
                  onSingleSelectChange(setSelectedStudent, vals)
                }
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor='date' className='mb-1 block font-semibold'>
              Date
            </Label>
            <DatePicker
              id='date'
              selected={selectedDate}
              onSelect={setSelectedDate}
              placeholder='Select Date'
              className='w-full'
            />
          </div>

          {/* Sleep start & end times */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <Label htmlFor='sleepStart' className='mb-1 block font-semibold'>
                Sleep Start Time
              </Label>
              <input
                id='sleepStart'
                type='time'
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={sleepStartTime}
                onChange={(e) => setSleepStartTime(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor='sleepEnd' className='mb-1 block font-semibold'>
                Sleep End Time
              </Label>
              <input
                id='sleepEnd'
                type='time'
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={sleepEndTime}
                onChange={(e) => setSleepEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Duration (readonly) */}
          <div>
            <Label htmlFor='duration' className='mb-1 block font-semibold'>
              Duration (HH:mm)
            </Label>
            <input
              id='duration'
              type='text'
              readOnly
              value={duration}
              className='w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm'
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor='notes' className='mb-1 block font-semibold'>
              Notes
            </Label>
            <Textarea
              id='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Additional notes (optional)'
              rows={4}
              className='resize-none'
            />
          </div>

          {/* Buttons */}
          <DialogFooter className='flex justify-end gap-3'>
            <Button type='submit'>Save</Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
