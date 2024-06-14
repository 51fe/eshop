'use client'

import { useState } from 'react'
import Image from 'next/image'
import { upLoadFile, upLoadImg } from '@/config'
import { type Product } from '@prisma/client'
import { useFormState } from 'react-dom'

import { formatCurrency } from '@/lib/formatters'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/submit-button'

import { addProduct, updateProduct } from '@/lib/actions/admin/products'

export function ProductForm({ product }: { product?: Product | null }) {
  const [state, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  )

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ''}
        />
        {state && <div className="text-destructive">{state.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          defaultValue={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {state && <div className="text-destructive">{state.priceInCents}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
        />
        {state && <div className="text-destructive">{state.description}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" accept={upLoadFile.formats} />
        {product != null && (
          <div className="text-muted-foreground">{product.file}</div>
        )}
        {state && <div className="text-destructive">{state.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" accept={upLoadImg.formats} />
        {product != null && (
          <Image
            src={`/${product.image}`}
            width={240}
            height={240}
            alt="Product Image"
          />
        )}
        {state && <div className="text-destructive">{state.image}</div>}
      </div>
      <div className="space-y-2">
        <SubmitButton description="Save the product" className="w-full">
          {product != null ? 'Add' : 'Update'} product
        </SubmitButton>
      </div>
    </form>
  )
}
