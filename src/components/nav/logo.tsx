import { LibraryIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function Logo() {
  return (
    <Link
      href="/"
      title="Back to home"
      className="items-center md:hidden lg:flex"
    >
      <LibraryIcon className="size-8" />
      <span className="sr-only">Home</span>
    </Link>
  )
}
