import { getUserByResetPasswordToken } from '@/lib/actions/user'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PasswordUpdateForm } from '@/components/form/password-update'

export const metadata: Metadata = {
  title: 'Password Update',
  description: 'Set your new password'
}

interface PasswordUpdatePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PasswordUpdatePage({
  searchParams
}: PasswordUpdatePageProps) {
  if (searchParams.token) {
    const user = await getUserByResetPasswordToken({
      token: String(searchParams.token)
    })

    if (!user) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
          <Card className="max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
            <CardHeader>
              <CardTitle>Invalid Reset Password Token</CardTitle>
              <CardDescription>
                Please return to the sign in page and try again
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                aria-label="Go back to sign in page"
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'w-full'
                )}
              >
                <ChevronLeftIcon className="mr-2 size-4" />
                <span className="sr-only">Try again</span>
                Try again
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Password Update</CardTitle>
            <CardDescription>Set your new password</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <PasswordUpdateForm
              resetPasswordToken={String(searchParams.token)}
            />
            <Link
              aria-label="Cancel password update"
              href="/login"
              className={buttonVariants({ variant: 'outline' })}
            >
              <span className="sr-only">Cancel password update</span>
              Cancel
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
          <CardHeader>
            <CardTitle>Missing Reset Password Token</CardTitle>
            <CardDescription>
              Please return to the sign in page and try again
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              aria-label="Go back to sign in page"
              href="/login"
              className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              <span className="sr-only">Try again</span>
              Try again
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
