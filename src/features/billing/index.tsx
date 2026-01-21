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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { students } from '../students/data/students'
import { BillingOverview } from './components/billing-overview'
import { BillingPlansDialogs } from './components/billing-plans/billing-plans-dialogs'
import { BillingPlansPrimaryButtons } from './components/billing-plans/billing-plans-primary-buttons'
import { BillingPlansProvider } from './components/billing-plans/billing-plans-provider'
import { BillingPlansTable } from './components/billing-plans/billing-plans-table'
import { BillingStudentsDialogs } from './components/billing-students/billing-students-dialogs'
import { BillingStudentsPrimaryButtons } from './components/billing-students/billing-students-primary-buttons'
import { BillingStudentsProvider } from './components/billing-students/billing-students-provider'
import { BillingStudentsTable } from './components/billing-students/billing-students-table'

const route = getRouteApi('/_authenticated/billing/')

export function Billing() {
  const { groupId } = useParams({ strict: false })
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <div>
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
            <div>
              <h2 className='text-xl font-semibold tracking-tight lg:text-2xl'>
                Billing
              </h2>
              <p className='text-muted-foreground'>
                Track invoices, billing plans, and payment activity in one
                place.
              </p>
            </div>
          </div>
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
              <TabsTrigger value='plans'>Billing Plans</TabsTrigger>
              <TabsTrigger value='settings'>Billing Settings</TabsTrigger>
            </TabsList>
          </div>

          {/* ===== Overview ===== */}
          <TabsContent value='overview' className='space-y-6'>
            {/* Summary cards, current plan, usage, next invoice */}
            <BillingOverview />
            <BillingStudentsProvider>
              <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                  <div>
                    <h2 className='text-xl font-semibold tracking-tight lg:text-2xl'>
                      Students List
                    </h2>
                    <p className='text-muted-foreground'>
                      Manage your students and their roles here.
                    </p>
                  </div>
                  <BillingStudentsPrimaryButtons />
                </div>
                <BillingStudentsTable
                  data={students}
                  search={search}
                  navigate={navigate}
                />
              </div>
              <BillingStudentsDialogs />
            </BillingStudentsProvider>
          </TabsContent>

          {/* ===== Students ===== */}
          <TabsContent value='students' className='space-y-6'>
            <BillingStudentsProvider>
              <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                  <div>
                    <h2 className='text-xl font-semibold tracking-tight lg:text-2xl'>
                      Students List
                    </h2>
                    <p className='text-muted-foreground'>
                      Manage your students and their roles here.
                    </p>
                  </div>
                  <BillingStudentsPrimaryButtons />
                </div>
                <BillingStudentsTable
                  data={students}
                  search={search}
                  navigate={navigate}
                />
              </div>
              <BillingStudentsDialogs />
            </BillingStudentsProvider>
          </TabsContent>

          {/* ===== Billing Plans ===== */}
          <TabsContent value='plans' className='space-y-6'>
            {/* Plan comparison, upgrade/downgrade actions */}
            <BillingPlansProvider>
              <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                  <div>
                    <h2 className='text-xl font-semibold tracking-tight lg:text-2xl'>
                      Students List
                    </h2>
                    <p className='text-muted-foreground'>
                      Manage your students and their roles here.
                    </p>
                  </div>
                  <BillingPlansPrimaryButtons />
                </div>
                <BillingPlansTable
                  data={students}
                  search={search}
                  navigate={navigate}
                />
              </div>
              <BillingPlansDialogs />
            </BillingPlansProvider>
          </TabsContent>

          {/* ===== Billing Settings ===== */}
          <TabsContent value='settings' className='space-y-6'>
            {/* Payment method, invoices, billing email, tax info */}
          </TabsContent>
        </Tabs>
      </Main>
    </div>
  )
}
