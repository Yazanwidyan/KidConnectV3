import { useParams } from '@tanstack/react-router'
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
import { StudentsProvider } from '../components/students-provider'

export function StudentDetails() {
  const { studentId } = useParams({ strict: false })

  return (
    <StudentsProvider>
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
        <div className='mb-4 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0'>
          <h1 className='text-2xl font-bold tracking-tight'>{studentId}</h1>
          <Button variant='outline'>Download Report</Button>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='academic'>Academic Info</TabsTrigger>
              <TabsTrigger value='attendance'>Attendance</TabsTrigger>
              <TabsTrigger value='contacts'>Contacts</TabsTrigger>
              <TabsTrigger value='notes'>Notes</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-6'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Enrollment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Active</div>
                  <p className='text-xs text-muted-foreground'>
                    Enrolled since 01/09/2024
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>Grade 8</div>
                  <p className='text-xs text-muted-foreground'>
                    Current academic year
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>GPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>3.8</div>
                  <p className='text-xs text-muted-foreground'>
                    Based on latest semester
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>96%</div>
                  <p className='text-xs text-muted-foreground'>
                    Attendance rate this year
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Academic Info Tab */}
          <TabsContent value='academic' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Subjects & Grades</CardTitle>
                <CardDescription>
                  Latest term grades and performance overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Replace with real academic info component or table */}
                <ul className='list-disc space-y-1 ps-5'>
                  <li>Mathematics: A</li>
                  <li>Science: B+</li>
                  <li>English: A-</li>
                  <li>History: B</li>
                  <li>Physical Education: A</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value='attendance' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Monthly attendance overview</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Replace with actual attendance graph or data */}
                <p className='text-muted-foreground'>
                  Attendance data and charts go here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value='contacts' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Replace with a contacts list */}
                <ul className='list-disc space-y-1 ps-5'>
                  <li>John Doe - Father - 555-123-4567</li>
                  <li>Jane Doe - Mother - 555-987-6543</li>
                  <li>Uncle Mike - Authorized Pickup - 555-456-7890</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value='notes' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Teacher's Notes</CardTitle>
                <CardDescription>
                  Important remarks and observations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  John is very attentive in class and shows great enthusiasm in
                  science projects.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </StudentsProvider>
  )
}
