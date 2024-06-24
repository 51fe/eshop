import fs from 'node:fs/promises'
import path from 'node:path'
import db from '@/lib/db'
import { notFound } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { file: true, name: true }
  })

  if (product == null) return notFound()

  const filePath = path.join('uploads', product.file)
  const { size } = await fs.stat(filePath)
  const file = await fs.readFile(filePath)
  const extension = product.file.split('.').pop()
  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
      'Content-Length': size.toString()
    }
  })
}
