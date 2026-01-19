import { Link, getRouteApi, useParams } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { employees } from '@/features/employees/data/employees'
import { students } from '../../students/data/students'
import { GroupsProvider } from '../components/groups-provider'
import { GroupEmployeesDialogs } from './components/group-employees/group-employees-dialogs'
import { GroupEmployeesPrimaryButtons } from './components/group-employees/group-employees-primary-buttons'
import { GroupEmployeesProvider } from './components/group-employees/group-employees-provider'
import { GroupEmployeesTable } from './components/group-employees/group-employees-table'
import { GroupStudentsDialogs } from './components/group-students/group-students-dialogs'
import { GroupStudentsPrimaryButtons } from './components/group-students/group-students-primary-buttons'
import { GroupStudentsProvider } from './components/group-students/group-students-provider'
import { GroupStudentsTable } from './components/group-students/group-students-table'

const route = getRouteApi('/_authenticated/groups/group-details/$groupId')

function calculateDaysSince(dateString: string) {
  const startDate = new Date(dateString)
  const today = new Date()
  const diffTime = today.getTime() - startDate.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export function GroupDetails() {
  const { groupId } = useParams({ strict: false })
  const search = route.useSearch()
  const navigate = route.useNavigate()

  // Dummy data — replace with real data or state as needed
  const totalStudents = 18
  const attendanceCount = 15
  const maxCapacity = 20
  const totalEmployees = 2
  const groupStatus = 'Active'
  const groupStartDate = '2024-09-01' // yyyy-mm-dd format
  const ageRange = '4 – 5 Years'

  const attendanceRate = ((attendanceCount / totalStudents) * 100).toFixed(0)
  const availableSlots = maxCapacity - totalStudents
  const absentStudents = totalStudents - attendanceCount
  const daysSinceStart = calculateDaysSince(groupStartDate)

  return (
    <GroupsProvider>
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
      <Main>
        <div className='mb-4 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between'>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to='/'>Home</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to='/groups'>Groups</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbPage>{groupId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className='mt-1 text-2xl font-bold tracking-tight'>
              {groupId}
            </h1>
          </div>

          <Button variant='outline'>Export Group Report</Button>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='students'>Students</TabsTrigger>
              <TabsTrigger value='staff'>Employees</TabsTrigger>
            </TabsList>
          </div>

          {/* ===== Overview ===== */}
          <TabsContent value='overview' className='space-y-6'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Group Status */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Group Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{groupStatus}</div>
                  <p className='text-xs text-muted-foreground'>
                    Started on {new Date(groupStartDate).toLocaleDateString()}
                  </p>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    {daysSinceStart} {daysSinceStart === 1 ? 'day' : 'days'}{' '}
                    since start
                  </p>
                </CardContent>
              </Card>

              {/* Total Students */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalStudents}</div>
                  <p className='text-xs text-muted-foreground'>
                    Enrolled children
                  </p>
                </CardContent>
              </Card>

              {/* Attendance */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xl font-semibold'>
                    {attendanceCount} / {totalStudents}
                  </div>
                  <p className='text-xs text-muted-foreground'>Present today</p>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    Attendance Rate: {attendanceRate}%
                  </p>
                </CardContent>
              </Card>

              {/* Absent Students */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Absent Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xl font-semibold'>{absentStudents}</div>
                  <p className='text-xs text-muted-foreground'>
                    Not present today
                  </p>
                </CardContent>
              </Card>

              {/* Available Slots */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Available Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{availableSlots}</div>
                  <p className='text-xs text-muted-foreground'>
                    Spaces left to enroll
                  </p>
                </CardContent>
              </Card>

              {/* Capacity */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{maxCapacity}</div>
                  <p className='text-xs text-muted-foreground'>
                    Maximum allowed
                  </p>
                </CardContent>
              </Card>

              {/* Total Employees */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Total Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalEmployees}</div>
                  <p className='text-xs text-muted-foreground'>
                    Assigned Employees
                  </p>
                </CardContent>
              </Card>

              {/* Age Range */}
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Age Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{ageRange}</div>
                  <p className='text-xs text-muted-foreground'>
                    Kindergarten level
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ===== Students ===== */}
          <TabsContent value='students'>
            <GroupStudentsProvider>
              <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight'>
                      Students List
                    </h2>
                    <p className='text-muted-foreground'>
                      Manage your students and their roles here.
                    </p>
                  </div>
                  <GroupStudentsPrimaryButtons />
                </div>
                <GroupStudentsTable
                  data={students}
                  search={search}
                  navigate={navigate}
                />
              </div>
              <GroupStudentsDialogs />
            </GroupStudentsProvider>
          </TabsContent>

          {/* ===== Staff ===== */}
          <TabsContent value='staff'>
            <GroupEmployeesProvider>
              <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight'>
                      Employees List
                    </h2>
                    <p className='text-muted-foreground'>
                      Manage your employees and their roles here.
                    </p>
                  </div>
                  <GroupEmployeesPrimaryButtons />
                </div>
                <GroupEmployeesTable
                  data={employees}
                  search={search}
                  navigate={navigate}
                />
              </div>
              <GroupEmployeesDialogs />
            </GroupEmployeesProvider>
          </TabsContent>
        </Tabs>
      </Main>
    </GroupsProvider>
  )
}
