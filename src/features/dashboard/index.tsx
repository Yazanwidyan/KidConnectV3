import { useRouter } from '@tanstack/react-router'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  DoorOpen,
  PlusCircle,
  QrCode,
  School,
  UserCog,
  UserPlus,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

// Example data
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

export function Dashboard() {
  const router = useRouter()

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
        {/* Page Title */}
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
            Dashboard
          </h1>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              onClick={() => router.navigate({ to: '/activities/new' })}
              className='flex items-center gap-2'
            >
              <PlusCircle className='h-4 w-4' />
              Add Activity
            </Button>
            <Button
              onClick={() => router.navigate({ to: '/checkin-kiosk' })}
              className='flex items-center gap-2'
            >
              <QrCode className='h-4 w-4' />
              Check-in Kiosk
            </Button>
          </div>
        </div>

        {/* ===== Top Cards ===== */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between gap-2'>
                My Nursery
                <School className='h-6 w-6 text-blue-500' />
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 text-muted-foreground'>
                  <DoorOpen className='h-4 w-4' /> Rooms
                </span>
                <span className='font-semibold'>{roomsCount}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 text-muted-foreground'>
                  <Users className='h-4 w-4' /> Students
                </span>
                <span className='font-semibold'>{studentsCount}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-2 text-muted-foreground'>
                  <UserCog className='h-4 w-4' /> Staff
                </span>
                <span className='font-semibold'>{staffCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card className='pb-0!'>
            <CardHeader>
              <CardTitle className='flex items-center justify-between gap-2'>
                Schedules
                <Calendar className='h-6 w-6 text-green-500' />
              </CardTitle>
            </CardHeader>

            <CardContent className='space-y-3 text-sm'>
              <span className='text-2xl font-semibold'>
                {workHoursThisWeek}
              </span>
              <p>Work hours this week </p>
            </CardContent>
            <CardFooter className='justify-end border-t px-3 pt-1!'>
              <Button
                variant='link'
                onClick={() => router.navigate({ to: '/schedules' })}
                className='flex items-center gap-2'
              >
                View more
                <ArrowRight className='h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>

          <Card className='pb-0!'>
            <CardHeader>
              <CardTitle className='flex items-center justify-between gap-2'>
                Admissions
                <UserPlus className='h-6 w-6 text-red-500' />
              </CardTitle>
            </CardHeader>
            <CardContent className='flex-1 space-y-3 text-sm'>
              <p>View and manage enrollments</p>
            </CardContent>
            <CardFooter className='justify-end border-t px-3 pt-1!'>
              <Button
                variant='link'
                onClick={() => router.navigate({ to: '/admissions' })}
                className='flex items-center gap-2'
              >
                View more
                <ArrowRight className='h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>

          <Card className='pb-0!'>
            <CardHeader>
              <CardTitle className='flex items-center justify-between gap-2'>
                Reports
                <BarChart3 className='h-6 w-6 text-orange-500' />
              </CardTitle>
            </CardHeader>
            <CardContent className='flex-1 space-y-3 text-sm'>
              <p>View school reports</p>
            </CardContent>
            <CardFooter className='justify-end border-t px-3 pt-1!'>
              <Button
                variant='link'
                onClick={() => router.navigate({ to: '/reports' })}
                className='flex items-center gap-2'
              >
                View more
                <ArrowRight className='h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className='grid gap-4 lg:grid-cols-7'>
          {/* Announcements */}
          <Card className='lg:col-span-4'>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='max-h-64 space-y-3 overflow-y-auto text-sm'>
                {announcements.map(({ id, title, date }) => (
                  <li key={id} className='border-b pb-2 last:border-none'>
                    <p className='font-medium'>{title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {new Date(date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Attendance Ratios */}
          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Attendance Ratios</CardTitle>
              <CardDescription>
                Checked-in students & staff per room
              </CardDescription>
            </CardHeader>
            <CardContent className='max-h-64 overflow-y-auto'>
              <table className='w-full text-sm'>
                <thead className='text-muted-foreground'>
                  <tr>
                    <th className='pb-2 text-left'>Room</th>
                    <th className='pb-2 text-left'>Students</th>
                    <th className='pb-2 text-left'>Staff</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRatios.map(
                    ({ room, studentsCheckedIn, staffCheckedIn }) => (
                      <tr key={room} className='border-t'>
                        <td className='py-2'>{room}</td>
                        <td className='py-2'>{studentsCheckedIn}</td>
                        <td className='py-2'>{staffCheckedIn}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
