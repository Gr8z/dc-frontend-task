import { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'
import { getProducts, searchProducts, Product } from '@/lib/api/products'
import { ProductCard } from '@/components/products/product-card'
import { ProductFilters } from '@/components/products/server-product-filters'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Define metadata for the products page
export const metadata: Metadata = {
  title: 'Products | DC Store',
  description: 'Browse our collection of products.',
}

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    sort?: string
  }>
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Create a local copy of the search params to avoid modifying the original
  const params = await searchParams
  const searchQuery = params.q || ''
  const category = params.category || ''
  const sortBy = params.sort || null

  // For dynamic metadata based on search query
  if (searchQuery) {
    metadata.title = `Search: ${searchQuery} | DC Store`
    metadata.description = `Search results for "${searchQuery}" in our store.`
  } else if (category) {
    metadata.title = `${category} Products | DC Store`
    metadata.description = `Browse our ${category} products.`
  }

  let products: Product[] = []
  let error: Error | null = null

  try {
    // Fetch products based on search query or get featured products
    products = searchQuery
      ? await searchProducts(searchQuery, {
          category: category || undefined,
          sortBy: sortBy as 'price-asc' | 'price-desc' | 'rating' | null,
        })
      : await getProducts({
          category: category || undefined,
          sortBy: sortBy as 'price-asc' | 'price-desc' | 'rating' | null,
        })
  } catch (err) {
    console.error('Error fetching products:', err)
    error = err instanceof Error ? err : new Error('Unknown error occurred')
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
      <h1 className='text-3xl font-bold mb-6'>
        {searchQuery ? `Search: ${searchQuery}` : 'Products'}
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div className='md:col-span-1'>
          <ProductFilters searchParams={params} />
        </div>

        <div className='md:col-span-3'>
          {error ? (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error loading the products. Please try again later.
              </AlertDescription>
            </Alert>
          ) : products.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
