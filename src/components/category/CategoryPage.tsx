import { TitleSection } from "./components/TitleSection"
import { PreviewSection } from "./components/PreviewSection"
import "./styles.scss"
import { ProductProps } from "@/@core/shared/entities/product/product"

interface CategoryPageComponentProps {
    products?: ProductProps[]
    category: string
}

export function CategoryPageComponent({ products, category }: CategoryPageComponentProps) {
    return (
        <>
            <TitleSection title={category} />
            {products && <PreviewSection products={products} />}
        </>
    )
}
