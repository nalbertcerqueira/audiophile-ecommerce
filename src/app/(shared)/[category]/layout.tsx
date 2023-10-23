import { PropsWithChildren } from "react"
import { getProductsUseCase } from "@/@core/backend/main/factories/product/getProductsFactory"

export async function generateStaticParams() {
    const products = await getProductsUseCase.execute()
    const categories = [...new Set(products.map(({ category }) => category))]

    return categories.map((categoryName) => ({
        category: categoryName
    }))
}

export default function CategoryLayout({ children }: PropsWithChildren) {
    return <>{children}</>
}
