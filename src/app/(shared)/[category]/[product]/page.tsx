import { dbGetProductsByCategoryUseCase } from "@/@core/backend/main/factories/usecases/product/dbGetProductsByCategoryFactory"
import { ProductPageComponent } from "@/components/product/ProductPage"
import { notFound } from "next/navigation"

interface StaticParams {
    category: string
}

interface ProductPageProps {
    params: {
        category: string
        product: string
    }
}

export async function generateStaticParams({ params }: { params: StaticParams }) {
    const productsByCategory = await dbGetProductsByCategoryUseCase.execute(params.category)

    return productsByCategory.map((product) => ({
        params: {
            product: product.slug
        }
    }))
}

export default async function ProductPage({ params }: ProductPageProps) {
    const products = await dbGetProductsByCategoryUseCase.execute(params.category)
    const foundProduct = products.find((product) => product.slug === params.product)

    if (!foundProduct) {
        return notFound()
    }

    return <ProductPageComponent product={foundProduct} />
}
