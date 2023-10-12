import { ProductDetails } from "./ProductDetails"
import { ProductItem } from "@/components/shared/ProductItem"

export function ProductSection() {
    return (
        <section className="product-section">
            <div className="product-section__inner-container">
                <ProductItem type="product" label="new product" />
                <ProductDetails />
            </div>
        </section>
    )
}
