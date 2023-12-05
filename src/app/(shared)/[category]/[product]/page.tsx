import { getProductsByCategoryUseCase } from "@/@core/backend/main/factories/usecases/product/getProductsByCategoryFactory"
import { ProductPageComponent } from "@/components/product/ProductPage"
import { notFound } from "next/navigation"

interface StaticParams {
    category: string
}

interface PoductPageProps {
    params: {
        category: string
        product: string
    }
}

export async function generateStaticParams({ params }: { params: StaticParams }) {
    const productsByCategory = await getProductsByCategoryUseCase.execute(params.category)

    return productsByCategory.map((product) => ({
        params: {
            product: product.slug
        }
    }))
}

export default async function ProductPage({ params }: PoductPageProps) {
    const products = await getProductsByCategoryUseCase.execute(params.category)
    const foundProduct = products.find((product) => product.slug === params.product)

    if (!foundProduct) {
        return notFound()
    }

    return <ProductPageComponent product={foundProduct} />
}
