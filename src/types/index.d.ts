import { Order, Product } from '@prisma/client'

export {}

declare global {
  interface NavItem {
    title: string
    href: string
    disabled?: boolean
  }

  interface NavListProps {
    items: NavItem[]
  }

  interface SearchParams {
    query?: string
    page?: number
  }

  interface SearchProps {
    searchParams: SearchParams
  }

  type ProductInfo = Pick<
    Product,
    'id' | 'name' | 'priceInCents' | 'image' | 'description'
  >

  interface OrderInfo {
    product: Pick<ProductInfo, 'name' | 'image' | 'description'>
    order: Pick<Order, 'id' | 'pricePaidInCents' | 'createdAt'>
    downloadVerificationId: string
  }
}
