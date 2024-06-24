import { type ReactNode } from 'react'

export function PageHeader({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 ml-2 text-2xl">{children}</h2>
}
