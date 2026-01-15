'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'

type StudentAttendanceDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: any
}

export function StudentAttendanceDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: StudentAttendanceDeleteDialogProps) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return

    onOpenChange(false)
    showSubmittedData(
      currentRow,
      'The following StudentAttendance has been deleted:'
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete StudentAttendance
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the StudentAttendance with the
            role of from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
