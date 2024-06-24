import { notFound } from 'next/navigation'
import db from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { ElementsForm } from '@/components/form/elements'
import { currency } from '@/config'

export default async function PurchasePage({
  params: { id }
}: {
  params: { id: string }
}) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      priceInCents: true,
      description: true,
      image: true
    }
  })
  if (product == null) return notFound()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency,
    metadata: { productId: product.id }
  })

  if (paymentIntent.client_secret == null) {
    throw Error('Stripe failed to create payment intent')
  }

  return (
    <ElementsForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  )
}
