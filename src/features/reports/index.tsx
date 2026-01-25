import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from '@tanstack/react-router'
import {
  Baby,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  DollarSign,
  Phone,
  User,
  Users,
} from 'lucide-react'

const reports = [
  {
    title: 'Activities',
    description: 'Student notes, observations, and activities',
    icon: ClipboardList,
    href: '/reports/student-daily-report',
  },
  {
    title: 'Attendance',
    description: 'Track how long students spend in your care',
    icon: CalendarCheck,
    href: '/reports/attendance',
  },
  {
    title: 'Staff',
    description: 'Track staff hours and day breakdowns',
    icon: Users,
    href: '/reports/staff',
  },
  {
    title: 'Billing',
    description: 'Financial reports and statements',
    icon: DollarSign,
    href: '/reports/billing',
  },
  {
    title: 'Students',
    description: 'Compile student data into convenient tables',
    icon: User,
    href: '/reports/students',
  },
  {
    title: 'Contacts',
    description: 'Emergency and general guardian contact reports',
    icon: Phone,
    href: '/reports/contacts',
  },
  {
    title: 'Enrollment',
    description: 'Enrollment and waitlist reporting',
    icon: Baby,
    href: '/reports/enrollment',
  },
  {
    title: 'Subsidy',
    description: 'Subsidy Reporting',
    icon: CreditCard,
    href: '/reports/subsidy',
  },
]

export function Reports() {
  const navigate = useNavigate()

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

      <Main>
        {/* ===== Page Heading ===== */}
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
            Reports
          </h1>
          <p className='text-muted-foreground'>
            Select a topic from the list below, to view available reports.
          </p>
        </div>

        <Separator className='my-4 lg:my-4' />

        {/* ===== Reports Grid ===== */}
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
          {reports.map((report) => {
            const Icon = report.icon
            return (
              <Card
                key={report.title}
                onClick={() => navigate({ to: report.href })}
                className='cursor-pointer transition-colors hover:border-primary'
              >
                <CardHeader className='flex flex-col items-center py-6'>
                  <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white'>
                    <Icon size={28} />
                  </div>
                  <CardTitle className='text-center font-semibold'>
                    {report.title}
                  </CardTitle>
                  <CardDescription className='mt-1 text-center text-sm text-muted-foreground'>
                    {report.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </Main>
    </>
  )
}
