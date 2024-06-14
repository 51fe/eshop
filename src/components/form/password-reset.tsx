'use client'

import { resetPassword } from '@/lib/actions/auth'
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
import { emailSchema, type EmailInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function PasswordResetForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit(formData: EmailInput) {
    startTransition(async () => {
      try {
        const message = await resetPassword({ email: formData.email })

        switch (message) {
          case 'not-found':
            toast({
              title: 'User with this email address does not exist',
              variant: 'destructive'
            })
            form.reset()
            break
          case 'success':
            toast({
              title: 'Success!',
              description: 'Check your email for a password reset link'
            })
            router.push('/login')
            break
          default:
            toast({
              title: 'Error resetting password',
              description: 'Please try again',
              variant: 'destructive'
            })
            router.push('/login')
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'Something went wrong',
          description: 'Try again',
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@example.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <SubmitButton
          isPending={isPending}
          description="Continue resetting password"
        >
          Continue
        </SubmitButton>
      </form>
    </Form>
  )
}
