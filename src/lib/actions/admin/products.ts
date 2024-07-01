'use server'

import { access, constants, mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { notFound, redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'
import {
  ProductInput,
  addProductSchema,
  editProductSchema
} from '@/lib/validations/product'
import db from '@/lib/db'

const fileFolder = './uploads'
const imgFolder = './public'
const pageSize = 8

export async function getProducts({ query, page = 1 }: SearchParams) {
  const skip = (page - 1) * pageSize
  const take = pageSize

  const or: Prisma.ProductWhereInput = query
    ? {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } }
        ]
      }
    : {}
  const [products, total] = await db.$transaction([
    db.product.findMany({
      take,
      skip,
      where: or,
      select: {
        id: true,
        name: true,
        priceInCents: true,
        isAvailable: true,
        _count: { select: { orders: true } }
      },
      orderBy: { updatedAt: 'desc' }
    }),

    db.product.count({
      where: or
    })
  ])

  return {
    products,
    totalPages: Math.ceil(total / pageSize)
  }
}

export async function addProduct(formData: ProductInput) {
  const result = addProductSchema.safeParse(formData)
  if (result.success === false) {
    return { error: 'Check product failed' }
  }

  const { name, description, priceInCents } = result.data
  const file = await uploadFile(result.data.file, fileFolder)
  const image = await uploadFile(result.data.image, imgFolder)
  if (typeof file === 'string' && typeof image === 'string') {
    try {
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
    } catch (error) {
      return { error: 'Add product failed' }
    }
  } else {
    return { error: 'Add file failed' }
  }
}

export async function updateProduct(id: string, formData: ProductInput) {
  const result = editProductSchema.safeParse(formData)
  if (result.success === false) {
    return { error: 'Check product failed' }
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  let { file, image } = product

  if (data.file && data.file.size > 0) {
    try {
      await unlink(path.join(fileFolder, file))
      const result = await uploadFile(data.file, fileFolder, false)
      if (typeof result === 'string') {
        file = result
      }
    } catch (error) {
      return { error: 'No such a file' }
    }
  }

  if (data.image && data.image.size > 0) {
    try {
      await unlink(path.join(imgFolder, image))
      const result = await uploadFile(data.image, imgFolder, false)
      if (typeof result === 'string') {
        image = result
      }
    } catch (error) {
      return { error: 'No such an image' }
    }
  }

  try {
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
  } catch (error) {
    console.log(error)
    return { error: 'Update product failed' }
  }
  redirect('/admin/products')
}

export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailable } })
}

export async function deleteProduct(id: string) {
  try {
    const product = await db.product.delete({ where: { id } })
    if (product == null) return notFound()

    await unlink(path.join(fileFolder, product.file))
    await unlink(path.join(imgFolder, product.image))
  } catch (error) {}
}

async function uploadFile(file: File, folder: string, adding = true) {
  if (adding && folder === fileFolder) {
    try {
      await access(folder, constants.F_OK)
    } catch (eror) {
      try {
        await mkdir(folder, { recursive: true })
      } catch (err) {
        return { error: 'Create upload folder failed' }
      }
    }
  }
  const fileBuffer = await file.arrayBuffer()
  const filename = `${crypto.randomUUID()}-${file.name}`
  const filePath = path.join(folder, filename)
  await writeFile(filePath, Buffer.from(fileBuffer))
  return filename
}
