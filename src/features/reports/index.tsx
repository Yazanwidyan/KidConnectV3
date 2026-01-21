import { Outlet, useNavigate } from '@tanstack/react-router'
import {
  Baby,
  BarChart3,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
} from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const reports = [
  {
    title: 'Student Attendance',
    description: 'Daily and monthly attendance records',
    icon: CalendarCheck,
    href: '/reports/attendance',
  },
  {
    title: 'Student Progress',
    description: 'Learning progress and development tracking',
    icon: BarChart3,
    href: '/reports/progress',
  },
  {
    title: 'Payments & Fees',
    description: 'Tuition payments and outstanding balances',
    icon: CreditCard,
    href: '/reports/payments',
  },
  {
    title: 'Enrollment Report',
    description: 'Registered students and group distribution',
    icon: Baby,
    href: '/reports/enrollment',
  },
  {
    title: 'Staff Attendance',
    description: 'Teacher and staff check-in history',
    icon: ClipboardList,
    href: '/reports/staff-attendance',
  },
  {
    title: 'Custom Report',
    description: 'Build and export a custom report',
    icon: FileText,
    href: '/reports/custom',
  },
]

export function Reports() {
  const navigate = useNavigate()

  return (
    <>
      {/* ===== Header ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        {/* ===== Page Heading ===== */}
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
            Reports
          </h1>
          <p className='text-muted-foreground'>
            Create and view reports for your kindergarten.
          </p>
        </div>

        <Separator className='my-4 lg:my-6' />

        {/* ===== Reports Grid ===== */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {reports.map((report) => {
            const Icon = report.icon
            return (
              <Card
                key={report.title}
                onClick={() => navigate({ to: report.href })}
                className='cursor-pointer transition hover:border-primary hover:shadow-md'
              >
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-lg bg-primary/10 p-2 text-primary'>
                      <Icon size={22} />
                    </div>
                    <div>
                      <CardTitle className='text-base'>
                        {report.title}
                      </CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Nested report routes */}
        <Outlet />
      </Main>
    </>
  )
}
