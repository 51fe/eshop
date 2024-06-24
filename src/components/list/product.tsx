import React from 'react'
import { ProductCard } from './product-card'

export function ProductList({ products }: { products: ProductInfo[] }) {
  return products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      index={index}
    />
  ))
}
