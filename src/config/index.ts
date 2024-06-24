export const site = {
  name: 'EShop',
  description: 'Ebook store'
}

export const navItems = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Products',
    href: '/products'
  },
  {
    title: 'Orders',
    href: '/orders'
  },
  {
    title: 'Admin',
    href: '/admin'
  }
] satisfies NavItem[]

export const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin'
  },
  {
    title: 'Products',
    href: '/admin/products'
  },
  {
    title: 'Customers',
    href: '/admin/customers'
  },
  {
    title: 'Orders',
    href: '/admin/orders'
  }
] satisfies NavItem[]

export const upLoadImg = {
  formats: '.jpg, .jpeg, .png, .gif',
  size: 1
}

export const upLoadFile = {
  formats: '.pdf, .doc, .docx, .zip, .rar',
  size: 300
}

export const currency = 'usd'
