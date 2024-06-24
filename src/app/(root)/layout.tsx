import { Navbar } from '@/components/nav/navigation'
import QueryWrapper from '@/components/scroll/query-wrapper'
import { navItems } from '@/config'

export const dynamic = 'force-dynamic'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar items={navItems} />
      <QueryWrapper>
        <div className="container my-6">{children}</div>
      </QueryWrapper>
    </>
  )
}
