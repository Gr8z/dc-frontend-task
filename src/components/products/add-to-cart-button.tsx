'use client'

import { Product } from '@/lib/api/products'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

export function AddToCartButton({
  product,
  disabled = false,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Show a toast notification
    toast.success(`${product.title} added to cart!`)

    // Reset button state after a brief delay
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Button
      size='lg'
      className='w-full'
      onClick={handleAddToCart}
      disabled={isAdding || disabled}
    >
      {isAdding ? 'Adding...' : disabled ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  )
}
