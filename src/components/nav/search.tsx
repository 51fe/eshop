'use client'

import React, { FormEvent, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog'
import { useRouter, useSearchParams } from 'next/navigation'

export function Search() {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [query, setQuery] = useState(searchParams.get('query') ?? '')

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    setOpen(false)
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    replace(`/products?${params.toString()}`)
  }

  const handleReset = () => {
    setOpen(false)
    setQuery('')
    replace('/products')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <SearchIcon className="mr-2 size-5 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSearch}
          className="w-full space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Search the product</DialogTitle>
            <DialogDescription>Return or push buttons</DialogDescription>
          </DialogHeader>
          <label
            htmlFor="search"
            className="sr-only"
          >
            Search
          </label>
          <Input
            id="query"
            name="query"
            className="w-full"
            placeholder="Keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit">Search</Button>
            <Button
              type="reset"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
