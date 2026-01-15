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
  ArrowLeft,
  MessagesSquare,
  Plus,
  Search as SearchIcon,
} from 'lucide-react'
import { Fragment, useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Announcement = {
  id: string
  title: string
  body: string
  author: string
  timestamp: Date
}

type AnnouncementChannel = {
  id: string
  name: string
  description?: string
  announcements: Announcement[]
}

/* -------------------------------------------------------------------------- */
/*                                 FAKE DATA                                  */
/* -------------------------------------------------------------------------- */

const channels: AnnouncementChannel[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General school announcements',
    announcements: [
      {
        id: '1',
        title: 'School Closed Tomorrow',
        body: 'Due to weather conditions, the school will be closed tomorrow.',
        author: 'Administration',
        timestamp: new Date('2024-12-10T09:30:00'),
      },
      {
        id: '2',
        title: 'Morning Assembly',
        body: 'Morning assembly will start at 8:00 AM sharp.',
        author: 'Principal',
        timestamp: new Date('2024-12-09T14:10:00'),
      },
    ],
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Upcoming events and activities',
    announcements: [
      {
        id: '3',
        title: 'Sports Day',
        body: 'Annual sports day will be held next Thursday.',
        author: 'Sports Committee',
        timestamp: new Date('2024-12-08T11:00:00'),
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export function Announcements() {
  const [search, setSearch] = useState('')
  const [selectedChannel, setSelectedChannel] =
    useState<AnnouncementChannel | null>(null)
  const [mobileChannel, setMobileChannel] =
    useState<AnnouncementChannel | null>(null)

  /* ------------------------------ FILTERING -------------------------------- */

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  /* ---------------------------- GROUP BY DATE ------------------------------ */

  const groupedAnnouncements = selectedChannel?.announcements.reduce(
    (acc: Record<string, Announcement[]>, item) => {
      const key = format(item.timestamp, 'd MMM yyyy')
      acc[key] ??= []
      acc[key].push(item)
      return acc
    },
    {}
  )

  /* ------------------------------------------------------------------------ */

  return (
    <>
      {/* =============================== HEADER =============================== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-6'>
          {/* ============================ LEFT SIDE ============================ */}
          <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
            <div className='sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:mx-0 sm:p-0 sm:shadow-none'>
              <div className='flex items-center justify-between py-2'>
                <div className='flex items-center gap-2'>
                  <h1 className='text-2xl font-bold'>Announcements</h1>
                  <MessagesSquare size={20} />
                </div>

                <Button size='icon' variant='ghost' className='rounded-lg'>
                  <Plus className='stroke-muted-foreground' />
                </Button>
              </div>

              <label
                className={cn(
                  'flex h-10 items-center rounded-md border border-border px-2',
                  'focus-within:ring-1 focus-within:ring-ring'
                )}
              >
                <SearchIcon
                  size={15}
                  className='me-2 stroke-muted-foreground'
                />
                <input
                  className='w-full bg-transparent text-sm outline-none'
                  placeholder='Search channels...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            <ScrollArea className='-mx-3 h-full p-3'>
              {filteredChannels.map((channel) => (
                <Fragment key={channel.id}>
                  <button
                    type='button'
                    onClick={() => {
                      setSelectedChannel(channel)
                      setMobileChannel(channel)
                    }}
                    className={cn(
                      'w-full rounded-md px-3 py-2 text-start hover:bg-accent',
                      selectedChannel?.id === channel.id && 'bg-muted'
                    )}
                  >
                    <p className='font-medium'>{channel.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {channel.description}
                    </p>
                  </button>
                  <Separator className='my-1' />
                </Fragment>
              ))}
            </ScrollArea>
          </div>

          {/* ============================ RIGHT SIDE ============================ */}
          {selectedChannel ? (
            <div
              className={cn(
                'absolute inset-0 start-full z-50 hidden w-full flex-1 flex-col border bg-background shadow-sm sm:static sm:z-auto sm:flex sm:rounded-md',
                mobileChannel && 'start-0 flex'
              )}
            >
              {/* ------------------------------ TOP ------------------------------ */}
              <div className='flex items-center gap-3 border-b bg-card p-4 shadow-sm'>
                <Button
                  size='icon'
                  variant='ghost'
                  className='sm:hidden'
                  onClick={() => setMobileChannel(null)}
                >
                  <ArrowLeft />
                </Button>

                <div>
                  <h2 className='font-semibold'>{selectedChannel.name}</h2>
                  <p className='text-xs text-muted-foreground'>
                    {selectedChannel.description}
                  </p>
                </div>
              </div>

              {/* ------------------------- ANNOUNCEMENTS ------------------------- */}
              <ScrollArea className='flex-1 p-4'>
                <div className='flex flex-col gap-6'>
                  {groupedAnnouncements &&
                    Object.entries(groupedAnnouncements).map(
                      ([date, items]) => (
                        <Fragment key={date}>
                          <div className='text-center text-xs text-muted-foreground'>
                            {date}
                          </div>

                          {items.map((item) => (
                            <div
                              key={item.id}
                              className='rounded-lg border bg-card p-4 shadow-sm'
                            >
                              <h3 className='font-semibold'>{item.title}</h3>
                              <p className='mt-1 text-sm text-muted-foreground'>
                                {item.body}
                              </p>

                              <div className='mt-3 flex justify-between text-xs text-muted-foreground'>
                                <span>{item.author}</span>
                                <span>{format(item.timestamp, 'h:mm a')}</span>
                              </div>
                            </div>
                          ))}
                        </Fragment>
                      )
                    )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className='hidden flex-1 items-center justify-center sm:flex'>
              <div className='space-y-4 text-center'>
                <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border'>
                  <MessagesSquare className='h-8 w-8' />
                </div>
                <h2 className='text-lg font-semibold'>Select a channel</h2>
                <p className='text-sm text-muted-foreground'>
                  Choose an announcement channel to view updates.
                </p>
              </div>
            </div>
          )}
        </section>
      </Main>
    </>
  )
}
