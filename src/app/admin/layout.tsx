import { Navbar } from '@/components/nav/navigation'
import { adminNavItems } from '@/config'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar items={adminNavItems} />
      <div className="container my-6">{children}</div>
    </>
  )
}
