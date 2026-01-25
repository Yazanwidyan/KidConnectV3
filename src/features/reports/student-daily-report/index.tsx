import { ConfigDrawer } from '@/components/config-drawer'
import { DatePicker } from '@/components/date-picker'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { MultiSelectPopover } from '@/components/multi-select-popover'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Outlet } from '@tanstack/react-router'
import { FileText } from 'lucide-react'
import * as React from 'react'

export function StudentDailyReport() {
  const groupOptions = [
    { label: 'Group A', value: 'groupA' },
    { label: 'Group B', value: 'groupB' },
    { label: 'Group C', value: 'groupC' },
  ]

  const studentOptions = [
    { label: 'Alice Smith', value: 'alice' },
    { label: 'Bob Johnson', value: 'bob' },
    { label: 'Charlie Lee', value: 'charlie' },
  ]

  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([])
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  )

  function handleGenerateReport() {
    alert(
      `Generating report for:\nGroups: ${selectedGroups.join(
        ', '
      )}\nStudents: ${selectedStudents.join(
        ', '
      )}\nDate: ${selectedDate ? selectedDate.toDateString() : 'Not selected'}`
    )
  }

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
            Student Daily Report
          </h1>
          <p className='text-muted-foreground'>
            Review a student’s attendance, activities, and notes for a selected
            day.
          </p>
        </div>

        <Separator className='my-4 lg:my-6' />

        {/* Filters */}
        <div className='flex flex-wrap items-center gap-3'>
          <MultiSelectPopover
            title='Select Group'
            options={groupOptions}
            selected={selectedGroups}
            onChange={setSelectedGroups}
          />

          <MultiSelectPopover
            title='Select Student'
            options={studentOptions}
            selected={selectedStudents}
            onChange={setSelectedStudents}
          />

          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            placeholder='Select Date'
          />

          <Button onClick={handleGenerateReport}>
            <FileText className='me-2 h-4 w-4' />
            Generate Report
          </Button>
        </div>

        <Outlet />
      </Main>
    </>
  )
}
