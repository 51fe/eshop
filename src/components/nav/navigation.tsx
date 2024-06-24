import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'
import { LinkList } from './link-list'
import { NavigationMobile } from './navigation-mobile'
import { Logo } from './logo'

export function Navbar({ items }: NavListProps) {
  return (
    <nav className="flex justify-between bg-primary px-4 text-primary-foreground">
      <Logo />
      <div className="px-4 py-2">
        <NavigationMobile navItems={items} />
      </div>

      <div className="flex items-center justify-center max-md:hidden">
        <LinkList items={items} />
      </div>
      <div className="flex self-center">
        <ThemeToggle />
        <UserMenu />
      </div>
    </nav>
  )
}
