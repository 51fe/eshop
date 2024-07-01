import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import db from '@/lib/db'
import { formatCurrency } from '@/lib/formatters'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function PurchasePage({
  params: { id }
}: {
  params: { id: string }
}) {
  const product = await db.product.findUnique({
    where: { id }
  })
  if (product == null) return notFound()

  const { name, priceInCents, image, description, createdAt, updatedAt } = product

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="mx-auto">
        <Image
          priority
          src={`/${image}`}
          width={240}
          height={240}
          alt={name}
        />
      </div>
      <CardHeader>
        <CardTitle className="mb-2">{name}</CardTitle>
        <CardDescription className="space-y-2">
          <div><span className="font-bold">Price: </span>{formatCurrency(priceInCents / 100)}</div>
          <div><span className="font-bold">Released: </span>{ createdAt.toLocaleDateString() }</div>
          <div><span className="font-bold">Updated: </span> { updatedAt.toLocaleDateString() }</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          size="lg"
          className="w-full"
        >
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
