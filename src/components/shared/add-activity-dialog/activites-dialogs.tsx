// src/components/shared/add-activity-dialog/activites-dialogs.tsx

import { Bed, Camera, Droplets, Utensils } from 'lucide-react'

import { useActivities } from './activites-provider'
import { FoodDialog } from './food-dialog'
import { PottyDialog } from './potty-dialog'
import { SelectActivityDialog } from './select-activity-dialog'
import { SleepDialog } from './sleep-dialog'
import { UploadPhotoDialog } from './upload-photo-dialog'

// example icons

const activities = [
  {
    id: 'potty',
    title: 'Potty',
    icon: <Droplets className='h-7 w-7' />,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    id: 'food',
    title: 'Food',
    icon: <Utensils className='h-7 w-7' />,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    icon: <Bed className='h-7 w-7' />,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
  {
    id: 'upload-photo',
    title: 'Photo',
    icon: <Camera className='h-7 w-7' />,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
  },
]

const groups = [
  { id: 'room-a', name: 'Room A' },
  { id: 'room-b', name: 'Room B' },
  { id: 'room-c', name: 'Room C' },
]

const students = [
  { id: 'stu-1', name: 'Alice Johnson', groupId: 'room-a' },
  { id: 'stu-2', name: 'Bob Smith', groupId: 'room-a' },
  { id: 'stu-3', name: 'Charlie Davis', groupId: 'room-b' },
  { id: 'stu-4', name: 'Diana Evans', groupId: 'room-b' },
  { id: 'stu-5', name: 'Ethan Brown', groupId: 'room-c' },
  { id: 'stu-6', name: 'Fiona Green', groupId: 'room-c' },
]

const foodItems = [
  { id: 'apple', name: 'Apple' },
  { id: 'banana', name: 'Banana' },
  { id: 'bread', name: 'Bread' },
  { id: 'cheese', name: 'Cheese' },
  { id: 'chicken', name: 'Chicken' },
  { id: 'rice', name: 'Rice' },
  { id: 'carrot', name: 'Carrot' },
  { id: 'yogurt', name: 'Yogurt' },
  { id: 'milk', name: 'Milk' },
  { id: 'egg', name: 'Egg' },
  { id: 'cereal', name: 'Cereal' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'fish', name: 'Fish' },
  { id: 'orange', name: 'Orange' },
  { id: 'grapes', name: 'Grapes' },
  { id: 'peanut_butter', name: 'Peanut Butter' },
  { id: 'vegetables', name: 'Mixed Vegetables' },
  { id: 'juice', name: 'Juice' },
  { id: 'cookie', name: 'Cookie' },
  { id: 'sandwich', name: 'Sandwich' },
]

export function ActivitiesDialogs() {
  const { open, setOpen } = useActivities()

  return (
    <>
      <SelectActivityDialog
        open={open === 'select-activity'}
        onClose={() => setOpen(null)}
        activities={activities}
        onSelect={(activityId) => {
          setOpen(activityId)
        }}
      />

      <PottyDialog
        open={open === 'potty'}
        onClose={() => setOpen(null)}
        groups={groups}
        students={students}
      />

      <FoodDialog
        open={open === 'food'}
        onClose={() => setOpen(null)}
        groups={groups}
        students={students}
        foodItems={foodItems}
      />
      <SleepDialog
        open={open === 'sleep'}
        onClose={() => setOpen(null)}
        groups={groups}
        students={students}
      />
      <UploadPhotoDialog
        open={open === 'upload-photo'}
        onClose={() => setOpen(null)}
        groups={groups}
        students={students}
      />
    </>
  )
}
