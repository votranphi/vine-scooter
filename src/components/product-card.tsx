import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import type { Product } from "@/lib/types"
import { Link } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </CardContent>
      <CardFooter className="border-t p-4 pt-2 flex justify-between items-center">
        <p className="text-sm font-medium text-gray-700">Giá: {product.price}</p>
        <Link to={`/product/${product.id}`}>
          <Button size="sm" variant="outline" className="flex items-center gap-1 cursor-pointer bg-red-300">
            <Info className="h-4 w-4" />
            Chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
