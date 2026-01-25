import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import * as React from 'react'

// or lucide-react alternative

// your utility for classnames, adjust or remove if you don't have

type Option = {
  label: string
  value: string
}

type MultiSelectPopoverProps = {
  title: string
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  className?: string
}

export function MultiSelectPopover({
  title,
  options,
  selected,
  onChange,
  className,
}: MultiSelectPopoverProps) {
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
          className={cn('h-8 space-x-1 border-dashed', className)}
          aria-haspopup='listbox'
          aria-expanded={open}
          aria-label={`Select ${title}`}
        >
          <PlusCircledIcon className='h-4 w-4' />
          <span>{title}</span>
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

      <PopoverContent className='w-[220px] p-0' align='start'>
        <Command>
          <CommandInput
            placeholder={`Search ${title}`}
            value={inputValue}
            onValueChange={setInputValue}
            aria-label={`Search ${title}`}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map(({ label, value }) => {
                const isSelected = selected.includes(value)
                return (
                  <CommandItem
                    key={value}
                    onSelect={() => toggleValue(value)}
                    aria-selected={isSelected}
                    role='option'
                  >
                    <div
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className='h-3 w-3 text-background' />
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
