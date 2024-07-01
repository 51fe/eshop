'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { deleteOrder } from '@/lib/actions/admin/orders'

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrder(id)
          router.refresh()
        })
      }
    >
      <TrashIcon className="mr-2 size-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  )
}
