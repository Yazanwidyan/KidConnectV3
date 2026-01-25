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
import { useState } from 'react'

export function PottyDialog({ open, onClose, groups, students, onSave }: any) {
  const groupOptions = groups.map((g) => ({ label: g.name, value: g.id }))
  const pottyTypeOptions = [
    { label: 'Pee', value: 'pee' },
    { label: 'Poop', value: 'poop' },
    { label: 'Both', value: 'both' },
  ]

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
  const [selectedPottyType, setSelectedPottyType] = useState<string[]>(['pee'])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string[]>([])

  function onSingleSelectChange(
    setter: (vals: string[]) => void,
    vals: string[]
  ) {
    if (vals.length > 0) setter([vals[vals.length - 1]])
    else setter([])
  }

  const [notes, setNotes] = useState('')

  const handleSave = () => {
    if (!selectedStudent.length) {
      alert('Please select a student.')
      return
    }
    if (!selectedGroups.length) {
      alert('Please select a group.')
      return
    }
    if (!selectedPottyType.length) {
      alert('Please select a potty type.')
      return
    }
    if (!selectedTime.length) {
      alert('Please select a time.')
      return
    }

    onSave({
      groupId: selectedGroups[0],
      studentId: selectedStudent[0],
      date: selectedDate?.toISOString().slice(0, 10), // YYYY-MM-DD
      time: selectedTime[0], // HH:mm
      pottyType: selectedPottyType[0] as 'pee' | 'poop' | 'both',
      notes,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Potty Activity</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          className='space-y-6'
        >
          {/* Groups & Student Selection */}
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
              <Label htmlFor='students' className='mb-1 block font-semibold'>
                Student
              </Label>
              <MultiSelectPopover
                id='students'
                title='Select Student'
                options={studentOptions}
                selected={selectedStudent}
                onChange={(vals) =>
                  onSingleSelectChange(setSelectedStudent, vals)
                }
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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

            <div>
              <Label htmlFor='time' className='mb-1 block font-semibold'>
                Time
              </Label>
              <input
                id='time'
                type='time'
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
                value={selectedTime[0] ?? ''}
                onChange={(e) =>
                  setSelectedTime(e.target.value ? [e.target.value] : [])
                }
              />
            </div>
          </div>

          {/* Potty Type */}
          <div>
            <Label htmlFor='pottyType' className='mb-1 block font-semibold'>
              Potty Type
            </Label>
            <MultiSelectPopover
              id='pottyType'
              title='Select Potty Type'
              options={pottyTypeOptions}
              selected={selectedPottyType}
              onChange={(vals) =>
                onSingleSelectChange(setSelectedPottyType, vals)
              }
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
