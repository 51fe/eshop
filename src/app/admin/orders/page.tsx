import { Suspense } from 'react'
import { Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/formatters'
import { PageHeader } from '@/components/page-header'
import { Noresult } from '@/components/no-result'
import { site } from '@/config'
import Search from '@/components/table/search'
import Pagination from '@/components/table/pagination'
import { deleteOrder, getOrders } from '@/lib/actions/admin/orders'
import AdminLoading from '@/components/loading'
import { DeleteButton } from '@/components/delete-button'

export const metadata: Metadata = {
  title: `${site.name} - Orders`
}

export default async function OrdersPage({ searchParams }: SearchProps) {
  const query = searchParams.query || ''
  const page = Number(searchParams.page) || 1

  const { orders, totalPages } = await getOrders({ query, page })

  return (
    <>
      <PageHeader>Orders</PageHeader>
      {orders.length > 0 && (
        <div className="mb-4">
          <Search placeholder="Search orders..." />
        </div>
      )}
      <Suspense
        key={query + page}
        fallback={<AdminLoading />}
      >
        <OrdersTable />
      </Suspense>
    </>
  )

  async function OrdersTable() {
    if (totalPages === 0) return <Noresult itemName="order" />

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.customer.email}</TableCell>
                <TableCell>
                  {formatCurrency(order.pricePaidInCents / 100)}
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton
                    id={order.id}
                    onGetAction={deleteOrder}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    )
  }
}
