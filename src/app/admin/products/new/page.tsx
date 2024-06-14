import { site } from '@/config'
import { type Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ProductForm } from '@/components/form/product'

export const metadata: Metadata = {
  title: `${site.name} - Add Product`
}
export default function NewProductPage() {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </>
  )
}
