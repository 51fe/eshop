'use server'

import db from '@/lib/db'
import { notFound } from 'next/navigation'

export async function deleteCustomer(id: string) {
  const customer = await db.customer.delete({
    where: { id }
  })

  if (customer == null) return notFound()

  return customer
}
