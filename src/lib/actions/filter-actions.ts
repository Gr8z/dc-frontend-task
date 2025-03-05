'use server'

import { redirect } from 'next/navigation'

export async function setFilters(
  formData: FormData,
  pathname: string = '/products'
) {
  const searchQuery = formData.get('q') as string | null
  const category = formData.get('category') as string | null
  const sortBy = formData.get('sort') as string | null

  // Build the URL with the parameters
  const params = new URLSearchParams()

  // Add search query if it exists
  if (searchQuery) {
    params.set('q', searchQuery)
  }

  // Add category if it exists
  if (category) {
    params.set('category', category)
  }

  // Add sort if it exists
  if (sortBy) {
    params.set('sort', sortBy)
  }

  // Create the URL with the parameters
  const url = params.toString() ? `${pathname}?${params.toString()}` : pathname

  // Redirect to the URL
  redirect(url)
}

export async function resetFilters(
  formData: FormData,
  pathname: string = '/products'
) {
  // Get the search query if it exists
  const searchQuery = formData.get('q') as string | null

  // If there's a search query, keep it in the URL
  if (searchQuery) {
    redirect(`${pathname}?q=${encodeURIComponent(searchQuery)}`)
  }

  // Otherwise, redirect to the base URL
  redirect(pathname)
}
