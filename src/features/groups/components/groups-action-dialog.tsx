'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { SelectDropdown } from '@/components/select-dropdown'
import { groupTypes } from '../data/data'
import { type Group } from '../data/schema'

/* ----------------------------- SCHEMA ----------------------------- */

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  groupType: z.string().min(1, 'Type is required.'),

  maxStudents: z.coerce.number().int().positive().optional(),

  ageRange: z
    .tuple([z.number(), z.number()])
    .refine(([min, max]) => min <= max, {
      message: 'Min age must be less than max age',
    }),

  isEdit: z.boolean(),
})

type GroupForm = z.infer<typeof formSchema>

/* ----------------------------- PROPS ----------------------------- */

type GroupActionDialogProps = {
  currentRow?: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* ----------------------------- COMPONENT ----------------------------- */

export function GroupsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: GroupActionDialogProps) {
  const isEdit = !!currentRow

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name ?? '',
      groupType: currentRow?.groupType ?? '',
      maxStudents: currentRow?.maxStudents,
      ageRange: currentRow?.ageRange ?? [2, 5],
      isEdit,
    },
  })

  const onSubmit = (values: GroupForm) => {
    showSubmittedData(values)
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit Group' : 'Add New Group'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the group details.' : 'Create a new group.'} Click
            save when you’re done.
          </DialogDescription>
        </DialogHeader>

        <div className='h-72 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='group-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              {/* ---------------- Name ---------------- */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Toddlers'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* ---------------- Group Type ---------------- */}
              <FormField
                control={form.control}
                name='groupType'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>Type</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a type'
                      className='col-span-4 w-full'
                      items={groupTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* ---------------- Max Students ---------------- */}
              <FormField
                control={form.control}
                name='maxStudents'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>
                      Max Students
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='20'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {/* ---------------- Age Range Slider ---------------- */}
              <FormField
                control={form.control}
                name='ageRange'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4'>
                    <FormLabel className='col-span-2 text-end'>
                      Age Range
                    </FormLabel>

                    <div className='col-span-4 space-y-2'>
                      <FormControl>
                        <Slider
                          min={0}
                          max={18}
                          step={1}
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      </FormControl>

                      <div className='flex justify-between text-xs text-muted-foreground'>
                        <span>{field.value[0]} yrs</span>
                        <span>{field.value[1]} yrs</span>
                      </div>
                    </div>

                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button type='submit' form='group-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
