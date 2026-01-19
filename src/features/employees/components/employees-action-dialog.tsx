'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
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
import { SelectDropdown } from '@/components/select-dropdown'

/* -------------------------------------------------------------------------- */
/*                                   Schemas                                  */
/* -------------------------------------------------------------------------- */

const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Required'),
  relation: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
})

const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'Required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Required'),
  nativeName: z.string().optional(),
  employeeId: z.string().min(1, 'Required'),
  nationality: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Required'),
  governmentId: z.string().min(1, 'Required'),
  dateOfBirth: z.string().min(1, 'Required'), // mm/dd/yyyy format validation could be added
  passportNumber: z.string().optional(),
  maritalStatus: z
    .enum(['Single', 'Married', 'Divorced', 'Widowed'])
    .optional(),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.string().min(1, 'Required'),
  notes: z.string().optional(),

  // Employment Information
  employeeTitle: z.string().min(1, 'Required'),
  role: z.enum(['Teacher', 'Admin', 'Support', 'Other']),

  // Contract Details
  contractType: z.enum(['Full-time', 'Part-time', 'Contract']),
  monthlySalary: z.number().min(0, 'Invalid salary'),
  currency: z.enum(['USD', 'EUR', 'GBP', 'JPY', 'Other']),
  residentStartDate: z.string().optional(),
  probationEndDate: z.string().optional(),
  contractEndDate: z.string().optional(),
  lastDayOfWork: z.string().optional(),
  contractNotes: z.string().optional(),

  // Medical Information
  allergies: z.string().optional(),
  medications: z.string().optional(),

  // Emergency Contacts (dynamic array)
  emergencyContacts: z
    .array(emergencyContactSchema)
    .min(1, 'Add at least one emergency contact'),

  // Roles & Groups - simple arrays of strings for demo (could be complex objects)
  roles: z.array(z.string()),
  groups: z.array(z.string()),

  // Documents (files) - optional
  documents: z.any().optional(),
})

type FormValues = z.infer<typeof formSchema>

type Props = {
  currentEmployee?: Partial<FormValues>
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export function EmployeesActionDialog({
  currentEmployee,
  open,
  onOpenChange,
}: Props) {
  const isEdit = !!currentEmployee
  const [step, setStep] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentEmployee?.firstName ?? '',
      middleName: currentEmployee?.middleName ?? '',
      lastName: currentEmployee?.lastName ?? '',
      nativeName: currentEmployee?.nativeName ?? '',
      employeeId: currentEmployee?.employeeId ?? '',
      nationality: currentEmployee?.nationality ?? '',
      email: currentEmployee?.email ?? '',
      phone: currentEmployee?.phone ?? '',
      governmentId: currentEmployee?.governmentId ?? '',
      dateOfBirth: currentEmployee?.dateOfBirth ?? '',
      passportNumber: currentEmployee?.passportNumber ?? '',
      maritalStatus: currentEmployee?.maritalStatus ?? 'Single',
      gender: currentEmployee?.gender ?? 'Male',
      address: currentEmployee?.address ?? '',
      notes: currentEmployee?.notes ?? '',

      employeeTitle: currentEmployee?.employeeTitle ?? '',
      role: currentEmployee?.role ?? 'Teacher',

      contractType: currentEmployee?.contractType ?? 'Full-time',
      monthlySalary: currentEmployee?.monthlySalary ?? 0,
      currency: currentEmployee?.currency ?? 'USD',
      residentStartDate: currentEmployee?.residentStartDate ?? '',
      probationEndDate: currentEmployee?.probationEndDate ?? '',
      contractEndDate: currentEmployee?.contractEndDate ?? '',
      lastDayOfWork: currentEmployee?.lastDayOfWork ?? '',
      contractNotes: currentEmployee?.contractNotes ?? '',

      allergies: currentEmployee?.allergies ?? '',
      medications: currentEmployee?.medications ?? '',

      emergencyContacts: currentEmployee?.emergencyContacts ?? [
        { name: '', relation: '', phone: '' },
      ],

      roles: currentEmployee?.roles ?? [],
      groups: currentEmployee?.groups ?? [],

      documents: undefined,
    },
  })

  const emergencyContactsFieldArray = useFieldArray({
    control: form.control,
    name: 'emergencyContacts',
  })

  const steps = [
    'Personal Information',
    'Employment Information',
    'Contract Details',
    'Medical Information',
    'Emergency Contacts',
    'Roles & Groups',
    'Documents',
  ]

  const onSubmit = (values: FormValues) => {
    showSubmittedData(values)
    form.reset()
    setStep(0)
    onOpenChange(false)
  }

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen overflow-y-scroll sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
          <DialogDescription>{steps[step]}</DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className='mb-4 flex gap-2'>
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${i <= step ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>

        <Form {...form}>
          <form>
            {/* Step 0: Personal Information */}
            {step === 0 && (
              <div className='grid grid-cols-3 gap-4'>
                {[
                  ['firstName', 'First Name'],
                  ['middleName', 'Middle Name'],
                  ['lastName', 'Last Name'],
                  ['employeeId', 'Employee ID'],
                  ['email', 'Email'],
                  ['phone', 'Phone'],
                  ['governmentId', 'Government ID'],
                  ['dateOfBirth', 'Date of Birth'],
                  ['maritalStatus', 'Marital Status'],
                  ['gender', 'Gender'],
                  ['address', 'Address'],
                  ['medications', 'Medications'],
                  ['allergies', 'Allergies'],
                ].map(([name, label]) => {
                  if (name === 'maritalStatus') {
                    return (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as keyof FormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <SelectDropdown
                              className='w-full'
                              items={[
                                { label: 'Single', value: 'Single' },
                                { label: 'Married', value: 'Married' },
                                { label: 'Divorced', value: 'Divorced' },
                                { label: 'Widowed', value: 'Widowed' },
                              ]}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  }
                  if (name === 'gender') {
                    return (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as keyof FormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <SelectDropdown
                              className='w-full'
                              items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                                { label: 'Other', value: 'Other' },
                              ]}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  }
                  if (name === 'dateOfBirth') {
                    return (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name as keyof FormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  }
                  return (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof FormValues}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                })}
              </div>
            )}

            {/* Step 1: Employment Information */}
            {step === 1 && (
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='employeeTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <SelectDropdown
                        className='w-full'
                        items={[
                          { label: 'Teacher', value: 'Teacher' },
                          { label: 'Admin', value: 'Admin' },
                          { label: 'Support', value: 'Support' },
                          { label: 'Other', value: 'Other' },
                        ]}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Contract Details */}
            {step === 2 && (
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='contractType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Type</FormLabel>
                      <SelectDropdown
                        className='w-full'
                        items={[
                          { label: 'Full-time', value: 'Full-time' },
                          { label: 'Part-time', value: 'Part-time' },
                          { label: 'Contract', value: 'Contract' },
                        ]}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='monthlySalary'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Salary</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='currency'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <SelectDropdown
                        className='w-full'
                        items={[
                          { label: 'USD', value: 'USD' },
                          { label: 'EUR', value: 'EUR' },
                          { label: 'GBP', value: 'GBP' },
                          { label: 'JPY', value: 'JPY' },
                          { label: 'Other', value: 'Other' },
                        ]}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {[
                  ['residentStartDate', 'Resident Start Date'],
                  ['probationEndDate', 'Probation End Date'],
                  ['contractEndDate', 'Contract End Date'],
                  ['lastDayOfWork', 'Last Day of Work'],
                ].map(([name, label]) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof FormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name='contractNotes'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Contract Notes</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className='w-full rounded-md border p-2'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Emergency Contacts */}
            {step === 3 && (
              <div className='space-y-4'>
                {emergencyContactsFieldArray.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className='grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-4 rounded-lg border p-4'
                  >
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.relation`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relation</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='h-9 w-9 text-destructive'
                      onClick={() => emergencyContactsFieldArray.remove(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}

                <Button
                  type='button'
                  variant='outline'
                  onClick={() =>
                    emergencyContactsFieldArray.append({
                      name: '',
                      relation: '',
                      phone: '',
                    })
                  }
                >
                  Add Emergency Contact
                </Button>
              </div>
            )}

            {/* Step 4: Roles & Groups */}
            {step === 4 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='roles'
                  render={({ field }) => {
                    const roles = field.value || []
                    const [input, setInput] = useState('')

                    const addRole = () => {
                      if (input.trim() && !roles.includes(input.trim())) {
                        field.onChange([...roles, input.trim()])
                        setInput('')
                      }
                    }
                    const removeRole = (role: string) => {
                      field.onChange(roles.filter((r: string) => r !== role))
                    }

                    return (
                      <FormItem>
                        <FormLabel>Roles</FormLabel>
                        <div className='mb-2 flex gap-2'>
                          <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Add Role'
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                addRole()
                              }
                            }}
                          />
                          <Button onClick={addRole}>Add</Button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {roles.map((role: string) => (
                            <div
                              key={role}
                              className='flex items-center gap-1 rounded bg-primary px-3 py-1 text-white'
                            >
                              {role}
                              <button
                                type='button'
                                onClick={() => removeRole(role)}
                                className='ml-1 font-bold'
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name='groups'
                  render={({ field }) => {
                    const groups = field.value || []
                    const [input, setInput] = useState('')

                    const addGroup = () => {
                      if (input.trim() && !groups.includes(input.trim())) {
                        field.onChange([...groups, input.trim()])
                        setInput('')
                      }
                    }
                    const removeGroup = (group: string) => {
                      field.onChange(groups.filter((g: string) => g !== group))
                    }

                    return (
                      <FormItem>
                        <FormLabel>Groups</FormLabel>
                        <div className='mb-2 flex gap-2'>
                          <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Add Group'
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                addGroup()
                              }
                            }}
                          />
                          <Button onClick={addGroup}>Add</Button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {groups.map((group: string) => (
                            <div
                              key={group}
                              className='flex items-center gap-1 rounded bg-secondary px-3 py-1 text-white'
                            >
                              {group}
                              <button
                                type='button'
                                onClick={() => removeGroup(group)}
                                className='ml-1 font-bold'
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )
                  }}
                />
              </div>
            )}

            {/* Step 5: Documents */}
            {step === 5 && (
              <FormField
                control={form.control}
                name='documents'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Documents</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        multiple
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>

        <DialogFooter className='flex justify-between'>
          <Button onClick={prev} disabled={step === 0} variant='outline'>
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button type='submit' form='employee-form'>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
