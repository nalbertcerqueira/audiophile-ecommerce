import { PropsWithChildren } from "react"
import { dbGetProductsUseCase } from "@/@core/backend/main/factories/usecases/product/dbGetProductsFactory"
import { ProductProps } from "@/@core/backend/domain/entities/product/product"

export async function generateStaticParams() {
    const products = (await dbGetProductsUseCase.execute("fullProduct")) as ProductProps[]
    const categories = [...new Set(products.map(({ category }) => category))]

    return categories.map((categoryName) => ({
        category: categoryName
    }))
}

export default function CategoryLayout({ children }: PropsWithChildren) {
    return <>{children}</>
}
