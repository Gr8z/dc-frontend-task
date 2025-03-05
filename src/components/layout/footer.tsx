export function Footer() {
  return (
    <footer className='border-t py-6 md:py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
          © {new Date().getFullYear()} Desert Cart. All rights reserved. This
          project is meant for interview purposes only.
        </p>
      </div>
    </footer>
  )
}
