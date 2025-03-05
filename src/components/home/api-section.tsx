import { ExternalLink } from 'lucide-react'

export function ApiSection() {
  const apiEndpoints = [
    {
      name: 'All Products',
      endpoint: 'https://dummyjson.com/products',
      description: 'Fetches all products with pagination support',
    },
    {
      name: 'Single Product',
      endpoint: 'https://dummyjson.com/products/{id}',
      description: 'Retrieves detailed information about a specific product',
    },
    {
      name: 'Search Products',
      endpoint: 'https://dummyjson.com/products/search?q={query}',
      description: 'Searches for products matching the provided query',
    },
    {
      name: 'Products by Category',
      endpoint: 'https://dummyjson.com/products/category/{category}',
      description: 'Filters products by a specific category',
    },
    {
      name: 'All Categories',
      endpoint: 'https://dummyjson.com/products/categories',
      description: 'Lists all available product categories',
    },
  ]

  return (
    <section className='space-y-6'>
      <h2 className='text-3xl font-bold'>API Integration</h2>
      <p className='text-muted-foreground'>
        This application integrates with the DummyJSON Products API to fetch
        product data. The API provides product names, images, prices,
        descriptions, and other details.
      </p>

      <div className='bg-muted p-4 rounded-md'>
        <div className='flex items-center justify-between'>
          <h3 className='font-mono text-sm'>API Endpoints</h3>
          <a
            href='https://dummyjson.com/docs/products'
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-blue-500 hover:underline flex items-center gap-1'
          >
            View Documentation <ExternalLink className='h-3 w-3' />
          </a>
        </div>

        <div className='mt-4 space-y-4'>
          {apiEndpoints.map((api, index) => (
            <div
              key={index}
              className='border-t pt-3 first:border-t-0 first:pt-0'
            >
              <h4 className='font-medium text-sm'>{api.name}</h4>
              <p className='font-mono text-xs mt-1 text-muted-foreground'>
                {api.endpoint}
              </p>
              <p className='text-xs mt-1 text-muted-foreground'>
                {api.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
