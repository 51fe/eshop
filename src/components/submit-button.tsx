'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2Icon } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'

interface SubmitButtonProps extends ButtonProps {
  isPending?: boolean
  description?: string
  children: React.ReactNode
}

export function SubmitButton({
  isPending,
  children,
  description = 'Submit the form',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="mx-auto w-full"
      disabled={pending || isPending}
      {...props}
    >
      {pending || isPending ? (
        <>
          <Loader2Icon
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
          <span>Pending...</span>
        </>
      ) : (
        <>{children}</>
      )}
      <span className="sr-only">{description}</span>
    </Button>
  )
}
