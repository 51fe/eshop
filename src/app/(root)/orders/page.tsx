'use client'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'

export default function OrdersPage() {
  const [state, action] = useFormState(emailOrderHistory, {
    message: ''
  })
  return (
    <form action={action} className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email your order history and download
            links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" required name="email" id="email" />
            {state.error && (
              <div className="text-destructive">{state.error}</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {state.message ? (
            <p className="text-green-500">{state.message}</p>
          ) : (
            <SubmitButton description="Send orders history with email">
              Send email
            </SubmitButton>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
