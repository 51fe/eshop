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
import { site } from '@/config'
import db from '@/lib/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { MoreVertical } from 'lucide-react'
import { type Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { DeleteDropDownItem } from '@/components/dropdown/customers'

export const metadata: Metadata = {
  title: `${site.name} - Customers`
}

function getCustomers() {
  return db.customer.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export default function CustomersPage() {
  return (
    <>
      <PageHeader>Customers</PageHeader>
      <UsersTable />
    </>
  )
}

async function UsersTable() {
  const customers = await getCustomers()

  if (customers.length === 0) return <p>No customers found</p>

  return (
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={customer.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
