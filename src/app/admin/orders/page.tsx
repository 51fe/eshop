import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/formatters'
import { MoreVertical } from 'lucide-react'
import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { DeleteDropDownItem } from '@/components/dropdown/orders'
import { Noresult } from '@/components/no-result'
import { site } from '@/config'
import Search from '@/components/table/search'
import Pagination from '@/components/table/pagination'
import { getOrders } from '@/lib/actions/admin/orders'
import { Suspense } from 'react'
import AdminLoading from '@/components/loading'

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
      {totalPages > 0 && (
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
              <TableHead>Price Paid</TableHead>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DeleteDropDownItem id={order.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
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
