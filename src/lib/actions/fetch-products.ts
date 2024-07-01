'use server'

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function fetchProducts(
  query: string = '',
  pageSize: number = 6,
  cursor: string | undefined = undefined
) {
  const or: Prisma.ProductWhereInput = query
    ? {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } }
        ]
      }
    : {}

  // Define the type for query options using Prisma's types
  const products = await prisma.product.findMany({
    take: pageSize + 1, // Fetch one extra item to check if there's a next page

    where: {
      isAvailable: true,
      ...or
    },
    select: {
      id: true,
      name: true,
      priceInCents: true,
      description: true,
      image: true
    },
    cursor: cursor
      ? {
          id: cursor
        }
      : undefined,
    skip: cursor ? 1 : undefined, // Skip the cursor itself
    orderBy: {
      id: 'desc' // Ensure a consistent order
    }
  })

  const hasNextPage: boolean = products.length > pageSize
  if (hasNextPage) {
    products.pop() // Remove the extra item if we fetched one
  }

  return {
    products: products,
    hasNextPage: hasNextPage,
    nextCursor: hasNextPage ? products[products.length - 1].id : undefined
  }
}
