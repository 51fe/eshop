import fs from 'node:fs/promises'
import db from '@/lib/db'
import { NextResponse, type NextRequest } from 'next/server'

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

  const { size } = await fs.stat(data.product.file)
  const file = await fs.readFile(data.product.file)
  const extension = data.product.file.split('.').pop()

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${data.product.name}.${extension}"`,
      'Content-Length': size.toString()
    }
  })
}
