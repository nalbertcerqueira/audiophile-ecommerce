import { CategoryPageComponent } from "@/components/category/CategoryPage"
import { getProductsByCategoryUseCase } from "@/@core/backend/main/factories/getProductsByCategoryFactory"
import { notFound } from "next/navigation"

interface CategoryPageProps {
    params: {
        category: string
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const products = await getProductsByCategoryUseCase.execute(params.category)

    if (!products.length) {
        return notFound()
    }

    return <CategoryPageComponent products={products || []} />
}
