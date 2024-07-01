import { formatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { MotionDiv } from './motion'

const stagger = 0.25

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

interface ProductCardProps {
  product: ProductInfo
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { id, name, priceInCents, description, image } = product
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: 'easeInOut',
        duration: 0.5
      }}
      viewport={{ amount: 0 }}
      className="relative w-full max-w-sm rounded"
    >

      <Card className="flex flex-col overflow-hidden hover:border-foreground transition-colors duration-500">
        <Link href={`/products/${id}`}>
          <div className="flex justify-center">
            <Image
              priority
              src={`/${image}`}
              width={200}
              height={200}
              alt={name}
            />
          </div>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription className="space-y-4">
              {formatCurrency(priceInCents / 100)}
            </CardDescription>
          </CardHeader>
          <CardContent className="whitespace-pre-wrap">
            <p className="line-clamp-2">{description}</p>
          </CardContent>
        </Link>
        <CardFooter>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <Link href={`/products/${id}/purchase`}>Purchase</Link>
          </Button>
        </CardFooter>
      </Card>
    </MotionDiv>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex animate-pulse flex-col overflow-hidden">
      <div className="aspect-video w-full bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="h-6 w-3/4 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="h-4 w-1/2 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-3/4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled
          size="lg"
        ></Button>
      </CardFooter>
    </Card>
  )
}
