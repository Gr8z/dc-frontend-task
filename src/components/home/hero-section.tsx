import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className='text-center space-y-4'>
      <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
        Desert Cart
      </h1>
      <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
        A multi-page e-commerce application built with Next.js, TypeScript, and
        Tailwind CSS. This project demonstrates product search, filtering, and
        detailed product views.
      </p>
      <div className='flex justify-center gap-4 pt-4'>
        <Link
          href='/products'
          className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors'
        >
          Browse Products <ArrowRight className='h-4 w-4' />
        </Link>
      </div>
    </section>
  )
}
