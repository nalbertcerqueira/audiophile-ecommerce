import { PropsWithChildren } from "react"
import { getProductsUseCase } from "@/@core/backend/main/factories/usecases/product/getProductsFactory"
import { ProductProps } from "@/@core/backend/domain/entities/product/product"

export async function generateStaticParams() {
    const products = (await getProductsUseCase.execute("fullProduct")) as ProductProps[]
    const categories = [...new Set(products.map(({ category }) => category))]

    return categories.map((categoryName) => ({
        category: categoryName
    }))
}

export default function CategoryLayout({ children }: PropsWithChildren) {
    return <>{children}</>
}
