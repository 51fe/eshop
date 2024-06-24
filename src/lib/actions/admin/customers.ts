'use server'

import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import db from '@/lib/db'

const pageSize = 8

export async function getCustomers({ query, page }: SearchParams) {
  const skip = (page - 1) * pageSize
  const take = pageSize

  const or: Prisma.CustomerWhereInput = { email: { contains: query } }

  const [customers, total] = await db.$transaction([
    db.customer.findMany({
      take,
      skip,
      where: or,
      select: {
        id: true,
        email: true,
        orders: { select: { pricePaidInCents: true } }
      },
      orderBy: { updatedAt: 'desc' }
    }),
    db.customer.count({ where: or })
  ])

  return {
    customers,
    totalPages: Math.ceil(total / pageSize)
  }
}

export async function deleteCustomer(id: string) {
  const customer = await db.customer.delete({
    where: { id }
  })

  if (customer == null) return notFound()

  return customer
}
