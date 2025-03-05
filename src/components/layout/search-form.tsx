'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchFormProps {
  defaultValue: string
}

export function SearchForm({ defaultValue }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build the URL with all current parameters
    const params = new URLSearchParams(searchParams.toString())

    // Update or remove the search query parameter
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }

    // Navigate to the products page with the updated parameters
    router.push(`/products?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className='flex w-full items-center relative'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Search products...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-[250px] sm:w-[350px] pl-9'
      />
    </form>
  )
}
