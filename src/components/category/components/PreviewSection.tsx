import { ProductItem } from "../../shared/ProductItem"

export function PreviewSection() {
    return (
        <section className="previews">
            <div className="previews__inner-container">
                <ProductItem type="preview" label="new product" />
                <ProductItem type="preview" className="product--reverse" />
                <ProductItem type="preview" />
            </div>
        </section>
    )
}
