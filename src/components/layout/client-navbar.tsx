'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { SearchForm } from './search-form'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Loading fallback for search form
function SearchFormSkeleton() {
  return (
    <div className='w-[250px] sm:w-[350px] h-9 bg-muted/20 rounded-md animate-pulse' />
  )
}

// Separate component that uses useSearchParams
function NavbarSearch() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return <SearchForm defaultValue={searchQuery} />
}

export function ClientNavbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between'>
        <div className='flex items-center space-x-8'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='font-bold text-xl'>Desert Cart</span>
          </Link>
          <nav className='hidden md:flex space-x-6'>
            <Link
              href='/products'
              className='flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              <ShoppingBag className='h-4 w-4 mr-1' />
              Products
            </Link>
          </nav>
        </div>
        <div className='flex items-center'>
          <Suspense fallback={<SearchFormSkeleton />}>
            <NavbarSearch />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
