import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'
import { PurchaseReceiptEmail } from '@/components/email/purchase-receipt'
import db from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  )

  if (event.type === 'payment_intent.succeeded') {
    const stripeObject: Stripe.PaymentIntent = event.data.object
    console.log(`💰 PaymentIntent status: ${stripeObject.status}`)
  }

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object
    const productId = charge.metadata.productId
    const email = charge.billing_details.email
    const pricePaidInCents = charge.amount

    const product = await db.product.findUnique({ where: { id: productId } })
    if (product == null || email == null) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const userFields = {
      email,
      orders: { create: { productId, pricePaidInCents } }
    }
    const {
      orders: [order]
    } = await db.customer.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { orders: { orderBy: { createdAt: 'desc' }, take: 1 } }
    })

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
      }
    })

    await sendEmail(
      email,
      'Order Confirmation',
      PurchaseReceiptEmail({
        order,
        product,
        downloadVerificationId: downloadVerification.id
      })
    )
  }

  return new NextResponse()
}
