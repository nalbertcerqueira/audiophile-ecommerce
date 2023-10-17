import { staticProductImages } from "@/utils/imageMap"
import { OtherProduct } from "./OtherProduct"
import { RelatedProduct } from "@/@core/backend/domain/entities/product"

interface RelatedProductsSectionProps {
    otherProducts: RelatedProduct[]
}

export function RelatedProductsSection({ otherProducts }: RelatedProductsSectionProps) {
    return (
        <section className="related-products">
            <div className="related-products__inner-container">
                <h2 className="related-products__title">YOU MAY ALSO LIKE</h2>
                <div className="related-products__wrapper">
                    {otherProducts.map((product, i) => (
                        <OtherProduct
                            key={i}
                            link={`/${product.category}/${product.slug}`}
                            name={product.name.toUpperCase()}
                            thumb={staticProductImages[product.slug].thumb?.desktop}
                            thumbAlt={product.name}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
