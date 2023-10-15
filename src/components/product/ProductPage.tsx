import { ProductSection } from "./components/ProductSection"
import { GallerySection } from "./components/GallerySection"
import { BackButton } from "../shared/buttons/BackButton"
import { RelatedProductsSection } from "./components/RelatedProductsSection"
import "./styles.scss"

export function ProductPageComponent() {
    return (
        <>
            <div className="utils-wrapper">
                <div className="utils-wrapper__inner">
                    <BackButton />
                </div>
            </div>
            <ProductSection />
            <GallerySection />
            <RelatedProductsSection />
        </>
    )
}
