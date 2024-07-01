'use server'

import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'
import db from '@/lib/db'

const pageSize = 8

export async function getOrders({ query, page = 1 }: SearchParams) {
  const skip = (page - 1) * pageSize
  const take = pageSize
  const or: Prisma.OrderWhereInput = query
    ? {
        OR: [
          {
            product: {
              name: {
                contains: query
              }
            }
          },
          {
            customer: {
              email: {
                contains: query
              }
            }
          }
        ]
      }
    : {}

  const [orders, total] = await db.$transaction([
    db.order.findMany({
      take,
      skip,
      where: or,
      select: {
        id: true,
        pricePaidInCents: true,
        product: { select: { name: true } },
        customer: { select: { email: true } }
      },
      orderBy: { updatedAt: 'desc' }
    }),

    db.order.count({ where: or })
  ])

  return {
    orders,
    totalPages: Math.ceil(total / pageSize)
  }
}

export async function deleteOrder(id: string) {
  const order = await db.order.delete({
    where: { id }
  })

  if (order == null) return notFound()

  return order
}
