import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Product } from '@/lib/api/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, title, price, thumbnail, rating } = product

  return (
    <Card className='overflow-hidden h-full flex flex-col transition-all hover:shadow-md'>
      <div className='aspect-square relative overflow-hidden bg-muted/20'>
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover transition-transform hover:scale-105'
          priority
        />
      </div>
      <CardHeader className='p-3 pb-0'>
        <CardTitle className='line-clamp-1 text-base font-medium'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='p-3 pt-1 flex-grow'>
        <div className='flex justify-between items-center'>
          <div className='font-bold text-lg'>${price.toFixed(2)}</div>
          <div className='text-xs text-muted-foreground flex items-center'>
            <Star className='h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-0.5' />
            {rating.toFixed(1)}
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-3 pt-0'>
        <Link href={`/products/${id}`} className='w-full'>
          <div className='w-full text-center py-2 px-4 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors'>
            View Details
          </div>
        </Link>
      </CardFooter>
    </Card>
  )
}
