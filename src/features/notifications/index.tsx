import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  CheckCircle,
  Info,
  XCircle,
} from 'lucide-react'
import { Fragment, useState } from 'react'

const ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
}

const notifications = [
  {
    id: '1',
    title: 'New student enrolled',
    description: 'A new student has been added to KG-A group.',
    type: 'success',
    createdAt: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'Attendance warning',
    description: 'Low attendance detected for Grade 2.',
    type: 'warning',
    createdAt: new Date(),
    read: true,
  },
]

export function Notifications() {
  const [selected, setSelected] = useState<(typeof notifications)[0] | null>(
    null
  )

  const grouped = notifications.reduce(
    (acc: Record<string, typeof notifications>, n) => {
      const key = format(n.createdAt, 'd MMM, yyyy')
      acc[key] ??= []
      acc[key].push(n)
      return acc
    },
    {}
  )

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-6'>
          {/* ===== Left: Notification List ===== */}
          <div className='flex w-full flex-col sm:w-72'>
            <div className='flex items-center justify-between py-3'>
              <h1 className='text-2xl font-bold'>Notifications</h1>
              <Bell />
            </div>

            <ScrollArea className='h-full'>
              {Object.keys(grouped).map((date) => (
                <Fragment key={date}>
                  <p className='px-2 py-1 text-xs text-muted-foreground'>
                    {date}
                  </p>

                  {grouped[date].map((n) => {
                    // const Icon = ICONS[n.type]
                    return (
                      <button
                        key={n.id}
                        onClick={() => setSelected(n)}
                        className={cn(
                          'flex w-full items-start gap-3 rounded-md px-3 py-2 text-start hover:bg-accent',
                          !n.read && 'bg-muted'
                        )}
                      >
                        {/* <Icon className='mt-1 size-5' /> */}
                        <div>
                          <p className='font-medium'>{n.title}</p>
                          <p className='text-xs text-muted-foreground'>
                            {n.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                  <Separator className='my-2' />
                </Fragment>
              ))}
            </ScrollArea>
          </div>

          {/* ===== Right: Notification Details ===== */}
          {selected ? (
            <div className='flex flex-1 flex-col rounded-md border bg-card p-6'>
              <Button
                variant='ghost'
                size='icon'
                className='mb-4 sm:hidden'
                onClick={() => setSelected(null)}
              >
                <ArrowLeft />
              </Button>

              <h2 className='text-xl font-semibold'>{selected.title}</h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                {selected.description}
              </p>

              <span className='mt-4 text-xs text-muted-foreground'>
                {format(selected.createdAt, 'PPpp')}
              </span>
            </div>
          ) : (
            <div className='flex flex-1 items-center justify-center rounded-md border bg-card'>
              <div className='text-center'>
                <Bell className='mx-auto mb-4 size-10' />
                <p className='text-muted-foreground'>
                  Select a notification to view details
                </p>
              </div>
            </div>
          )}
        </section>
      </Main>
    </>
  )
}
