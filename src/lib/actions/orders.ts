'use server'

import db from '@/lib/db'

export async function userOrderExists(email: string, productId: string) {
  return (
    (await db.order.findFirst({
      where: { customer: { email }, productId },
      select: { id: true }
    })) != null
  )
}
