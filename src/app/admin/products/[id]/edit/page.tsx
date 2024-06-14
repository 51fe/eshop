import { site } from '@/config'
import db from '@/lib/db'
import { type Metadata } from 'next/types'
import { PageHeader } from '@/components/page-header'
import { ProductForm } from '@/components/form/product'

export const metadata: Metadata = {
  title: `${site.name} - Edit Product`
}

export default async function EditProductPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const product = await db.product.findUnique({ where: { id } })

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  )
}
