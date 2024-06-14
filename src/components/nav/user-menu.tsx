import { SignOutButton } from '@/components/auth/signout-button'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import auth from '@/lib/auth'
import { cn } from '@/lib/utils'
import { UserRoundIcon } from 'lucide-react'
import Link from 'next/link'

export async function UserMenu() {
  const session = await auth()
  return (
    <nav className="space-x-1">
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className={cn(
              buttonVariants({ variant: 'user', size: 'icon' }),
              'transition-all duration-300 ease-in-out hover:opacity-70'
            )}
          >
            <div className="self-center">
              <UserRoundIcon className="size-6 rounded-full" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          aria-label="Get started"
          href="/login"
          className={cn(buttonVariants({ size: 'icon' }), 'ml-2')}
        >
          Sign In
          <span className="sr-only">Get Started</span>
        </Link>
      )}
    </nav>
  )
}
