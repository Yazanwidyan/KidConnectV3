import { getRouteApi } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { StudentAttendanceDialogs } from './components/student-attendance-dialogs'
import { StudentAttendancePrimaryButtons } from './components/student-attendance-primary-buttons'
import { StudentAttendanceProvider } from './components/student-attendance-provider'
import { StudentAttendanceTable } from './components/student-attendance-table'
import { studentAttendance } from './data/studentAttendance'

const route = getRouteApi('/_authenticated/student-attendance/')

export function StudentAttendance() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <StudentAttendanceProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>All Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>85</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>32</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Check In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>51</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Check Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>102</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>102</div>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              StudentAttendance
            </h2>
            <p className='text-muted-foreground'>
              Manage student StudentAttendance and streamline the enrollment
              process
            </p>
          </div>

          <StudentAttendancePrimaryButtons />
        </div>
        <StudentAttendanceTable
          data={studentAttendance}
          search={search}
          navigate={navigate}
        />
      </Main>

      <StudentAttendanceDialogs />
    </StudentAttendanceProvider>
  )
}
