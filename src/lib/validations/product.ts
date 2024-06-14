import { upLoadFile, upLoadImg } from '@/config'
import { z } from 'zod'
import { defineFileSchema } from '../utils'

const file = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: 'Please select a file'
  })
  .refine((file) => file.size < upLoadFile.size * 1024 * 1024, {
    message: `Max file size is ${upLoadFile.size} MB`
  })
  .refine(
    (file) =>
      file.size === 0 || upLoadFile.formats.includes(file.name.slice(-3)),
    {
      message: `Only support ${upLoadFile.formats}`
    }
  )

const image = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: 'Please select a image'
  })
  .refine((file) => file.size < upLoadImg.size * 1024 * 1024, {
    message: `Max image size is ${upLoadImg.size} MB`
  })
  .refine(
    (file) =>
      file.size === 0 || upLoadImg.formats.includes(file.name.slice(-3)),
    {
      message: `Only support ${upLoadImg.formats}`
    }
  )

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
