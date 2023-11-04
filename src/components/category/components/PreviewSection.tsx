import { ProductItem } from "../../shared/product/ProductItem"
import { ProductProps } from "@/@core/backend/domain/entities/product/product"
import { staticProductImages } from "@/utils/imageMap"

export function PreviewSection({ products }: { products: ProductProps[] }) {
    return (
        <section className="previews">
            <div className="previews__inner-container">
                {products?.map((product, i) => {
                    return (
                        <ProductItem
                            id={product.id}
                            new={product.new}
                            key={product.id}
                            name={product.name}
                            category={product.category}
                            slug={product.slug}
                            description={product.description}
                            images={staticProductImages[product.slug].preview}
                            type="preview"
                            className={i % 2 !== 0 ? "product--reverse" : undefined}
                        />
                    )
                })}
            </div>
        </section>
    )
}
