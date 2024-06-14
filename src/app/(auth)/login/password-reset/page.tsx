import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { type Metadata } from 'next'
import Link from 'next/link'
import { PasswordResetForm } from '@/components/form/password-reset'

export const metadata: Metadata = {
  title: 'Password Reset',
  description: 'Provide your email address to receive a reset link'
}

export default function PasswordReset() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            Enter your email to receive a reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <PasswordResetForm />
          <Link
            aria-label="Back to the sign in page"
            href="/login"
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancel
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
