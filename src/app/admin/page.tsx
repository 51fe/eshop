import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { site } from '@/config'
import db from '@/lib/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: `${site.name} - Dashboard`
}

async function getOrdersData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  })

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfOrders: data._count
  }
}

async function getCustomerData() {
  const [customerCount, orderData] = await Promise.all([
    db.customer.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true }
    })
  ])

  return {
    customerCount,
    averageValuePerUser:
      customerCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / customerCount / 100
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailable: true } }),
    db.product.count({ where: { isAvailable: false } })
  ])

  return { activeCount, inactiveCount }
}

export default async function AdminDashboard() {
  const [ordersData, customerData, productData] = await Promise.all([
    getOrdersData(),
    getCustomerData(),
    getProductData()
  ])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Orders"
        subtitle={`${formatNumber(ordersData.numberOfOrders)} Orders`}
        body={formatCurrency(ordersData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          customerData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(customerData.customerCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  )
}

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
