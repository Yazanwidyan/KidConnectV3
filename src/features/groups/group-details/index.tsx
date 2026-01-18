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

export function GroupDetails() {
  const { groupId } = useParams({ strict: false })
  const search = route.useSearch()
  const navigate = route.useNavigate()

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
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Group Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Active</div>
                  <p className='text-xs text-muted-foreground'>
                    Started on 01/09/2024
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Age Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>4 – 5 Years</div>
                  <p className='text-xs text-muted-foreground'>
                    Kindergarten level
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>18</div>
                  <p className='text-xs text-muted-foreground'>
                    Enrolled children
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>20</div>
                  <p className='text-xs text-muted-foreground'>
                    Maximum allowed
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
