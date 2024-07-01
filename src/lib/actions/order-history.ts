'use server'

import { OrderHistoryEmail } from '@/components/email/order-history'
import db from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { EmailInput, emailSchema } from '@/lib/validations'

interface ResultProps {
  type: 'error' | 'success' | 'warning'
  message: string
}

export async function emailOrderHistory(
  formData: EmailInput
): Promise<'invalid-input' | 'not-found' | 'error' | 'success'> {
  const result = emailSchema.safeParse(formData)

  if (!result.success) {
    return 'invalid-input'
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

  if (customer == null || customer.orders.length === 0) {
    return 'not-found'
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

  try {
    const succeed = await sendEmail(
      customer.email,
      'Order History',
      OrderHistoryEmail({ orders: allOrders })
    )
    if (succeed) return 'success'
    return 'error'
  } catch (error) {
    console.log(error)
    throw error
  }
}
