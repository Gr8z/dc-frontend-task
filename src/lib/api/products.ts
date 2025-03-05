// Product types
export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Category {
  slug: string
  name: string
  url: string
}

export interface ProductsOptions {
  limit?: number
  skip?: number
  category?: string
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | null
}

const API_BASE_URL = 'https://dummyjson.com'

// Helper function to sort products
function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | null
): Product[] {
  if (!sortBy) return products

  const sortedProducts = [...products]

  switch (sortBy) {
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating)
      break
  }

  return sortedProducts
}

// Helper function to validate image URLs
function validateProductImages(product: Product): Product {
  // Ensure thumbnail is valid
  if (!product.thumbnail || typeof product.thumbnail !== 'string') {
    product.thumbnail = 'https://placehold.co/600x400?text=No+Image'
  }

  // Ensure images array is valid
  if (!Array.isArray(product.images) || product.images.length === 0) {
    product.images = [product.thumbnail]
  } else {
    // Filter out invalid image URLs
    product.images = product.images.filter(
      (img) => typeof img === 'string' && img.length > 0
    )

    // If all images were filtered out, use thumbnail
    if (product.images.length === 0) {
      product.images = [product.thumbnail]
    }
  }

  return product
}

// Get all products with optional filtering and sorting
export async function getProducts(
  options: ProductsOptions = {}
): Promise<Product[]> {
  const { limit = 20, skip = 0, category = '', sortBy = null } = options

  // Fetch products with Next.js cache
  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  const data: ProductsResponse = await response.json()
  let products = data.products.map(validateProductImages)

  // Filter by category if specified
  if (category) {
    products = products.filter((product) => product.category === category)
  }

  // Sort products if specified
  if (sortBy) {
    products = sortProducts(products, sortBy)
  }

  return products
}

// Get a single product by ID
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product with ID ${id}: ${response.statusText}`
    )
  }

  const product = await response.json()
  return validateProductImages(product)
}

// Search products by query with optional filtering and sorting
export async function searchProducts(
  query: string,
  options: ProductsOptions = {}
): Promise<Product[]> {
  const { category = '', sortBy = null } = options

  const response = await fetch(
    `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
    { next: { revalidate: 60 } } // Cache for 1 minute (shorter for search results)
  )

  if (!response.ok) {
    throw new Error(`Failed to search products: ${response.statusText}`)
  }

  const data: ProductsResponse = await response.json()
  let products = data.products.map(validateProductImages)

  // Filter by category if specified
  if (category) {
    products = products.filter((product) => product.category === category)
  }

  // Sort products if specified
  if (sortBy) {
    products = sortProducts(products, sortBy)
  }

  return products
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products in category ${category}: ${response.statusText}`
    )
  }

  const data = await response.json()
  data.products = data.products.map(validateProductImages)

  return data
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 86400 }, // Cache for 24 hours (categories change less frequently)
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  const categories: Category[] = await response.json()
  return categories
}
