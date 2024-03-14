import { CategoryPageComponent } from "@/components/category/CategoryPage"
import { dbGetProductsByCategoryUseCase } from "@/@core/backend/main/factories/usecases/product/dbGetProductsByCategoryFactory"
import { notFound } from "next/navigation"

interface CategoryPageProps {
    params: {
        category: string
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const products = await dbGetProductsByCategoryUseCase.execute(params.category)

    if (!products.length) {
        return notFound()
    }

    return (
        <CategoryPageComponent
            products={products || []}
            category={params.category.toUpperCase()}
        />
    )
}
