import { Link, useParams } from '@tanstack/react-router'
import { Copy } from 'lucide-react'
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
import { EmployeesProvider } from '../components/employees-provider'

export function EmployeeDetails() {
  const { employeeId } = useParams({ strict: false })

  return (
    <EmployeesProvider>
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
        {/* ===== Page Header ===== */}
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
              John A. Doe – Kindergarten Teacher
            </h1>
            <div className='mt-1 inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <span>Teacher Reference Code.:</span>

                <span className='font-medium text-foreground'>212124</span>

                <button
                  type='button'
                  onClick={() => navigator.clipboard.writeText('212124')}
                  className='rounded p-1 transition hover:bg-muted'
                  aria-label='Copy staff reference number'
                  title='Copy reference number'
                >
                  <Copy className='h-4 w-4' />
                </button>
              </div>
            </div>
          </div>

          <Button variant='outline'>Download Profile</Button>
        </div>

        {/* ===== Tabs ===== */}
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='classes'>Classes</TabsTrigger>
              <TabsTrigger value='contacts'>Contacts</TabsTrigger>
              <TabsTrigger value='medical'>Medical</TabsTrigger>
              <TabsTrigger value='documents'>Documents</TabsTrigger>
            </TabsList>
          </div>

          {/* ================= OVERVIEW ================= */}
          <TabsContent value='overview' className='space-y-6'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Employment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Active</div>
                  <p className='text-xs text-muted-foreground'>
                    Since 01/09/2022
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xl font-bold'>Teacher</div>
                  <p className='text-xs text-muted-foreground'>Kindergarten</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Contract</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xl font-bold'>Full-Time</div>
                  <p className='text-xs text-muted-foreground'>
                    Academic Year 2024–2025
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm'>Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xl font-bold'>97%</div>
                  <p className='text-xs text-muted-foreground'>
                    Current academic year
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= CLASSES ================= */}
          <TabsContent value='classes'>
            <Card>
              <CardHeader>
                <CardTitle>Assigned Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='list-disc space-y-1 ps-5'>
                  <li>KG-A (Morning Group)</li>
                  <li>KG-B (Afternoon Group)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= CONTACTS ================= */}
          <TabsContent value='contacts'>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <p>
                  <strong>Employee ID:</strong> EMP-001
                </p>
                <p>
                  <strong>Nationality:</strong> Filipino
                </p>
                <p>
                  <strong>Email:</strong> john@example.com
                </p>
                <p>
                  <strong>Phone:</strong> +63 987 654 3210
                </p>
                <p>
                  <strong>Address:</strong> 123 Makati, Philippines
                </p>
                <p>
                  <strong>Date of Birth:</strong> 1990-05-20
                </p>
                <p>
                  <strong>Marital Status:</strong> Single
                </p>
              </CardContent>
            </Card>

            <Card className='mt-4'>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Name:</strong> Jane Doe
                </p>
                <p>
                  <strong>Relation:</strong> Sister
                </p>
                <p>
                  <strong>Phone:</strong> +63 912 345 6789
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= MEDICAL ================= */}
          <TabsContent value='medical'>
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Allergies:</strong> None
                </p>
                <p>
                  <strong>Medications:</strong> None
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= DOCUMENTS ================= */}
          <TabsContent value='documents'>
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>ID Picture:</strong> No File
                </p>
                <p>
                  <strong>Government ID:</strong> 1234-5678-9000
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </EmployeesProvider>
  )
}
