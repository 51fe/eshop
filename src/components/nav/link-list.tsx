'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps extends React.PropsWithChildren {
  href: string
}

function NaviLink({ children, href }: NavLinkProps): JSX.Element {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn(
        'p-4 transition-all duration-300 ease-in-out hover:opacity-70',
        pathname === href && 'bg-background text-foreground'
      )}
    >
      {children}
    </Link>
  )
}

export function LinkList({ items }: NavListProps) {
  return (
    <>
      {items.map((item) => (
        <NaviLink
          key={item.href}
          href={item.href}
        >
          {item.title}
        </NaviLink>
      ))}
    </>
  )
}
