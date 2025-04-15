import { useEffect, useState } from "react"
import type { Product, ProductsResponse } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Search, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://vinescooter.blob.core.windows.net/vinescooter-container/logo_png.png"
                alt="Vine Scooter Logo"
                className="h-12 w-auto"
              />
              <h1 className="hidden text-2xl font-bold md:block">Vine Scooter</h1>
            </div>

            {/* Mobile Menu Button */}
            <div className="block md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-white hover:bg-gray-700">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="#" className="hover:text-gray-300 transition-colors">
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition-colors">
                      Sản phẩm
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition-colors">
                      Thông tin
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300 transition-colors">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 rounded-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-gray-700 cursor-pointer">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                    0
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="border-t border-gray-700 py-4 md:hidden">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Trang chủ
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Sản phẩm
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Thông tin
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Liên hệ
                </a>
              </nav>
              <div className="mt-4 flex items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500"
                />
                <Search className="ml-2 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full justify-start text-white border-gray-600 hover:bg-gray-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart (0)
                </Button>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <div className="py-8 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Xe điện cao cấp - Lướt đi phong cách</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Khám phá dòng xe điện chất lượng cao, thiết kế hiện đại cho cuộc sống đô thị năng động
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={'https://zalo.me/0962728123'} target="blank">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
                  Liên hệ ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Our Products</h2>

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
      <footer className="bg-gray-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Vine Scooter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
