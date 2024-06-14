'use server'

import { OrderHistoryEmail } from '@/components/email/order-history'
import db from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { emailSchema } from '@/lib/validations/auth'

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
) {
  const result = emailSchema.safeParse({ email: formData.get('email') })

  if (result.success === false) {
    return { error: 'Invalid email address' }
  }

  const customer = await db.customer.findUnique({
    where: { email: result.data.email },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              image: true,
              description: true
            }
          }
        }
      }
    }
  })

  if (customer == null) {
    return {
      message:
        'Check your email to view your order history and download your products.'
    }
  }

  const orders = customer.orders.map(async (order) => {
    return {
      ...order,
      downloadVerificationId: (
        await db.downloadVerification.create({
          data: {
            expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
            productId: order.product.id
          }
        })
      ).id
    }
  })

  const allOrders = await Promise.all(orders)

  const succeed = await sendEmail(
    customer.email,
    'Order History',
    OrderHistoryEmail({ orders: allOrders })
  )

  if (!succeed) {
    return { error: 'There was an error sending your email. Please try again.' }
  }

  return {
    message:
      'Check your email to view your order history and download your products.'
  }
}
