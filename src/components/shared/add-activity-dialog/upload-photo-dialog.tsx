import { MultiSelectPopover } from '@/components/multi-select-popover'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

export function UploadPhotoDialog({
  open,
  onClose,
  groups,
  students,
  onSave,
}: any) {
  const groupOptions = groups.map((g: any) => ({ label: g.name, value: g.id }))
  const [selectedGroups, setSelectedGroups] = useState<string[]>([
    groups[0]?.id ?? '',
  ])
  const selectedGroupId = selectedGroups[0] ?? ''

  // Filter students by selected group
  const filteredStudents = students.filter(
    (s: any) => s.groupId === selectedGroupId
  )
  const studentOptions = filteredStudents.map((s: any) => ({
    label: s.name,
    value: s.id,
  }))

  const [selectedStudent, setSelectedStudent] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function onSingleSelectChange(
    setter: (vals: string[]) => void,
    vals: string[]
  ) {
    if (vals.length > 0) setter([vals[vals.length - 1]])
    else setter([])
  }

  // Create image preview URL when file changes
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSave = () => {
    if (!selectedGroups.length) {
      alert('Please select a group.')
      return
    }
    if (!selectedStudent.length) {
      alert('Please select a student.')
      return
    }
    if (!selectedFile) {
      alert('Please select a photo to upload.')
      return
    }

    onSave({
      groupId: selectedGroups[0],
      studentId: selectedStudent[0],
      photo: selectedFile,
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='max-w-md space-y-4'>
        <DialogHeader>
          <DialogTitle>Upload Photo</DialogTitle>
        </DialogHeader>

        {/* Group Select */}
        <div>
          <Label htmlFor='groups' className='mb-1 block font-semibold'>
            Select Group(s)
          </Label>
          <MultiSelectPopover
            id='groups'
            title='Select Group(s)'
            options={groupOptions}
            selected={selectedGroups}
            onChange={setSelectedGroups}
          />
        </div>

        {/* Student Select */}
        <div>
          <Label htmlFor='student' className='mb-1 block font-semibold'>
            Select Student
          </Label>
          <MultiSelectPopover
            id='student'
            title='Select Student'
            options={studentOptions}
            selected={selectedStudent}
            onChange={(vals) => onSingleSelectChange(setSelectedStudent, vals)}
          />
        </div>

        {/* File Input */}
        <div>
          <Label htmlFor='fileInput' className='mb-1 block font-semibold'>
            Select Photo
          </Label>
          <input
            id='fileInput'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='w-full'
          />
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className='rounded-md border p-2'>
            <img
              src={previewUrl}
              alt='Preview'
              className='max-h-60 w-full rounded-md object-contain'
            />
          </div>
        )}

        <DialogFooter className='flex justify-end gap-3'>
          <Button onClick={handleSave}>Upload</Button>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
