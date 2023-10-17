import { ProductSection } from "./components/ProductSection"
import { GallerySection } from "./components/GallerySection"
import { BackButton } from "../shared/buttons/BackButton"
import { RelatedProductsSection } from "./components/RelatedProductsSection"
import { ProductProps } from "@/@core/backend/domain/entities/product"
import "./styles.scss"

export function ProductPageComponent({ product }: { product?: ProductProps }) {
    return (
        <>
            <div className="utils-wrapper">
                <div className="utils-wrapper__inner">
                    <BackButton />
                </div>
            </div>
            {product && (
                <>
                    <ProductSection product={product} />
                    <GallerySection productSlug={product.slug} />
                    <RelatedProductsSection otherProducts={product.others} />
                </>
            )}
        </>
    )
}
