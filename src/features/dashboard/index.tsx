// src/components/dashboard.tsx

import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ActivitiesDialogs } from '@/components/shared/add-activity-dialog/activites-dialogs'
import {
  ActivitiesProvider,
  useActivities,
} from '@/components/shared/add-activity-dialog/activites-provider'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from '@tanstack/react-router'
import { Minus, PlusCircle, TrendingDown, TrendingUp } from 'lucide-react'

// Sample data
const announcements = [
  { id: 1, title: 'School reopens on Monday', date: '2026-01-20' },
  { id: 2, title: 'New library books arrived', date: '2026-01-18' },
  { id: 3, title: 'Parent-Teacher meeting next week', date: '2026-01-25' },
]

const attendanceRatios = [
  { room: 'Room A', studentsCheckedIn: 28, staffCheckedIn: 3 },
  { room: 'Room B', studentsCheckedIn: 25, staffCheckedIn: 2 },
  { room: 'Room C', studentsCheckedIn: 30, staffCheckedIn: 4 },
]

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend.startsWith('+')) {
    return <TrendingUp className='h-4 w-4' />
  }
  if (trend.startsWith('-')) {
    return <TrendingDown className='h-4 w-4' />
  }
  return <Minus className='h-4 w-4 opacity-50' />
}

export function Dashboard() {
  return (
    <ActivitiesProvider>
      <DashboardContent />
      <ActivitiesDialogs />
    </ActivitiesProvider>
  )
}

function DashboardContent() {
  const { setOpen } = useActivities()

  const roomsCount = 12
  const studentsCount = 350
  const staffCount = 45
  const workHoursThisWeek = '40 hrs'

  return (
    <>
      {/* ===== Header ===== */}
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main className='space-y-4'>
        {/* Page Title and Actions */}
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
            Dashboard
          </h1>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => setOpen('select-activity')}
              className='flex items-center gap-2'
            >
              <PlusCircle className='h-4 w-4' />
              Add Activity
            </Button>
          </div>
        </div>

        {/* Top Cards */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              label: 'Total Students',
              value: 350,
              trend: '+3%',
              color: 'text-green-800',
              bg: 'bg-green-100',
            },
            {
              label: 'Present Today',
              value: 312,
              trend: '89%',
              color: 'text-blue-800',
              bg: 'bg-blue-100',
            },
            {
              label: 'Absent Today',
              value: 38,
              trend: '-5%',
              color: 'text-red-800',
              bg: 'bg-red-100',
            },
            {
              label: 'Staff On Duty',
              value: 42,
              trend: 'OK',
              color: 'text-green-800',
              bg: 'bg-green-100',
            },
          ].map((kpi) => (
            <Card key={kpi.label} className='py-4'>
              <CardContent>
                <div className='mb-2 flex items-end justify-between'>
                  <p className='text-sm font-medium'>{kpi.label}</p>
                  <span
                    className={`${kpi.color} ${kpi.bg} flex items-center gap-1 rounded-md border px-2 text-xs font-medium`}
                  >
                    <TrendIcon trend={kpi.trend} />
                    {kpi.trend}
                  </span>
                </div>
                <div className='flex items-end justify-between'>
                  <span className='text-3xl font-semibold'>{kpi.value}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='grid gap-4 lg:grid-cols-3'>
          {/* Today Attendance */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Today Attendance</CardTitle>
              <p className='text-sm text-muted-foreground'>
                Per room check-in status
              </p>
            </CardHeader>
            <CardContent className='space-y-4'>
              {attendanceRatios.map(({ room, studentsCheckedIn }) => {
                const percent = Math.round((studentsCheckedIn / 30) * 100)
                return (
                  <div key={room}>
                    <div className='flex justify-between text-sm'>
                      <span>{room}</span>
                      <span>{studentsCheckedIn} / 30</span>
                    </div>
                    <div className='h-2 w-full rounded bg-muted'>
                      <div
                        className='h-2 rounded bg-primary'
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              <p className='rounded-md bg-red-50 p-2 text-red-600'>
                ⚠ Room B has low attendance
              </p>
              <p className='rounded-md bg-yellow-50 p-2 text-yellow-700'>
                ⏰ 2 staff not checked in yet
              </p>
              <p className='rounded-md bg-blue-50 p-2 text-blue-700'>
                📅 Parent meeting tomorrow
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 lg:grid-cols-2'>
          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              {announcements.map((a) => (
                <div key={a.id} className='border-b pb-2 last:border-none'>
                  <p className='font-medium'>{a.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(a.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className='text-sm text-muted-foreground'>
              • Student checked in – Room A
              <br />
              • Staff shift started – Sarah
              <br />• New admission submitted
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
