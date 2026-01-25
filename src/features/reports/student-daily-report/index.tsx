import { ConfigDrawer } from '@/components/config-drawer'
import { DatePicker } from '@/components/date-picker'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Outlet } from '@tanstack/react-router'
import { CheckCircle, FileText, User } from 'lucide-react'
import * as React from 'react'

// import your DatePicker component here

function MultiSelectPopover({
  title,
  options,
  selected,
  onChange,
}: {
  title: string
  options: { label: string; value: string }[]
  selected: string[]
  onChange: (values: string[]) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return options
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [inputValue, options])

  function toggleValue(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 space-x-1 border-dashed'
        >
          <PlusCircledIcon className='size-4' />
          {title}
          {selected.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selected.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selected.length > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selected.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selected.includes(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput
            placeholder={`Search ${title}`}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map(({ label, value }) => {
                const isSelected = selected.includes(value)
                return (
                  <CommandItem key={value} onSelect={() => toggleValue(value)}>
                    <div
                      className={cn(
                        'flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className='h-4 w-4 text-background' />
                    </div>
                    <span>{label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onChange([])}
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function StudentDailyReport() {
  const groupOptions = [
    { label: 'Group A', value: 'groupA' },
    { label: 'Group B', value: 'groupB' },
    { label: 'Group C', value: 'groupC' },
  ]

  const studentOptions = [
    { label: 'Alice Smith', value: 'alice' },
    { label: 'Bob Johnson', value: 'bob' },
    { label: 'Charlie Lee', value: 'charlie' },
  ]

  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([])
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  )

  function handleGenerateReport() {
    alert(
      `Generating report for:\nGroups: ${selectedGroups.join(
        ', '
      )}\nStudents: ${selectedStudents.join(
        ', '
      )}\nDate: ${selectedDate ? selectedDate.toDateString() : 'Not selected'}`
    )
  }

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
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold tracking-tight lg:text-2xl'>
            Student Daily Report
          </h1>
          <p className='text-muted-foreground'>
            Review a student’s attendance, activities, and notes for a selected
            day.
          </p>
        </div>

        <Separator className='my-4 lg:my-6' />

        {/* Filters */}
        <div className='flex flex-wrap items-center gap-3'>
          <MultiSelectPopover
            title='Select Group'
            options={groupOptions}
            selected={selectedGroups}
            onChange={setSelectedGroups}
          />

          <MultiSelectPopover
            title='Select Student'
            options={studentOptions}
            selected={selectedStudents}
            onChange={setSelectedStudents}
          />

          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            placeholder='Select Date'
          />

          <Button onClick={handleGenerateReport}>
            <FileText className='me-2 h-4 w-4' />
            Generate Report
          </Button>
        </div>

        <Outlet />
      </Main>
    </>
  )
}
