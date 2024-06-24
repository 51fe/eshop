'use client'

import { SearchIcon } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FormEvent, useState } from 'react'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [query, setQuery] = useState(searchParams.get('query') ?? '')

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center space-x-2"
    >
      <label
        htmlFor="search"
        className="sr-only"
      >
        Search
      </label>
      <Input
        id="query"
        name="query"
        className="md:w-1/2"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
