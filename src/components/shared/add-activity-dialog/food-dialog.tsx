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

export function FoodDialog({
  open,
  onClose,
  groups,
  students,
  foodItems,
  onSave,
}: any) {
  const groupOptions = groups.map((g) => ({ label: g.name, value: g.id }))
  const foodTypeOptions = [
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Snack', value: 'snack' },
    { label: 'Dinner', value: 'dinner' },
  ]

  const [selectedGroups, setSelectedGroups] = useState<string[]>([
    groups[0]?.id ?? '',
  ])
  const selectedGroupId = selectedGroups[0] ?? ''

  // Filter students by selected group
  const filteredStudents = students.filter((s) => s.groupId === selectedGroupId)
  const studentOptions = filteredStudents.map((s) => ({
    label: s.name,
    value: s.id,
  }))

  const foodItemOptions = foodItems.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))

  const [selectedStudent, setSelectedStudent] = useState<string[]>([])
  const [selectedFoodType, setSelectedFoodType] = useState<string[]>([
    'breakfast',
  ])
  const [selectedFoodItems, setSelectedFoodItems] = useState<string[]>([])
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
    if (!selectedFoodType.length) {
      alert('Please select a food type.')
      return
    }
    if (!selectedFoodItems.length) {
      alert('Please select at least one food item.')
      return
    }
    if (!selectedTime.length) {
      alert('Please select a time.')
      return
    }

    onSave({
      groupId: selectedGroups[0],
      studentId: selectedStudent[0],
      date: selectedDate?.toISOString().slice(0, 10),
      time: selectedTime[0],
      foodType: selectedFoodType[0] as
        | 'breakfast'
        | 'lunch'
        | 'snack'
        | 'dinner',
      foodItems: selectedFoodItems,
      notes,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>Food Activity</DialogTitle>
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

          {/* Food Type */}
          <div>
            <Label htmlFor='foodType' className='mb-1 block font-semibold'>
              Food Type
            </Label>
            <MultiSelectPopover
              id='foodType'
              title='Select Food Type'
              options={foodTypeOptions}
              selected={selectedFoodType}
              onChange={(vals) =>
                onSingleSelectChange(setSelectedFoodType, vals)
              }
            />
          </div>

          {/* Food Items (multi-select) */}
          <div>
            <Label htmlFor='foodItems' className='mb-1 block font-semibold'>
              Food Items
            </Label>
            <MultiSelectPopover
              id='foodItems'
              title='Select Food Items'
              options={foodItemOptions}
              selected={selectedFoodItems}
              onChange={setSelectedFoodItems}
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
