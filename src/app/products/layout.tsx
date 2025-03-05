import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Digital Commerce',
  description: 'Browse our collection of products',
}

interface ProductsLayoutProps {
  children: React.ReactNode
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <section className='flex-1'>{children}</section>
}
