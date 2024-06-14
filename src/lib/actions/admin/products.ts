'use server'

import { mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { notFound, redirect } from 'next/navigation'

import db from '@/lib/db'
import { addProductSchema, editProductSchema } from '@/lib/validations/product'

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addProductSchema.safeParse(Object.fromEntries(formData))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const { name, description, priceInCents } = result.data

  const file = await uploadFile(formData, 'file')
  const image = await uploadFile(formData, 'image')

  await db.product.create({
    data: {
      name,
      description,
      priceInCents,
      file,
      image
    }
  })

  redirect('/admin/products')
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editProductSchema.safeParse(Object.fromEntries(formData))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  let { file, image } = product
  if (data.file && data.file.size > 0) {
    await unlink(path.join('./uploads', file))
    file = await uploadFile(formData, 'file')
  }

  if (data.image && data.image.size > 0) {
    await unlink(path.join('./public', image))
    image = await uploadFile(formData, 'image')
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      file,
      image
    }
  })
  redirect('/admin/products')
}

export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailable } })
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })
  if (product == null) return notFound()

  await unlink(`./uploads/${product.file}`)
  await unlink(`./public/${product.image}`)
}

async function uploadFile(formData: FormData, field: string) {
  const file = formData.get(field) as File
  await mkdir(path.join('./uploads'), { recursive: true })
  const fileBuffer = await file.arrayBuffer()
  let folder = ''
  if (file.type.startsWith('image')) {
    folder = './public'
  } else {
    folder = './uploads'
  }
  const filename = `${crypto.randomUUID()}-${file.name}`
  const filePath = path.join(folder, filename)
  await writeFile(filePath, Buffer.from(fileBuffer))
  return filename
}
