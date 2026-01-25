import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { ScheduleDialog } from './components/schedule-dialog'

const staffList = [
  { id: 1, name: 'John H.' },
  { id: 2, name: 'Lilly L.' },
  { id: 3, name: 'Sara K.' },
]

const weekDays = [
  { day: 'Mon', date: 3, month: 'November' },
  { day: 'Tue', date: 4, month: 'November' },
  { day: 'Wed', date: 5, month: 'November' },
  { day: 'Thu', date: 6, month: 'November' },
  { day: 'Fri', date: 7, month: 'November' },
  { day: 'Sat', date: 8, month: 'November' },
  { day: 'Sun', date: 9, month: 'November' },
]

export function Schedules() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(null)

  const openDialogForStaff = (staffName) => {
    setCurrentStaff(staffName)
    setDialogOpen(true)
  }
  return (
    <>
      {/* Header */}
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        {/* Page Header */}
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
              Schedules
            </h1>
            <p className='text-muted-foreground'>Manage Staff Schedules</p>
          </div>
        </div>

        <>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>
              Staff Schedule{' '}
              <span className='text-sm text-muted-foreground'>
                for the week starting{' '}
                <button className='underline'>Mon Nov 03 2025</button>
              </span>
            </h2>

            <Button size='sm' variant='outline' className='text-sm'>
              Copy Schedule from another week
            </Button>
          </div>

          {/* Search and filter row */}
          <div className='mb-2 flex items-center space-x-2'>
            <Search placeholder='Search staff' />
            <select className='rounded border px-2 py-1 text-sm'>
              <option>Room</option>
              <option>Room 1</option>
              <option>Room 2</option>
            </select>
          </div>

          {/* Schedule Grid */}
          <div className='overflow-auto rounded-lg border'>
            <div className='grid min-w-[900px] grid-cols-[200px_repeat(7,1fr)] border-t border-l'>
              {/* Top row: empty corner and days */}
              <div className='sticky top-0 left-0 z-20 border-r border-b bg-muted bg-white p-2 text-sm font-medium'>
                Staff
              </div>
              {weekDays.map(({ day, date, month }) => (
                <div
                  key={`${day}-${date}`}
                  className='sticky top-0 z-10 border-r border-b bg-white p-2 text-center text-xs font-semibold'
                >
                  <div>
                    {day} {date}
                  </div>
                  <div className='text-[10px] text-muted-foreground'>
                    {month}
                  </div>
                </div>
              ))}

              {/* Staff rows */}
              {staffList.map(({ id, name }) => (
                <>
                  {/* Staff name cell */}
                  <div
                    key={`staff-name-${id}`}
                    className='sticky left-0 z-10 flex items-center justify-between border-r border-b bg-white p-2 text-sm font-semibold'
                  >
                    <span>{name}</span>
                    <button
                      className='rounded p-1 hover:bg-muted/50'
                      title='Add Schedule'
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Schedule cells */}
                  {weekDays.map(({ day, date }) => (
                    <div
                      key={`${id}-${day}-${date}`}
                      className='cursor-pointer border-r border-b p-4 hover:bg-muted/30'
                    >
                      <button
                        onClick={() => openDialogForStaff(name)}
                        className='flex items-center gap-1 text-xs text-muted-foreground'
                        title='Add schedule'
                      >
                        <Plus size={12} /> Add
                      </button>
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </>
        {/* Then render dialog: */}
        <ScheduleDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          staffName={currentStaff}
        />
      </Main>
    </>
  )
}
