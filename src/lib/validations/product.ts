import { upLoadFile, upLoadImg } from '@/config'
import { z } from 'zod'
import { defineFileSchema } from '@/lib/utils'

export const addProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  priceInCents: z.coerce
    .number()
    .int()
    .min(1, 'Price is required')
    .max(2 ** 31 - 1),
  file: defineFileSchema(upLoadFile),
  image: defineFileSchema(upLoadImg)
})

export const editProductSchema = addProductSchema.extend({
  file: defineFileSchema(upLoadFile, false),
  image: defineFileSchema(upLoadImg, false)
})

export type ProductInput = z.infer<typeof addProductSchema>
export type UploadError = {
  [K in keyof ProductInput]?: string
}
