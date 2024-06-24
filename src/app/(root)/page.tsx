import { ProductCardSkeleton } from '@/components/list/product-card'
import { ProductList } from '@/components/list/product'
import { Noresult } from '@/components/no-result'
import { Button } from '@/components/ui/button'
import { cache } from '@/lib/cache'
import db from '@/lib/db'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        priceInCents: true,
        description: true,
        image: true
      },
      where: { isAvailable: true },
      orderBy: { orders: { _count: 'desc' } }
    })
  },
  ['/', 'getMostPopularProducts'],
  { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
  return db.product.findMany({
    take: 3,
    select: {
      id: true,
      name: true,
      priceInCents: true,
      description: true,
      image: true
    },
    where: { isAvailable: true },
    orderBy: { createdAt: 'desc' }
  })
}, ['/', 'getNewestProducts'])

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection
        title="Newest"
        productsFetcher={getNewestProducts}
      />
    </main>
  )
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<ProductInfo[]>
}

async function ProductGridSection({
  productsFetcher,
  title
}: ProductGridSectionProps) {
  const products = await productsFetcher()
  if (products.length === 0) return <Noresult itemName="products" />

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button
          variant="outline"
          asChild
        >
          <Link
            href="/products"
            className="space-x-2"
          >
            <span>More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense products={products} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductSuspense({ products }: { products: ProductInfo[] }) {
  return <ProductList products={products} />
}
