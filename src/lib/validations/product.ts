import { upLoadFile, upLoadImg } from '@/config'
import { z } from 'zod'
import { defineFileSchema } from '@/lib/utils'

export const addProductSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  priceInCents: z.coerce
    .number({ required_error: 'Price is required' })
    .int()
    .min(100, 'Price must be at least 1$')
    .max(100000, 'Price must not be more than 1000$'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2, 'Description must be at least 2 characters')
    .max(4000, 'Description must not be more than 4000 characters'),
  file: defineFileSchema(upLoadFile),
  image: defineFileSchema(upLoadImg)
})

export const editProductSchema = addProductSchema.extend({
  file: defineFileSchema(upLoadFile).optional(),
  image: defineFileSchema(upLoadImg).optional()
})

export type ProductInput = z.infer<typeof addProductSchema>
export type UploadError = {
  [K in keyof ProductInput]?: string
}
