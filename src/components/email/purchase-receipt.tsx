import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind
} from '@react-email/components'
import { OrderInformation } from './order-information'

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Product name',
    description: 'Some description',
    image: '/5aba7442-e4a5-4d2e-bfa7-5bd358cdad64-02 - What Is Next.js.jpg'
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000
  },
  downloadVerificationId: crypto.randomUUID()
} satisfies OrderInfo

export function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId
}: OrderInfo) {
  const previewText = `Download {product.name} and view receipt`
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>{previewText}</title>
        </Head>
        <Preview>{previewText} </Preview>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
