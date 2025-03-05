import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star, AlertCircle, Package } from 'lucide-react'
import { getProductById, getProducts } from '@/lib/api/products'
import { AddToCartButton } from '@/components/products/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Generate metadata for the product page
export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}): Promise<Metadata> {
  const params = await props.params
  const id = parseInt(params.id, 10)

  if (isNaN(id)) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  try {
    const product = await getProductById(id)
    return {
      title: `${product.title} | DC Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.thumbnail],
      },
    }
  } catch {
    return {
      title: 'Product Error',
      description: 'There was an error loading the product.',
    }
  }
}

// Generate static pages for the first 10 products
export async function generateStaticParams() {
  try {
    const products = await getProducts({ limit: 10 })
    return products.map((product) => ({
      id: product.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function ProductPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const id = parseInt(params.id, 10)

  if (isNaN(id)) {
    return notFound()
  }

  try {
    const product = await getProductById(id)

    // Calculate the original price based on discount percentage
    const originalPrice =
      product.discountPercentage > 0
        ? product.price / (1 - product.discountPercentage / 100)
        : null

    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <div className='aspect-square relative overflow-hidden rounded-lg bg-muted/20'>
              <Image
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-contain'
                priority
                quality={90}
              />
            </div>

            {product.images.length > 1 && (
              <div className='grid grid-cols-4 gap-2'>
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className='aspect-square relative overflow-hidden rounded-lg bg-muted/20'
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 2}`}
                      fill
                      sizes='(max-width: 768px) 25vw, 12vw'
                      className='object-contain'
                      quality={80}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <Badge variant='outline' className='text-xs capitalize'>
                  {product.category}
                </Badge>
                <Badge variant='secondary' className='text-xs'>
                  {product.brand}
                </Badge>
              </div>
              <h1 className='text-3xl font-bold'>{product.title}</h1>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold'>
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && originalPrice && (
                  <>
                    <span className='text-sm text-muted-foreground line-through'>
                      ${originalPrice.toFixed(2)}
                    </span>
                    <Badge variant='destructive' className='text-xs text-white'>
                      {product.discountPercentage}% off
                    </Badge>
                  </>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <div className='flex items-center'>
                  <Star className='h-4 w-4 text-yellow-500 fill-yellow-500 mr-1' />
                  <span className='text-sm font-medium'>
                    {product.rating}/5
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-2'>
                <Package className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  {product.stock > 0 ? (
                    product.stock > 10 ? (
                      <span className='text-green-600'>
                        In Stock ({product.stock} units)
                      </span>
                    ) : (
                      <span className='text-amber-600'>
                        Low Stock ({product.stock} units)
                      </span>
                    )
                  ) : (
                    <span className='text-red-600'>Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {product.stock <= 0 && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Out of Stock</AlertTitle>
                <AlertDescription>
                  This product is currently unavailable. Please check back
                  later.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <h2 className='text-xl font-semibold mb-2'>Description</h2>
              <p className='text-muted-foreground'>{product.description}</p>
            </div>

            <div className='pt-4'>
              <AddToCartButton
                product={product}
                disabled={product.stock <= 0}
              />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the product. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}
