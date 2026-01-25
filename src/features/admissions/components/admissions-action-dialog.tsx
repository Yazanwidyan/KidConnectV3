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
import { type Student } from '../data/schema'

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const dynamicSectionSchema = z.object({
  label: z.string().min(1, 'required'),
  value: z.string().min(1, 'required'),
})

const parentSchema = z.object({
  parentName: z.string().min(1, 'required'),
  parentPhone: z.string().min(1, 'required'),
  parentEmail: z.string().email('Invalid email'),
  parentRelation: z.string().min(1, 'required'),
})

const emergencyContactSchema = z.object({
  name: z.string().min(1, 'required'),
  phone: z.string().min(1, 'required'),
  relation: z.string().min(1, 'required'),
})

const authorizedPickupSchema = z.object({
  name: z.string().min(1, 'required'),
  phone: z.string().min(1, 'required'),
  id: z.string().min(1, 'required'),
  relation: z.string().min(1, 'required'),
})

const formSchema = z.object({
  /* ---------------- Personal Information ---------------- */
  studentPhoto: z.any().optional(),

  firstName: z.string().min(1, 'required'),
  secondName: z.string().min(1, 'required'),
  thirdName: z.string().min(1, 'required'),
  lastName: z.string().min(1, 'required'),

  governmentId: z.string().min(1, 'required'),
  nationality: z.string().min(1, 'required'),
  address: z.string().min(1, 'required'),

  firstDayAtSchool: z.string().min(1, 'required'),
  dateOfBirth: z.string().min(1, 'required'),

  gender: z.enum(['male', 'female']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  religion: z.string().min(1, 'required'),

  allergies: z.string().min(1, 'required'),
  medications: z.string().min(1, 'required'),
  nurseryNotes: z.string().min(1, 'required'),
  parentNotes: z.string().min(1, 'required'),
  groupName: z.string().min(1, 'required'),

  parents: z.array(parentSchema).min(1, 'required'),
  emergencyContacts: z.array(emergencyContactSchema).min(1, 'required'),
  authorizedPickups: z.array(authorizedPickupSchema).min(1, 'required'),

  attachments: z.any().optional(),
  dynamicSections: z.array(dynamicSectionSchema),

  isEdit: z.boolean(),
})
type FormValues = z.infer<typeof formSchema>

type Props = {
  currentRow?: Student
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export function AdmissionsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const isEdit = !!currentRow
  const [step, setStep] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentPhoto: undefined,

      firstName: '',
      secondName: '',
      thirdName: '',
      lastName: '',
      governmentId: '',
      nationality: '',
      address: '',
      firstDayAtSchool: '',
      dateOfBirth: '',
      gender: 'male',
      bloodGroup: 'O+',
      religion: '',
      allergies: '',
      medications: '',
      nurseryNotes: '',
      parentNotes: '',
      groupName: '',
      parents: [
        {
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          parentRelation: '',
        },
      ],
      emergencyContacts: [{ name: '', phone: '', relation: '' }],
      authorizedPickups: [{ name: '', phone: '', id: '', relation: '' }],

      attachments: undefined,
      dynamicSections: [],
      isEdit,
    },
  })

  const parentsFieldArray = useFieldArray({
    control: form.control,
    name: 'parents',
  })

  const emergencyContactsFieldArray = useFieldArray({
    control: form.control,
    name: 'emergencyContacts',
  })

  const authorizedPickupsFieldArray = useFieldArray({
    control: form.control,
    name: 'authorizedPickups',
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'dynamicSections',
  })

  const steps = [
    'Personal Information',
    'Additional Information',
    'Attachments',
    'Dynamic Sections',
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
          <DialogTitle>{isEdit ? 'Edit Student' : 'Add Student'}</DialogTitle>
          <DialogDescription>{steps[step]}</DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className='mb-4 flex gap-2'>
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Form {...form}>
          <form
            id='student-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            {step === 0 && (
              <div className='grid grid-cols-3 gap-4'>
                {/* Photo */}
                <FormField
                  control={form.control}
                  name='studentPhoto'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Photo</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          accept='image/*'
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {[
                  ['firstName', 'First Name'],
                  ['secondName', 'Second Name'],
                  ['thirdName', 'Third Name'],
                  ['lastName', 'Last Name'],
                  ['governmentId', 'Government ID'],
                  ['nationality', 'Nationality'],
                  ['address', 'Address'],
                ].map(([name, label]) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center gap-1'>
                          <FormLabel>{label}</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name='firstDayAtSchool'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>First Day at School</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Gender</FormLabel>
                        <FormMessage />
                      </div>
                      <SelectDropdown
                        className='w-full'
                        items={[
                          { label: 'Male', value: 'male' },
                          { label: 'Female', value: 'female' },
                        ]}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bloodGroup'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Blood Group</FormLabel>
                        <FormMessage />
                      </div>
                      <SelectDropdown
                        className='w-full'
                        items={[
                          'A+',
                          'A-',
                          'B+',
                          'B-',
                          'AB+',
                          'AB-',
                          'O+',
                          'O-',
                        ].map((v) => ({ label: v, value: v }))}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='religion'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Religion</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='allergies'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Allergies</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input {...field} placeholder='e.g. Peanuts, Milk' />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='medications'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Medications</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input {...field} placeholder='If any' />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 1 && (
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='groupName'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Group Name</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='nurseryNotes'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Nursery Notes</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <textarea
                          {...field}
                          className='min-h-[90px] w-full rounded-md border px-3 py-2'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='parentNotes'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <div className='flex items-center gap-1'>
                        <FormLabel>Parent Notes</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <textarea
                          {...field}
                          className='min-h-[90px] w-full rounded-md border px-3 py-2'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 2 && (
              <div className='space-y-4'>
                {fields.map((f, i) => (
                  <div key={f.id} className='space-y-2 rounded border p-4'>
                    <FormField
                      control={form.control}
                      name={`dynamicSections.${i}.label`}
                      render={({ field }) => (
                        <Input placeholder='Label' {...field} />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`dynamicSections.${i}.value`}
                      render={({ field }) => (
                        <Input placeholder='Value' {...field} />
                      )}
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => remove(i)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type='button'
                  variant='outline'
                  onClick={() => append({ label: '', value: '' })}
                >
                  Add Section
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className='space-y-8'>
                {/* ===================== Parents ===================== */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Parents</h3>

                  {parentsFieldArray.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className='grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-4 rounded-lg border p-4'
                    >
                      <FormField
                        control={form.control}
                        name={`parents.${index}.parentName`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Parent Name</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`parents.${index}.parentPhone`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Phone</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`parents.${index}.parentEmail`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Email</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`parents.${index}.parentRelation`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Relation</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} placeholder='Father / Mother' />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* REMOVE ICON */}
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='h-9 w-9 text-destructive'
                        onClick={() => parentsFieldArray.remove(index)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      parentsFieldArray.append({
                        parentName: '',
                        parentPhone: '',
                        parentEmail: '',
                        parentRelation: '',
                      })
                    }
                  >
                    Add Parent
                  </Button>
                </div>

                {/* ================= Emergency Contacts ================= */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Emergency Contacts</h3>

                  {emergencyContactsFieldArray.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className='grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-4 rounded-lg border p-4'
                    >
                      <FormField
                        control={form.control}
                        name={`emergencyContacts.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Name</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`emergencyContacts.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Phone</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`emergencyContacts.${index}.relation`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Relation</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='h-9 w-9 text-destructive'
                        onClick={() =>
                          emergencyContactsFieldArray.remove(index)
                        }
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
                        phone: '',
                        relation: '',
                      })
                    }
                  >
                    Add Emergency Contact
                  </Button>
                </div>

                {/* ================= Authorized Pickups ================= */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Authorized Pickups</h3>

                  {authorizedPickupsFieldArray.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className='grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-4 rounded-lg border p-4'
                    >
                      <FormField
                        control={form.control}
                        name={`authorizedPickups.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Name</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`authorizedPickups.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Phone</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`authorizedPickups.${index}.id`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>ID</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`authorizedPickups.${index}.relation`}
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex items-center gap-1'>
                              <FormLabel>Relation</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='h-9 w-9 text-destructive'
                        onClick={() =>
                          authorizedPickupsFieldArray.remove(index)
                        }
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      authorizedPickupsFieldArray.append({
                        name: '',
                        phone: '',
                        id: '',
                        relation: '',
                      })
                    }
                  >
                    Add Authorized Pickup
                  </Button>
                </div>
              </div>
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
            <Button type='submit' form='student-form'>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
