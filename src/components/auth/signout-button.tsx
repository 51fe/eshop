import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { signIn, signOut } from '@/auth'
import React from 'react'

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <Button
        aria-label="Sign Out"
        variant="ghost"
        className="w-full justify-start text-sm"
      >
        <LogOutIcon
          className="mr-2 size-4"
          aria-hidden="true"
        />
        Sign out
      </Button>
    </form>
  )
}
