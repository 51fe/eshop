import { ThemeToggle } from '@/components/theme-toggle'
import { LibraryIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { UserMenu } from './user-menu'

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className=" flex justify-between bg-primary px-4 text-primary-foreground sticky">
      <div className="self-center md:hidden lg:flex">
        <a href="/">
          <LibraryIcon className="size-8" />
        </a>
      </div>
      <div className="flex">{children}</div>
      <div className="flex self-center">
        <ThemeToggle />
        <UserMenu />
      </div>
    </nav>
  )
}
