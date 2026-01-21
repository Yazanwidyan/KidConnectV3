'use client'

import { useState } from 'react'
import { Baby, CalendarDays, Clock, Plus, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00']

export function Schedules() {
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string
    time: string
  } | null>(null)

  return (
    <>
      {/* ===== Header ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        {/* ===== Page Header ===== */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
              Schedules
            </h1>
            <p className='text-muted-foreground'>
              Assign teachers and activities for the week
            </p>
          </div>

          <Button>
            <CalendarDays className='me-2 h-4 w-4' />
            Current Week
          </Button>
        </div>

        <Separator className='my-4 lg:my-6' />

        {/* ===== Weekly Calendar ===== */}
        <div className='overflow-auto rounded-lg border'>
          <div className='grid min-w-[900px] grid-cols-6'>
            {/* Time column */}
            <div className='border-r bg-muted/50 p-3 text-sm font-medium'>
              Time
            </div>

            {days.map((day) => (
              <div
                key={day}
                className='border-r bg-muted/50 p-3 text-sm font-medium'
              >
                {day}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map((time) => (
              <>
                <div
                  key={time}
                  className='border-t border-r p-3 text-sm text-muted-foreground'
                >
                  {time}
                </div>

                {days.map((day) => (
                  <div key={`${day}-${time}`} className='border-t border-r p-2'>
                    <Card
                      className='flex h-full cursor-pointer flex-col justify-between rounded-md border-dashed p-2 hover:border-primary'
                      onClick={() => setSelectedSlot({ day, time })}
                    >
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <Plus className='h-3 w-3' />
                        Assign
                      </div>
                    </Card>
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>

        {/* ===== Selected Slot Preview ===== */}
        {selectedSlot && (
          <div className='mt-6'>
            <Card className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h3 className='font-semibold'>Assignment Details</h3>
                  <p className='text-sm text-muted-foreground'>
                    {selectedSlot.day} at {selectedSlot.time}
                  </p>
                </div>

                <Button size='sm'>
                  <Plus className='me-2 h-4 w-4' />
                  Create Assignment
                </Button>
              </div>

              <Separator className='my-3' />

              <div className='flex flex-wrap gap-3 text-sm'>
                <Badge variant='secondary'>
                  <User className='me-1 h-3 w-3' />
                  Teacher
                </Badge>
                <Badge variant='secondary'>
                  <Baby className='me-1 h-3 w-3' />
                  Group
                </Badge>
                <Badge variant='secondary'>
                  <Clock className='me-1 h-3 w-3' />
                  Activity
                </Badge>
              </div>
            </Card>
          </div>
        )}
      </Main>
    </>
  )
}
