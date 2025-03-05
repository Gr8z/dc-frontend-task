import { Button } from '@/components/ui/button'
import { getCategories } from '@/lib/api/products'
import { setFilters, resetFilters } from '@/lib/actions/filter-actions'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  StarIcon,
  XIcon,
} from 'lucide-react'

interface ServerProductFiltersProps {
  searchParams: {
    q?: string
    category?: string
    sort?: string
  }
}

// Loading skeleton for filters
function FiltersSkeleton() {
  return (
    <div className='space-y-6'>
      <div>
        <Skeleton className='h-5 w-24 mb-3' />
        <div className='flex flex-wrap gap-2'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className='h-8 w-16' />
            ))}
        </div>
      </div>
      <div className='pt-2 border-t'>
        <Skeleton className='h-5 w-16 mb-3' />
        <div className='flex flex-col gap-2'>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className='h-8 w-full' />
            ))}
        </div>
      </div>
    </div>
  )
}

export async function ServerProductFilters({
  searchParams,
}: ServerProductFiltersProps) {
  // We no longer need to await searchParams since we're now receiving the already awaited object
  const searchQuery = searchParams.q || ''
  const currentCategory = searchParams.category || null
  const currentSortBy = searchParams.sort || null

  // Fetch categories
  const categories = await getCategories()

  // Check if any filters are active
  const hasActiveFilters = currentCategory !== null || currentSortBy !== null

  return (
    <div className='space-y-6'>
      {/* Categories */}
      <div>
        <h3 className='text-sm font-medium mb-3 text-foreground/80 flex items-center'>
          <FilterIcon className='h-4 w-4 mr-2' />
          Categories
        </h3>
        <div className='flex flex-wrap gap-2'>
          <form action={setFilters}>
            <input type='hidden' name='q' value={searchQuery} />
            {currentSortBy && (
              <input type='hidden' name='sort' value={currentSortBy} />
            )}
            <Button
              variant={currentCategory === null ? 'default' : 'outline'}
              size='sm'
              type='submit'
              className='text-xs h-8'
              aria-current={currentCategory === null ? 'page' : undefined}
            >
              All
            </Button>
          </form>

          {categories.map((cat) => (
            <form key={cat.slug} action={setFilters}>
              <input type='hidden' name='q' value={searchQuery} />
              <input type='hidden' name='category' value={cat.slug} />
              {currentSortBy && (
                <input type='hidden' name='sort' value={currentSortBy} />
              )}
              <Button
                variant={currentCategory === cat.slug ? 'default' : 'outline'}
                size='sm'
                type='submit'
                className='text-xs h-8'
                aria-current={currentCategory === cat.slug ? 'page' : undefined}
              >
                {cat.name}
              </Button>
            </form>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className='pt-2 border-t'>
        <h3 className='text-sm font-medium mb-3 text-foreground/80 flex items-center'>
          <SortAscIcon className='h-4 w-4 mr-2' />
          Sort By
        </h3>
        <div className='flex flex-col gap-2'>
          <form action={setFilters}>
            <input type='hidden' name='q' value={searchQuery} />
            {currentCategory && (
              <input type='hidden' name='category' value={currentCategory} />
            )}
            <Button
              variant={currentSortBy === null ? 'default' : 'outline'}
              size='sm'
              type='submit'
              className='justify-start text-xs h-8 w-full'
              aria-current={currentSortBy === null ? 'page' : undefined}
            >
              Default
            </Button>
          </form>

          <form action={setFilters}>
            <input type='hidden' name='q' value={searchQuery} />
            {currentCategory && (
              <input type='hidden' name='category' value={currentCategory} />
            )}
            <input type='hidden' name='sort' value='price-asc' />
            <Button
              variant={currentSortBy === 'price-asc' ? 'default' : 'outline'}
              size='sm'
              type='submit'
              className='justify-start text-xs h-8 w-full'
              aria-current={currentSortBy === 'price-asc' ? 'page' : undefined}
            >
              <SortAscIcon className='h-3 w-3 mr-2' />
              Price: Low to High
            </Button>
          </form>

          <form action={setFilters}>
            <input type='hidden' name='q' value={searchQuery} />
            {currentCategory && (
              <input type='hidden' name='category' value={currentCategory} />
            )}
            <input type='hidden' name='sort' value='price-desc' />
            <Button
              variant={currentSortBy === 'price-desc' ? 'default' : 'outline'}
              size='sm'
              type='submit'
              className='justify-start text-xs h-8 w-full'
              aria-current={currentSortBy === 'price-desc' ? 'page' : undefined}
            >
              <SortDescIcon className='h-3 w-3 mr-2' />
              Price: High to Low
            </Button>
          </form>

          <form action={setFilters}>
            <input type='hidden' name='q' value={searchQuery} />
            {currentCategory && (
              <input type='hidden' name='category' value={currentCategory} />
            )}
            <input type='hidden' name='sort' value='rating' />
            <Button
              variant={currentSortBy === 'rating' ? 'default' : 'outline'}
              size='sm'
              type='submit'
              className='justify-start text-xs h-8 w-full'
              aria-current={currentSortBy === 'rating' ? 'page' : undefined}
            >
              <StarIcon className='h-3 w-3 mr-2' />
              Rating
            </Button>
          </form>
        </div>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <form action={resetFilters}>
          <input type='hidden' name='q' value={searchQuery} />
          <Button
            variant='ghost'
            size='sm'
            type='submit'
            className='w-full text-xs text-muted-foreground hover:text-foreground mt-2 flex items-center justify-center'
          >
            <XIcon className='h-3 w-3 mr-2' />
            Reset Filters
          </Button>
        </form>
      )}
    </div>
  )
}

// Export a wrapper component that includes Suspense
export function ProductFilters(props: ServerProductFiltersProps) {
  return (
    <Suspense fallback={<FiltersSkeleton />}>
      <ServerProductFilters {...props} />
    </Suspense>
  )
}
