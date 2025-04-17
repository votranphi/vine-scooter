import { useEffect, useState } from "react"
import type { Product, ProductsResponse } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Search, ShoppingCart, Menu, X, Phone, Mail, MapPin, ArrowRight } from "lucide-react"
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
      {/* Pre-header */}
      <div className="bg-gray-900 py-2 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="mr-1 h-3 w-3" />
                <span>+84 962 728 123</span>
              </div>
              <div className="hidden md:flex items-center">
                <Mail className="mr-1 h-3 w-3" />
                <span>contact@vinescooter.vn</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Về chúng tôi
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Chính sách
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
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
                    <a href="#" className="flex items-center hover:text-red-400 transition-colors font-medium">
                      Trang chủ
                      <div className="absolute h-1 w-full bg-red-500 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </a>
                  </li>
                  <li>
                    <a href="#products" className="hover:text-red-400 transition-colors font-medium">
                      Sản phẩm
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-400 transition-colors font-medium">
                      Thông tin
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-400 transition-colors font-medium">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-64 rounded-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500"
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
                <a href="#" className="hover:text-red-400 transition-colors font-medium">
                  Trang chủ
                </a>
                <a href="#products" className="hover:text-red-400 transition-colors font-medium">
                  Sản phẩm
                </a>
                <a href="#" className="hover:text-red-400 transition-colors font-medium">
                  Thông tin
                </a>
                <a href="#" className="hover:text-red-400 transition-colors font-medium">
                  Liên hệ
                </a>
              </nav>
              <div className="mt-4 flex items-center">
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full rounded-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500"
                />
                <Search className="ml-2 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full justify-start text-white border-gray-600 hover:bg-gray-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Giỏ hàng (0)
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="text-center md:text-left space-y-6">
              <div>
                <span className="inline-block bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Phương tiện di chuyển hiện đại
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Xe điện cao cấp - Lướt đi phong cách
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-300">
                Khám phá dòng xe điện chất lượng cao, thiết kế hiện đại cho cuộc sống đô thị năng động
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
                <Link to={'https://zalo.me/0962728123'} target="blank">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
                    Liên hệ ngay
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition duration-300 cursor-pointer">
                  Xem sản phẩm
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src="https://vinescooter.blob.core.windows.net/vinescooter-container/q29_1.jpg"
                alt="Featured Scooter"
                className="rounded-lg shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg transform rotate-6 hover:rotate-0 transition-all duration-500">
                <div className="font-bold text-2xl">Mẫu mới</div>
                <div>Sealup Q29</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn Vine Scooter?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Chúng tôi cung cấp những sản phẩm chất lượng cao với nhiều ưu điểm vượt trội</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Hiệu suất cao</h3>
              <p className="text-gray-600">Động cơ mạnh mẽ, vận hành êm ái và tiết kiệm năng lượng.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">An toàn & Bền bỉ</h3>
              <p className="text-gray-600">Thiết kế chắc chắn, hệ thống phanh an toàn và tuổi thọ pin cao.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Tiết kiệm chi phí</h3>
              <p className="text-gray-600">Chi phí vận hành thấp, không tốn xăng và bảo dưỡng đơn giản.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="products" className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sản phẩm của chúng tôi</h2>
            <p className="text-gray-600">Khám phá các mẫu xe điện chất lượng cao</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-1 cursor-pointer hover:text-red-600">
              Xem tất cả
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            <p className="ml-4 text-lg">Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
              <p className="text-lg">{error}</p>
              <Button variant="ghost" className="mt-4 text-red-600 hover:text-red-800 cursor-pointer">
                Thử lại
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng trải nghiệm?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn và đặt hàng
          </p>
          <Link to={'https://zalo.me/0962728123'} target="blank">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
              <Phone className="mr-2 h-5 w-5" />
              Liên hệ qua Zalo
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://vinescooter.blob.core.windows.net/vinescooter-container/logo_png.png"
                  alt="Vine Scooter Logo"
                  className="h-10 w-auto"
                />
                <h3 className="text-xl font-bold text-white">Vine Scooter</h3>
              </div>
              <p className="mb-4">
                Chúng tôi cung cấp các dòng xe điện chất lượng cao với thiết kế hiện đại và đa dạng.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Thông tin liên hệ</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>41/16 Cầu Xây, phường Tân Phú, thành phố Thủ Đức, Thành phố Hồ Chí Minh</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-red-500" />
                  <span>+84 962 728 123</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-red-500" />
                  <span>contact@vinescooter.vn</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">Trang chủ</a>
                </li>
                <li>
                  <a href="#products" className="hover:text-white transition-colors">Sản phẩm</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Về chúng tôi</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>© {new Date().getFullYear()} Vine Scooter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}