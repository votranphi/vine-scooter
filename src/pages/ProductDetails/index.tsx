import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, ArrowLeft, ShoppingCart, Heart, Share2, Phone, MapPin, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product, ProductsResponse } from "@/lib/types"

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [favorite, setFavorite] = useState<boolean>(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch("/json/product-list.json")

        if (!response.ok) {
          throw new Error("Failed to fetch product data")
        }

        const data: ProductsResponse = await response.json()
        const foundProduct = data.products[productId || ""]

        if (!foundProduct) {
          throw new Error("Product not found")
        }

        setProduct(foundProduct)
        setSelectedImage(foundProduct.images?.[0] || foundProduct.thumbnail)
      } catch (err) {
        setError("Failed to load product. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [productId])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  const toggleFavorite = () => {
    setFavorite(!favorite)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
            </svg>
          </div>
          <p className="text-lg text-red-600 font-medium mb-6">{error || "Không tìm thấy sản phẩm"}</p>
          <Link to="/home">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-4 w-4" />
              Quay lại trang chủ
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/home" className="flex items-center space-x-4">
              <img
                src="https://vinescooter.blob.core.windows.net/vinescooter-container/logo_png.png"
                alt="Vine Scooter Logo"
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold hidden sm:block">Vine Scooter</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Liên hệ</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/home" className="hover:text-gray-900 transition-colors">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Back button for mobile */}
          <div className="p-4 border-b md:hidden">
            <Link to="/home">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images Section */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden border rounded-xl shadow-sm relative group">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    onClick={toggleFavorite}
                    variant="outline"
                    size="icon"
                    className={`rounded-full bg-white shadow-md ${favorite ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  >
                    <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white shadow-md text-gray-500 hover:text-gray-700"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>

                <div
                  ref={scrollContainerRef}
                  className="flex space-x-3 overflow-x-auto py-2 px-10 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {product.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 border rounded-lg overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-md ${
                        selectedImage === image ? "border-red-500 ring-2 ring-red-500 scale-105" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Hình ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product name */}
              <div className="border-b pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-500 mt-2">Mã sản phẩm: {product.id.toUpperCase()}</p>
              </div>

              {/* Price */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                <p className="text-xl md:text-2xl font-semibold text-red-600">Giá: {product.price}</p>
                <p className="text-sm text-gray-600 mt-1">Đã bao gồm thuế VAT</p>
              </div>

              {/* Product details */}
              <div className="border rounded-lg p-5 bg-white shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Thông tin sản phẩm</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {product.details || "Chưa có thông tin chi tiết về sản phẩm này."}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3 flex flex-col items-center text-center">
                  <div className="bg-red-100 rounded-full p-2 mb-2">
                    <Truck className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Giao hàng nhanh</h3>
                  <p className="text-xs text-gray-500">Giao hàng toàn quốc</p>
                </div>
                <div className="border rounded-lg p-3 flex flex-col items-center text-center">
                  <div className="bg-red-100 rounded-full p-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Bảo hành chính hãng</h3>
                  <p className="text-xs text-gray-500">12 tháng bảo hành</p>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="space-y-3 pt-2">
                <Link to={'https://zalo.me/0962728123'} target="_blank">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <Phone className="h-5 w-5" />
                    Liên hệ đặt hàng qua Zalo
                  </Button>
                </Link>

                <Link to="/home">
                  <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <ShoppingCart className="h-5 w-5" />
                    Xem thêm sản phẩm khác
                  </Button>
                </Link>
              </div>

              {/* Store locations */}
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Địa chỉ cửa hàng
                </h3>
                <p className="text-sm text-gray-600">Số 123 Đường ABC, Quận XYZ, Hà Nội</p>
                <p className="text-sm text-gray-600 mt-1">Số 456 Đường DEF, Quận UVW, TP. Hồ Chí Minh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products section (placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Would integrate with actual related products data */}
            <div className="bg-white rounded-lg shadow border p-4 h-48 flex items-center justify-center">
              <p className="text-gray-400 text-center">Sản phẩm tương tự sẽ hiển thị ở đây</p>
            </div>
            <div className="bg-white rounded-lg shadow border p-4 h-48 flex items-center justify-center">
              <p className="text-gray-400 text-center">Sản phẩm tương tự sẽ hiển thị ở đây</p>
            </div>
            <div className="hidden md:flex bg-white rounded-lg shadow border p-4 h-48 items-center justify-center">
              <p className="text-gray-400 text-center">Sản phẩm tương tự sẽ hiển thị ở đây</p>
            </div>
            <div className="hidden md:flex bg-white rounded-lg shadow border p-4 h-48 items-center justify-center">
              <p className="text-gray-400 text-center">Sản phẩm tương tự sẽ hiển thị ở đây</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Vine Scooter</h3>
              <p className="text-gray-400 text-sm">Cung cấp xe điện chất lượng cao, thiết kế hiện đại cho cuộc sống đô thị năng động.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>096 272 8123</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>41/16 Cầu Xây, phường Tân Phú, thành phố Thủ Đức, Thành phố Hồ Chí Minh</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Theo dõi</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.917 12.104l-1.39 1.389a.999.999 0 01-1.414 0L12 13.38l-2.113 2.113a.999.999 0 01-1.414 0l-1.39-1.389a.999.999 0 010-1.414L9.38 12 7.083 9.497a.999.999 0 010-1.414l1.39-1.389a.999.999 0 011.414 0L12 8.621l2.113-2.113a.999.999 0 011.414 0l1.39 1.389a.999.999 0 010 1.414L14.621 12l2.296 2.104a.999.999 0 010 1.414z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.214c0 2.717-.012 3.056-.06 4.122-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.214c-2.717 0-3.056-.012-4.122-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Vine Scooter. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-40">
        <Link to={'https://zalo.me/0962728123'} target="_blank">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
            <Phone className="h-5 w-5" />
            Liên hệ đặt hàng ngay
          </Button>
        </Link>
      </div>
    </div>
  )
}