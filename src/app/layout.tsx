import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientNavbar } from '@/components/layout/client-navbar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Product Search',
  description: 'Search and browse products from our catalog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col'>
          <ClientNavbar />
          <main className='flex-1'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
