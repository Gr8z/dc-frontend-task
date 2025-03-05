import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function NavigationSection() {
  return (
    <section className='space-y-6'>
      <h2 className='text-3xl font-bold'>Application Navigation</h2>
      <div className='grid md:grid-cols-3 gap-6'>
        {/* Product Listing Card */}
        <div className='bg-card border rounded-lg p-6 space-y-4'>
          <h3 className='text-xl font-semibold'>Product Listing</h3>
          <p className='text-muted-foreground'>
            Browse all products with filtering and sorting options.
          </p>
          <Link
            href='/products'
            className='inline-flex items-center text-primary hover:underline'
          >
            View Products <ArrowRight className='h-4 w-4 ml-1' />
          </Link>
        </div>

        {/* Search Functionality Card */}
        <div className='bg-card border rounded-lg p-6 space-y-4'>
          <h3 className='text-xl font-semibold'>Search Functionality</h3>
          <p className='text-muted-foreground'>
            Use the search bar in the navbar to find specific products.
          </p>
          <p className='text-sm text-muted-foreground'>
            Try searching for &quot;phone&quot;, &quot;laptop&quot;, or
            &quot;watch&quot;
          </p>
        </div>

        {/* Product Details Card */}
        <div className='bg-card border rounded-lg p-6 space-y-4'>
          <h3 className='text-xl font-semibold'>Product Details</h3>
          <p className='text-muted-foreground'>
            View detailed information about each product.
          </p>
          <Link
            href='/products/1'
            className='inline-flex items-center text-primary hover:underline'
          >
            View Example <ArrowRight className='h-4 w-4 ml-1' />
          </Link>
        </div>
      </div>
    </section>
  )
}
