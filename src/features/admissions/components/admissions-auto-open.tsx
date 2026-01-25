import { useEffect, useRef } from 'react'

import { useAdmissions } from './admissions-provider'

export function AdmissionsAutoOpen({ open }: any) {
  const { setOpen } = useAdmissions()
  const openedRef = useRef(false)

  useEffect(() => {
    if (open === 'add' && !openedRef.current) {
      openedRef.current = true
      setOpen('add')
    }
  }, [open, setOpen])

  return null
}
