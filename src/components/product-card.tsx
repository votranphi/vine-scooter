import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"

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
      <CardFooter className="border-t p-4 pt-2">
        <p className="text-sm font-medium text-gray-700">{product.price}</p>
      </CardFooter>
    </Card>
  )
}
