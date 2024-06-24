'use client'

import { updatePassword } from '@/lib/actions/auth'
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
import { useToast } from '@/components/ui/use-toast'
import { pwdSchema, type PwdInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

interface PasswordUpdateFormProps {
  resetPasswordToken: string
}

export function PasswordUpdateForm({
  resetPasswordToken
}: PasswordUpdateFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<PwdInput>({
    resolver: zodResolver(pwdSchema),
    defaultValues: {
      password: ''
    }
  })
  function onSubmit(formData: PwdInput) {
    startTransition(async () => {
      try {
        const message = await updatePassword({
          password: formData.password,
          resetPasswordToken
        })

        switch (message) {
          case 'expired':
            toast({
              title: 'Token is missing or expired',
              description: 'Please try again',
              variant: 'destructive'
            })
            router.push('/login')
            break
          case 'success':
            toast({
              title: 'Success!',
              description: 'You can now sign in with new password',
              variant: 'success'
            })
            router.push('/login')
            break
          default:
            toast({
              title: 'Error updating password',
              description: 'Please try again',
              variant: 'destructive'
            })
        }
      } catch (error) {
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          variant: 'destructive'
        })
        console.error(error)
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <SubmitButton
          isPending={isPending}
          description="Update password"
        >
          Update password
        </SubmitButton>
      </form>
    </Form>
  )
}
