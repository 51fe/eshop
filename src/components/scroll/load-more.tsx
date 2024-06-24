'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { fetchProducts } from '@/lib/actions/fetch-products'
import { ProductCard } from '@/components/list/product-card'
import { Loader2 } from 'lucide-react'

export default function LoadMore({
  nextCursor
}: {
  nextCursor: string | undefined
}) {
  const {
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryFn: ({ pageParam = nextCursor }) => fetchProducts(6, pageParam),
    queryKey: ['products'],
    initialPageParam: nextCursor,
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor
    }
  })

  // to know when the last element is in view
  const { ref, inView } = useInView({
    onChange(inView) {
      if (inView && hasNextPage) {
        fetchNextPage()
      }
    }
  })

  if (isError) throw new Error(error.message)

  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((page) =>
          page.products.map((product: ProductInfo, index: number) => {
            if (page.products.length === index + 1) {
              return (
                <div
                  ref={ref}
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    index={index}
                  />
                </div>
              )
            }
            return (
              <ProductCard
                key={`product${product.id}`}
                product={product}
                index={index}
              />
            )
          })
        )}
      </section>
      <div className="mb-2 flex w-full items-center justify-center">
        {isFetchingNextPage && inView && (
          <Loader2 className="size-12 animate-spin" />
        )}
      </div>
    </>
  )
}
