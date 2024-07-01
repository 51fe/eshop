'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { emailOrderHistory } from '@/lib/actions/order-history'
import { SubmitButton } from '@/components/submit-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EmailInput, emailSchema } from '@/lib/validations'

export default function OrdersPage() {
  const form = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ''
    }
  })
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  function onSubmit(formData: EmailInput) {
    startTransition(async () => {
      const message = await emailOrderHistory(formData)
      console.log(message)
      switch (message) {
        case 'not-found':
          toast({
            title: 'Warning',
            description: 'Your order history is empty',
            variant: 'warning'
          })
          break
        case 'success':
          toast({
            title: 'Success',
            description:
              'Check your email to view your order history and download your products',
            variant: 'success'
          })
          break
        case 'error':
          toast({
            title: 'Success',
            description:
              'There was an error sending your email. Please try again',
            variant: 'destructive'
          })
          break
        default:
          break
      }
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl"
      >
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Enter your email and we will email your order history and download
              links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <SubmitButton
              isPending={isPending}
              description="Send orders history with email"
            >
              Send email
            </SubmitButton>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
