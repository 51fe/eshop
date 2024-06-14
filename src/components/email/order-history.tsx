import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind
} from '@react-email/components'
import React from 'react'
import { OrderInformation } from './order-information'

type OrderHistoryEmailProps = {
  orders: {
    id: string
    pricePaidInCents: number
    createdAt: Date
    downloadVerificationId: string
    product: {
      name: string
      image: string
      description: string
    }
  }[]
}

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product name',
        description: 'Some description',
        image: '/5aba7442-e4a5-4d2e-bfa7-5bd358cdad64-02 - What Is Next.js.jpg'
      }
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 2000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product name 2',
        description: 'Some other desc',
        image:
          '/db3035a5-e762-41b0-996f-d54ec730bc9c-01 - Course Introduction.jpg'
      }
    }
  ]
} satisfies OrderHistoryEmailProps

export function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  const previewText = `Order History & Downloads`
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>{previewText}</title>
        </Head>
        <Preview>{previewText} </Preview>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
