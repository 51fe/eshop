'use client'

import { login } from '@/lib/actions/auth'
import { PasswordInput } from '@/components/auth/password-input'
import { SubmitButton } from '@/components/submit-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { signInSchema, type SignInInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(formData: SignInInput) {
    startTransition(async () => {
      try {
        const message = await login({
          email: formData.email,
          password: formData.password
        })
        switch (message) {
          case 'not-registered':
            toast({
              title: 'Not registered',
              description: 'Please make sure you have signed up',
              variant: 'destructive'
            })
            break
          case 'invalid-credentials':
            toast({
              title: 'Invalid email or Password',
              description: 'Double-check your credentials and try again',
              variant: 'destructive'
            })
            break
          case 'success':
            toast({
              title: 'Success!',
              description: 'You are now signed in',
              variant: 'success'
            })
            router.push(params.get('callbackUrl') || '/')
            break
          default:
            toast({
              title: 'Error signing in with password',
              description: 'Please try again',
              variant: 'destructive'
            })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="admin@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <SubmitButton
          isPending={isPending}
          description="Sign in with email and password"
        >
          Sign in
        </SubmitButton>
      </form>
    </Form>
  )
}
