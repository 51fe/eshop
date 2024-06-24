import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import {
  ArrowDownToLine,
  CheckCircle2,
  MoreVerticalIcon,
  PencilIcon,
  PlusIcon,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem
} from '@/components/dropdown/products'
import { Noresult } from '@/components/no-result'
import Search from '@/components/table/search'
import Pagination from '@/components/table/pagination'
import { getProducts } from '@/lib/actions/admin/products'
import { Suspense } from 'react'
import AdminLoading from '@/components/loading'

export default async function AdminProductsPage({ searchParams }: SearchProps) {
  const query = searchParams.query || ''
  const page = Number(searchParams.page) || 1

  const { products, totalPages } = await getProducts({ query, page })

  return (
    <>
      <PageHeader>Products</PageHeader>
      <div className="mb-4 flex items-center justify-between gap-2">
        {totalPages > 0 && <Search placeholder="Search products..." />}
        <Button
          title="Add Product"
          asChild
        >
          <Link href="/admin/products/new">
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <Suspense
        key={query + page}
        fallback={<AdminLoading />}
      >
        <ProductsTable />
      </Suspense>
    </>
  )

  async function ProductsTable() {
    if (totalPages === 0) return <Noresult itemName="products" />

    return (
      <>
        <Table>
          <TableCaption className="sr-only">
            Available For Purchase
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.isAvailable ? (
                    <>
                      <span className="sr-only">Available</span>
                      <CheckCircle2 />
                    </>
                  ) : (
                    <>
                      <span className="sr-only">Unavailable</span>
                      <XCircle className="stroke-destructive" />
                    </>
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {formatCurrency(product.priceInCents / 100)}
                </TableCell>
                <TableCell>{formatNumber(product._count.orders)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVerticalIcon className="mt-1 size-4" />
                      <span className="sr-only">Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <ArrowDownToLine className="mr-2 size-4" />
                        <a
                          download
                          href={`/admin/products/${product.id}/download`}
                        >
                          Download
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PencilIcon className="mr-3 size-4" />
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="block w-full"
                        >
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <ActiveToggleDropdownItem
                        id={product.id}
                        isAvailable={product.isAvailable}
                      />
                      <DeleteDropdownItem
                        id={product.id}
                        disabled={product._count.orders > 0}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </>
    )
  }
}
