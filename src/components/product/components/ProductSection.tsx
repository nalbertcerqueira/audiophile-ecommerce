import { ProductProps } from "@/@core/backend/domain/entities/product/product"
import { ProductDetails } from "./ProductDetails"
import { ProductItem } from "@/components/shared/product/ProductItem"
import { staticProductImages } from "@/utils/imageMap"

export function ProductSection({ product }: { product: ProductProps }) {
    return (
        <section className="product-section">
            <div className="product-section__inner-container">
                {product && (
                    <>
                        <ProductItem
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            new={product.new}
                            images={staticProductImages[product.slug].product}
                            slug={product.slug}
                            price={product.price}
                            type="product"
                        />
                        <ProductDetails
                            accessories={product.includes}
                            features={product.features}
                        />
                    </>
                )}
            </div>
        </section>
    )
}
