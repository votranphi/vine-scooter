"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product, ProductsResponse } from "@/lib/types"

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">{error || "Product not found"}</p>
          <Link to="/home" className="mt-4 inline-block">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-4">
              <img
                src="https://vinescooter.blob.core.windows.net/vinescooter-container/logo_png.png"
                alt="Vine Scooter Logo"
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold">Vine Scooter</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/home" className="hover:text-gray-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden border rounded-lg">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>

                <div
                  ref={scrollContainerRef}
                  className="flex space-x-2 overflow-x-auto py-2 px-8 scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {product.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 border rounded-md overflow-hidden cursor-pointer ${
                        selectedImage === image ? "border-red-500 ring-2 ring-red-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="border border-red-500 rounded-md p-4">
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              </div>

              <div className="border border-pink-300 bg-pink-50 rounded-md p-4">
                <p className="text-xl md:text-2xl font-semibold">Giá: {product.price}</p>
              </div>

              <div className="border border-black rounded-md p-4">
                <h2 className="text-xl font-bold text-red-500 mb-4">Chi tiết sản phẩm</h2>
                <div className="text-red-500 whitespace-pre-line">{product.details}</div>
              </div>

              <Link to={'https://zalo.me/0962728123'} target="blank">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md flex items-center justify-center gap-2 cursor-pointer">
                  <ShoppingCart className="h-5 w-5" />
                  Liên hệ đặt hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Vine Scooter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
