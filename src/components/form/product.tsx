'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import { upLoadFile, upLoadImg } from '@/config'
import { type Product } from '@prisma/client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/submit-button'

import { addProduct, updateProduct } from '@/lib/actions/admin/products'
import {
  ProductInput,
  addProductSchema,
  editProductSchema
} from '@/lib/validations/product'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { useToast } from '../ui/use-toast'

export function ProductForm({ product }: { product?: Product | null }) {
  let form = useForm<ProductInput>({
    resolver: zodResolver(
      product == null ? addProductSchema : editProductSchema
    ),
    defaultValues: {
      name: product?.name,
      priceInCents: product?.priceInCents ?? 0,
      description: product?.description
    }
  })

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  function onSubmit(formData: ProductInput) {
    startTransition(async () => {
      const { error } =
        product == null
          ? await addProduct(formData)
          : await updateProduct(product.id, formData)

      if (!!error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-6 md:w-full lg:w-2/3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceInCents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price In Cents</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept={upLoadFile.formats}
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              {product != null && (
                <FormDescription className="text-muted-foreground">
                  {product.file}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept={upLoadImg.formats}
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              {product != null && (
                <FormDescription>
                  <Image
                    src={`/${product.image}`}
                    width={200}
                    height={200}
                    alt="Product Image"
                  />
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isPending={isPending}
          description="Save the product"
          className="w-full"
        >
          {!product?.id ? 'Add' : 'Update'} product
        </SubmitButton>
      </form>
    </Form>
  )
}
