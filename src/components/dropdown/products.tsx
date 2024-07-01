'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { CheckIcon, TrashIcon, XIcon } from 'lucide-react'

import {
  deleteProduct,
  toggleProductAvailability
} from '@/lib/actions/admin/products'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog'
import { AlertDialogHeader, AlertDialogFooter } from '../ui/alert-dialog'

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          disabled={disabled || pending}
        >
          <TrashIcon className="mr-2 size-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the order
            and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () =>
              startTransition(async () => {
                await deleteProduct(id)
                router.refresh()
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
