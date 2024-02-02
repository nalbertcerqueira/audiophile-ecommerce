import { staticProductImages } from "@/utils/imageMap"
import { ProductDetails } from "./ProductDetails"
import { ProductProps } from "@/@core/shared/entities/product/product"
import { ProductItem } from "@/components/shared/product"

export function ProductSection({ product }: { product: ProductProps }) {
    const description = product.description

    return (
        <section className="product-section">
            <div className="product-section__inner-container">
                <>
                    <ProductItem.Root
                        name={product.name}
                        type="product"
                        images={staticProductImages[product.slug].product}
                    >
                        {product.new && <ProductItem.Label type="product" />}
                        <ProductItem.Name type="product" name={product.name} />
                        <ProductItem.Description type="product" description={description} />
                        <ProductItem.Price price={product.price} />
                        <ProductItem.Action productId={product.id} />
                    </ProductItem.Root>
                    <ProductDetails
                        accessories={product.includes}
                        features={product.features}
                    />
                </>
            </div>
        </section>
    )
}
