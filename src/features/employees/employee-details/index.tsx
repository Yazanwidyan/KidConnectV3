import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
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
import { Link, useParams } from '@tanstack/react-router'

import { EmployeesProvider } from '../components/employees-provider'

export function EmployeeDetails() {
  const { employeeId } = useParams({ strict: false })

  return (
    <EmployeesProvider>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main Content ===== */}
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
                    <Link to='/employees'>Employees</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbPage>{employeeId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className='mt-1 text-2xl font-bold tracking-tight'>
              Employee – {employeeId}
            </h1>
          </div>

          <Button variant='outline'>Download Profile</Button>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='job'>Job Info</TabsTrigger>
              <TabsTrigger value='attendance'>Attendance</TabsTrigger>
              <TabsTrigger value='contacts'>Contacts</TabsTrigger>
              <TabsTrigger value='notes'>Notes</TabsTrigger>
            </TabsList>
          </div>

          {/* ===== Overview ===== */}
          <TabsContent value='overview' className='space-y-6'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Employment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Active</div>
                  <p className='text-xs text-muted-foreground'>
                    Joined on 01/09/2022
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Teacher</div>
                  <p className='text-xs text-muted-foreground'>
                    Full-time staff
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Kindergarten</div>
                  <p className='text-xs text-muted-foreground'>
                    Early education
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>98%</div>
                  <p className='text-xs text-muted-foreground'>
                    This academic year
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Experienced educator with strong classroom management skills
                  and excellent engagement with children.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Job Info ===== */}
          <TabsContent value='job'>
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
                <CardDescription>
                  Position details and responsibilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='list-disc space-y-1 ps-5'>
                  <li>Position: Kindergarten Teacher</li>
                  <li>Contract: Full-time</li>
                  <li>Working Hours: 8:00 – 15:00</li>
                  <li>Assigned Groups: KG-A, KG-B</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Attendance ===== */}
          <TabsContent value='attendance'>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                  Monthly presence and leave summary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Attendance charts and leave history will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Contacts ===== */}
          <TabsContent value='contacts'>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='list-disc space-y-1 ps-5'>
                  <li>Email: employee@school.com</li>
                  <li>Phone: +962 7X XXX XXXX</li>
                  <li>Emergency Contact: Spouse – 079 XXX XXXX</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Notes ===== */}
          <TabsContent value='notes'>
            <Card>
              <CardHeader>
                <CardTitle>Administrative Notes</CardTitle>
                <CardDescription>
                  Internal remarks and evaluations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Excellent performance, consistently positive feedback from
                  parents and supervisors.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </EmployeesProvider>
  )
}
