import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import auth from '@/lib/auth'
import { XIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/form/login'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account'
}

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/')

  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center">
      <Card className="max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <Link href="/">
              <XIcon className="size-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10">
          <LoginForm />
        </CardContent>

        <CardFooter className="grid w-full text-sm text-muted-foreground max-sm:max-w-[340px] max-sm:px-10">
          <div>
            <span>Forgot your password? </span>
            <Link
              aria-label="Reset password"
              href="/login/password-reset"
              className="text-sm font-normal text-primary underline-offset-4 transition-colors hover:underline"
            >
              Reset now
              <span className="sr-only">Reset Password</span>
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
