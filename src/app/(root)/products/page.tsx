import { ProductCard, ProductCardSkeleton } from '@/components/product-card'
import { cache } from '@/lib/cache'
import db from '@/lib/db'
import { Suspense } from 'react'

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: 'desc' }
  })
}, ['/products', 'getProducts'])

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  )
}

async function ProductsSuspense() {
  const products = await getProducts()

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}
