'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { userOrderExists } from '@/lib/actions/orders'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { formatCurrency } from '@/lib/formatters'
import { SubmitButton } from '@/components/submit-button'

type CheckoutFormProps = {
  product: ProductInfo
  clientSecret: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

export function ElementsForm({ product, clientSecret }: CheckoutFormProps) {
  if (!clientSecret) {
    throw new Error('Stripe failed to create payment intent')
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative aspect-video w-1/3 shrink-0">
          <Image
            priority
            src={`/${product.image}`}
            width={200}
            height={200}
            alt={product.name}
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements
        options={{ clientSecret }}
        stripe={stripePromise}
      >
        <CheckoutForm
          priceInCents={product.priceInCents}
          productId={product.id}
        />
      </Elements>
    </div>
  )
}

function CheckoutForm({
  priceInCents,
  productId
}: {
  priceInCents: number
  productId: string
}): JSX.Element {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string>()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!elements || !stripe) return

    setIsLoading(true)

    if (email) {
      const orderExists = await userOrderExists(email, productId)

      if (orderExists) {
        toast({
          title: 'Warning',
          description: `You have already purchased this product. 
          Try downloading it from the Orders page`
        })
        setIsLoading(false)
        return
      }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stripe/purchase-success`
      }
    })

    if (['card_error', 'validation_error'].includes(error.type)) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Error',
        description: 'An unknown error occurred',
        variant: 'destructive'
      })
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription className="text-right">
            测试卡号 4242 4242 4242
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </CardContent>
        <CardFooter>
          <SubmitButton isPending={isLoading}>
            Purchase - {formatCurrency(priceInCents / 100)}
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  )
}
