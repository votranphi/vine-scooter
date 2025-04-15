import { useEffect, useState } from "react"
import type { Product, ProductsResponse } from "@/lib/types"
import { ProductCard } from "@/components/product-card"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/json/product-list.json")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: ProductsResponse = await response.json()
        // Convert the object of products to an array
        const productsArray = Object.values(data.products)
        setProducts(productsArray)
      } catch (err) {
        setError("Failed to load products. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 md:flex-row">
          <div className="flex items-center">
            <img
              src="https://vinescooter.blob.core.windows.net/vinescooter-container/logo_png.png"
              alt="Vine Scooter Logo"
              className="mr-4 h-12 w-auto"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-center md:mt-0 md:text-left">Vine Scooter</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Products Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Vine Scooter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
