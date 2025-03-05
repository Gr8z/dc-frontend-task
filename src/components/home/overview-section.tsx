import { CheckCircle2 } from 'lucide-react'

export function OverviewSection() {
  const features = [
    'Product search with real-time results',
    'Category filtering and product sorting',
    'Detailed product pages with images and specifications',
    'Responsive design for all device sizes',
    'Server-side rendering for improved SEO',
    'Static generation for common product pages',
  ]

  const technologies = [
    'Next.js 15',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'Server Actions',
    'DummyJSON API',
    'Lucide React Icons',
  ]

  const architecturalDecisions = [
    'Server Components for data fetching and initial rendering',
    'Client Components for interactive elements',
    'Server Actions for form handling and data mutations',
    'URL parameters for storing filter and sort state',
    'Static generation for common product pages',
    'Dynamic rendering for search results',
  ]

  return (
    <section className='grid md:grid-cols-2 gap-12'>
      {/* Project Overview */}
      <div className='space-y-6'>
        <h2 className='text-3xl font-bold'>Project Overview</h2>
        <p className='text-muted-foreground'>
          This application was developed as a take-home task to showcase
          proficiency in React, Next.js, API integration, and routing. It
          features a responsive design, server and client components, and
          integration with the DummyJSON Products API.
        </p>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Key Features</h3>
          <ul className='space-y-2'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-start gap-2'>
                <CheckCircle2 className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Implementation Details */}
      <div className='space-y-6'>
        <h2 className='text-3xl font-bold'>Implementation Details</h2>
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Technologies Used</h3>
          <ul className='grid grid-cols-2 gap-2'>
            {technologies.map((tech, index) => (
              <li key={index} className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-primary' />
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>Architectural Decisions</h3>
          <ul className='space-y-2'>
            {architecturalDecisions.map((decision, index) => (
              <li key={index} className='flex items-start gap-2'>
                <div className='h-2 w-2 rounded-full bg-primary mt-2' />
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
