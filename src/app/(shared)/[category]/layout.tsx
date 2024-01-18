import { PropsWithChildren } from "react"
import { dbGetProductsUseCase } from "@/@core/backend/main/factories/usecases/product/dbGetProductsFactory"

export async function generateStaticParams() {
    const products = await dbGetProductsUseCase.execute()
    const categories = [...new Set(products.map(({ category }) => category))]

    return categories.map((categoryName) => ({
        category: categoryName
    }))
}

export default function CategoryLayout({ children }: PropsWithChildren) {
    return <>{children}</>
}
