import { Product } from "./Product"

export function PreviewSection() {
    return (
        <section className="previews">
            <div className="previews__inner-container">
                <Product />
                <Product className="product--reverse" />
                <Product />
            </div>
        </section>
    )
}
