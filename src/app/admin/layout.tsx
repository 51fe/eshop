import { NavLink } from '@/components/nav/nav-link'
import { Navbar } from '@/components/nav/navigation'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/customers">Customers</NavLink>
        <NavLink href="/admin/orders">Orders</NavLink>
      </Navbar>
      <div className="container my-6">{children}</div>
    </>
  )
}
