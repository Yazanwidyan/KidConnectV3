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

import { GroupsProvider } from '../components/groups-provider'

export function GroupDetails() {
  const { groupId } = useParams({ strict: false })

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
              <TabsTrigger value='schedule'>Schedule</TabsTrigger>
              <TabsTrigger value='staff'>Staff</TabsTrigger>
              <TabsTrigger value='notes'>Notes</TabsTrigger>
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

            <Card>
              <CardHeader>
                <CardTitle>Group Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  This group focuses on early learning skills including
                  communication, motor skills, creativity, and social behavior.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Students ===== */}
          <TabsContent value='students'>
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>
                  List of children currently in this group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='list-disc space-y-1 ps-5'>
                  <li>Adam Ali (Age 4)</li>
                  <li>Lina Hassan (Age 5)</li>
                  <li>Omar Saleh (Age 4)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Schedule ===== */}
          <TabsContent value='schedule'>
            <Card>
              <CardHeader>
                <CardTitle>Daily Schedule</CardTitle>
                <CardDescription>Weekly activity plan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='list-disc space-y-1 ps-5'>
                  <li>08:00 – Morning Circle</li>
                  <li>09:00 – Art & Crafts</li>
                  <li>10:30 – Snack Time</li>
                  <li>11:00 – Outdoor Play</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Staff ===== */}
          <TabsContent value='staff'>
            <Card>
              <CardHeader>
                <CardTitle>Assigned Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='list-disc space-y-1 ps-5'>
                  <li>Ms. Sarah – Lead Teacher</li>
                  <li>Mr. Ahmed – Assistant</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Notes ===== */}
          <TabsContent value='notes'>
            <Card>
              <CardHeader>
                <CardTitle>Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Group shows strong engagement during creative activities.
                  Needs closer supervision during outdoor play.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </GroupsProvider>
  )
}
