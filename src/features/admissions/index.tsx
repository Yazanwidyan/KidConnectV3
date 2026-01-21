import { getRouteApi } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AdmissionsDialogs } from './components/admissions-dialogs'
import { AdmissionsPrimaryButtons } from './components/admissions-primary-buttons'
import { AdmissionsProvider } from './components/admissions-provider'
import { AdmissionsTable } from './components/admissions-table'
import { admissions } from './data/admissions'

const route = getRouteApi('/_authenticated/admissions/')

export function Admissions() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <AdmissionsProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>85</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Waitlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>32</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Enrolled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>51</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-5xl font-bold'>102</div>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-xl font-semibold tracking-tight lg:text-2xl'>
              Admissions
            </h2>
            <p className='text-muted-foreground'>
              Manage student admissions and streamline the enrollment process
            </p>
          </div>

          <AdmissionsPrimaryButtons />
        </div>
        <AdmissionsTable
          data={admissions}
          search={search}
          navigate={navigate}
        />
      </Main>

      <AdmissionsDialogs />
    </AdmissionsProvider>
  )
}
