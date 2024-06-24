'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { CircleChevronDown } from 'lucide-react'
import { Logo } from './logo'

interface NavigationMobileProps {
  navItems: NavItem[]
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  disabled?: boolean
  segment: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setIsOpen
}: MobileLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        href.includes(segment) && 'text-foreground',
        disabled && 'pointer-events-none opacity-60'
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}

export function NavigationMobile({ navItems }: NavigationMobileProps) {
  const segment = useSelectedLayoutSegment()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger
        asChild
        className="transition-all duration-300 ease-in-out"
      >
        <Button
          variant="navbarIcon"
          size="icon"
          className="md:hidden"
        >
          <CircleChevronDown
            className="size-6"
            aria-hidden="true"
          />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col gap-10 transition-all duration-300 ease-in-out"
      >
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription>Menus</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 text-xl font-medium leading-none tracking-wide">
          {navItems.map((item) => (
            <MobileLink
              key={item.title}
              href={item.href}
              segment={String(segment)}
              setIsOpen={setIsOpen}
            >
              <span className="pl-16">{item.title}</span>
            </MobileLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
