import { staticProductImages } from "@/utils/imageMap"
import { OtherProduct } from "./OtherProduct"
import { RelatedProduct } from "@/@core/shared/entities/product/product"

interface RelatedProductsSectionProps {
    otherProducts: RelatedProduct[]
}

export function RelatedProductsSection({ otherProducts }: RelatedProductsSectionProps) {
    function renderOtherProducts() {
        return otherProducts.map((product) => {
            const thumb = staticProductImages[product.slug].thumb
            return (
                thumb && (
                    <OtherProduct
                        key={product.slug}
                        link={`/${product.category}/${product.slug}`}
                        name={product.name.toUpperCase()}
                        thumbs={{
                            desktop: thumb.desktop,
                            tablet: thumb.tablet,
                            mobile: thumb.mobile
                        }}
                    />
                )
            )
        })
    }

    return (
        <section className="related-products">
            <div className="related-products__inner-container">
                <h2 className="related-products__title">YOU MAY ALSO LIKE</h2>
                <div className="related-products__wrapper">{renderOtherProducts()}</div>
            </div>
        </section>
    )
}
