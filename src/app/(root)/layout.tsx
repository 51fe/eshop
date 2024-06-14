import { NavLink } from '@/components/nav/nav-link'
import { Navbar } from '@/components/nav/navigation'

export const dynamic = 'force-dynamic'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">Orders</NavLink>
        <NavLink href="/admin">Admin</NavLink>
      </Navbar>
      <div className="container my-6">{children}</div>
    </>
  )
}
