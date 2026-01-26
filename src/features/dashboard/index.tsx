// src/components/dashboard.tsx

import { AttendanceBarChart } from '@/components/charts/AttendanceBarChart'
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
import { PlusCircle } from 'lucide-react'

import { LatestPaymentsTable } from './components/LatestPaymentsTable'

const latestPayments = [
  {
    id: 1,
    student: 'John Doe',
    amount: 120,
    status: 'Paid',
    date: '2026-01-24',
  },
  {
    id: 2,
    student: 'Jane Smith',
    amount: 150,
    status: 'Pending',
    date: '2026-01-25',
  },
  {
    id: 3,
    student: 'Alex Johnson',
    amount: 100,
    status: 'Paid',
    date: '2026-01-23',
  },
  {
    id: 4,
    student: 'Maria Lee',
    amount: 200,
    status: 'Failed',
    date: '2026-01-22',
  },
]
const totalPosts = 131

const postStats = [
  { label: 'Photos', value: 34, color: 'bg-blue-500' },
  { label: 'Videos', value: 12, color: 'bg-green-500' },
  { label: 'Announcements', value: 8, color: 'bg-yellow-500' },
  { label: 'Approval', value: 3, color: 'bg-red-500' },
  { label: 'Incidents', value: 2, color: 'bg-purple-500' },
]

const attendanceRatios = [
  { room: 'Room A', studentsCheckedIn: 28, staffCheckedIn: 3 },
  { room: 'Room B', studentsCheckedIn: 25, staffCheckedIn: 2 },
  { room: 'Room C', studentsCheckedIn: 30, staffCheckedIn: 4 },
  { room: 'Room D', studentsCheckedIn: 27, staffCheckedIn: 3 },
  { room: 'Room E', studentsCheckedIn: 30, staffCheckedIn: 4 },
  { room: 'Room F', studentsCheckedIn: 29, staffCheckedIn: 3 },
  { room: 'Room G', studentsCheckedIn: 12, staffCheckedIn: 3 },
  { room: 'Room H', studentsCheckedIn: 16, staffCheckedIn: 6 },
  { room: 'Room I', studentsCheckedIn: 12, staffCheckedIn: 1 },
  { room: 'Room J', studentsCheckedIn: 14, staffCheckedIn: 5 },
  { room: 'Room K', studentsCheckedIn: 29, staffCheckedIn: 8 },
  { room: 'Room L', studentsCheckedIn: 22, staffCheckedIn: 2 },
]

export function Dashboard() {
  return (
    <ActivitiesProvider>
      <DashboardContent />
      <ActivitiesDialogs />
    </ActivitiesProvider>
  )
}
const total = postStats.reduce((sum, i) => sum + i.value, 0)

const statsWithPercent = postStats.map((item) => ({
  ...item,
  percent: item.value / total,
}))
function DashboardContent() {
  const { setOpen } = useActivities()

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
          <div className='flex items-center gap-2'>
            <h2 className='flex items-center gap-3 text-lg font-semibold tracking-tight lg:text-2xl'>
              Good Morning, Yazan 👋
            </h2>
            <h2 className='my-1 flex items-center gap-3 text-lg tracking-tight lg:text-xl'>
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </h2>
          </div>
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
              color: 'text-green-800',
              bg: 'bg-green-100',
            },
            {
              label: 'Present Today',
              value: 312,
              color: 'text-blue-800',
              bg: 'bg-blue-100',
            },
            {
              label: 'Absent Today',
              value: 38,
              color: 'text-red-800',
              bg: 'bg-red-100',
            },
            {
              label: 'Staff On Duty',
              value: 42,
              color: 'text-green-800',
              bg: 'bg-green-100',
            },
          ].map((kpi) => (
            <Card key={kpi.label} className='py-4'>
              <CardContent>
                <div className='mb-2 flex items-end justify-between'>
                  <p className='text-sm font-medium'>{kpi.label}</p>
                </div>
                <div className='flex items-end justify-between'>
                  <span className='text-3xl font-semibold'>{kpi.value}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='grid gap-4 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
              <div className='flex items-end justify-between'>
                <span className='text-3xl font-semibold'>{totalPosts}</span>
              </div>
            </CardHeader>

            <CardContent className='h-64'>
              {/* Distribution Bar */}
              <div className='mt-4'>
                <div
                  className='grid h-3 w-full overflow-hidden rounded-full bg-muted'
                  style={{
                    gridTemplateColumns: statsWithPercent
                      .map((i) => `${i.percent}fr`)
                      .join(' '),
                  }}
                >
                  {statsWithPercent.map((item) => (
                    <div key={item.label} className={`${item.color} `} />
                  ))}
                </div>
              </div>

              <div className='mt-4 space-y-4'>
                {postStats.map((item) => {
                  return (
                    <div
                      key={item.label}
                      className='flex items-center justify-between border-b pb-4 last:border-none'
                    >
                      <div className='flex items-center gap-2'>
                        <span
                          className={`h-4 w-4 rounded-full ${item.color}`}
                        />
                        <h5 className='text-sm font-medium'>{item.label}</h5>
                      </div>

                      <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                        <span>{item.value}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Today Attendance */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Today Attendance</CardTitle>
            </CardHeader>
            <CardContent className='h-96'>
              <AttendanceBarChart
                labels={attendanceRatios.map((r) => r.room)}
                data={attendanceRatios.map((r) => r.studentsCheckedIn)}
              />
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 lg:grid-cols-1'>
          <Card className='lg:col-span-1'>
            <CardHeader>
              <CardTitle>Latest Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <LatestPaymentsTable data={latestPayments} />
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
