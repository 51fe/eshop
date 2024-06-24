import { Suspense } from 'react'
import { ProductCardSkeleton } from '@/components/list/product-card'
import { ProductList } from '@/components/list/product'
import { Noresult } from '@/components/no-result'
import { fetchProducts } from '@/lib/actions/fetch-products'
import LoadMore from '@/components/scroll/load-more'

export default async function ProductsPage() {
  const { products, hasNextPage, nextCursor } = await fetchProducts(6)
  if (products.length === 0) return <Noresult itemName="products" />

  return (
    <>
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
          <ProductsSuspense products={products} />
        </Suspense>
      </div>
      {hasNextPage && <LoadMore nextCursor={nextCursor} />}
    </>
  )
}

async function ProductsSuspense({ products }: { products: ProductInfo[] }) {
  return <ProductList products={products} />
}
