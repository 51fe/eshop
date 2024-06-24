import fs from 'node:fs/promises'
import path from 'node:path'
import { NextResponse, NextRequest } from 'next/server'
import db from '@/lib/db'

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId }
  }: { params: { downloadVerificationId: string } }
) {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { file: true, name: true } } }
  })

  if (data == null) {
    return NextResponse.redirect(new URL('/products/download/expired', req.url))
  }

  const { product } = data
  const filePath = path.join('uploads', product.file)
  const { size } = await fs.stat(filePath)
  const file = await fs.readFile(filePath)
  const extension = product.file.split('.').pop()

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${data.product.name}.${extension}"`,
      'Content-Length': size.toString()
    }
  })
}
