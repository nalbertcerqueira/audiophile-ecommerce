import { TitleSection } from "./components/TitleSection"
import { PreviewSection } from "./components/PreviewSection"
import "./styles.scss"
import { ProductProps } from "@/@core/backend/domain/entities/product/product"

export function CategoryPageComponent({ products }: { products?: ProductProps[] }) {
    return (
        <>
            <TitleSection />
            {products && <PreviewSection products={products} />}
        </>
    )
}
