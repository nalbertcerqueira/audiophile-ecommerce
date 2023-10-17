import { Header } from "@/components/shared/layouts/Header"
import { PropsWithChildren } from "react"
import { getProductsUseCase } from "@/@core/backend/main/factories/getProductsFactory"

export async function generateStaticParams() {
    const products = await getProductsUseCase.execute()
    const categories = [...new Set(products.map(({ category }) => category))]

    return categories.map((categoryName) => ({
        category: categoryName
    }))
}

export default function CategoryLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header className="header--black" />
            {children}
        </>
    )
}
