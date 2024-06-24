'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { CheckIcon, TrashIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import {
  deleteProduct,
  toggleProductAvailability
} from '@/lib/actions/admin/products'

export function ActiveToggleDropdownItem({
  id,
  isAvailable
}: {
  id: string
  isAvailable: boolean
}) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable)
          router.refresh()
        })
      }}
    >
      {isAvailable ? (
        <>
          <XIcon className="mr-2 size-4" />
          <span>Deactivate</span>
        </>
      ) : (
        <>
          <CheckIcon className="mr-2 size-4" />
          <span>Activate</span>
        </>
      )}
    </DropdownMenuItem>
  )
}

export function DeleteDropdownItem({
  id,
  disabled
}: {
  id: string
  disabled: boolean
}) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || pending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      <TrashIcon className="mr-2 size-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  )
}
