# E-Commerce Product Search Application

This is a multi-page web application that allows users to search for e-commerce products and view detailed information about them. The application is built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- **Search Functionality**: Search for products using the search bar in the navbar
- **Product Listing**: View a list of products with basic information
- **Product Details**: View detailed information about a product
- **Filtering and Sorting**: Filter products by category and sort by price or rating
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Next.js 15**: For server-side rendering, static site generation, and routing
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **shadcn**: For UI components
- **Server Actions**: For form handling and data mutations
- **DummyJSON API**: For product data

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Gr8z/dc-frontend-task.git
cd dc-frontend-task
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
  - `layout`: Layout components like Navbar and Footer
  - `products`: Product-related components
  - `ui`: UI components from shadcn/ui
- `src/lib`: Utility functions and hooks
  - `actions`: Server actions for form handling
  - `api`: API service for product data

## Architectural Decisions

### Server Components vs. Client Components

- **Server Components**: Used for data fetching and initial rendering to improve performance and SEO
- **Client Components**: Used for interactive elements like search and cart functionality

### State Management

- **Server Actions**: Used for form handling and data mutations
- **URL Parameters**: Used for storing filter and sort state in the URL

### Data Fetching

- **Server Components**: Used for data fetching directly from the API
- **Server Actions**: Used for form submissions and data mutations

### Static vs. Dynamic Rendering

- **Static Generation**: Used for the first 10 product detail pages to improve performance
- **Dynamic Rendering**: Used for other product detail pages and search results

## Future Improvements

- Add authentication and user accounts
- Implement a real checkout process
- Add product reviews and ratings
- Implement pagination for product listings
- Add more filtering options (price range, ratings, etc.)
- Add product recommendations
- Implement a wishlist feature
- Add more comprehensive testing
