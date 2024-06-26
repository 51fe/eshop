import { Suspense } from 'react'
import { type Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { site } from '@/config'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { PageHeader } from '@/components/page-header'
import { Noresult } from '@/components/no-result'
import { deleteCustomer, getCustomers } from '@/lib/actions/admin/customers'
import Search from '@/components/table/search'
import Pagination from '@/components/table/pagination'
import AdminLoading from '@/components/loading'
import { DeleteButton } from '@/components/delete-button'

export const metadata: Metadata = {
  title: `${site.name} - Customers`
}

export default async function CustomersPage({ searchParams }: SearchProps) {
  const query = searchParams.query || ''
  const page = Number(searchParams.page) || 1

  const { customers, totalPages } = await getCustomers({ query, page })

  return (
    <>
      <PageHeader>Orders</PageHeader>
      {customers.length > 0 && (
        <div className="mb-4">
          <Search placeholder="Search customers..." />
        </div>
      )}
      <Suspense
        key={query + page}
        fallback={<AdminLoading />}
      >
        <CustomersTable />
      </Suspense>
    </>
  )

  async function CustomersTable() {
    if (totalPages === 0) return <Noresult itemName="customers" />

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{formatNumber(customer.orders.length)}</TableCell>
                <TableCell>
                  {formatCurrency(
                    customer.orders.reduce(
                      (sum, o) => o.pricePaidInCents + sum,
                      0
                    ) / 100
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton
                    id={customer.id}
                    onGetAction={deleteCustomer}
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
