'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { SearchForm } from './search-form'

export function ClientNavbar() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

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
          <SearchForm defaultValue={searchQuery} />
        </div>
      </div>
    </header>
  )
}
