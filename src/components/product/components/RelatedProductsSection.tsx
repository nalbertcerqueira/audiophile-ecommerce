import Zx9Speaker from "/public/imgs/product/zx9-speaker/desktop/zx9-thumb.jpg"
import Xx99MarkOne from "/public/imgs/product/xx99-mark-one-headphones/desktop/xx99-mark-one-thumb.jpg"
import Xx59 from "/public/imgs/product/xx59-headphones/desktop/xx59-thumb.jpg"
import { ProductMini } from "./ProductMini"

export function RelatedProductsSection() {
    const relatedProducts = [
        {
            name: "xx99 mark i",
            thumb: Xx99MarkOne,
            thumbAlt: "XX99 Mark I headphone",
            link: "/"
        },
        { name: "xx59", thumb: Xx59, thumbAlt: "XX59 headphone", link: "/" },
        { name: "zx9 speaker", thumb: Zx9Speaker, thumbAlt: "ZX9 Speaker", link: "/" }
    ]

    return (
        <section className="related-products">
            <div className="related-products__inner-container">
                <h2 className="related-products__title">YOU MAY ALSO LIKE</h2>
                <div className="related-products__wrapper">
                    {relatedProducts.map((product, i) => (
                        <ProductMini
                            key={i}
                            link={product.link}
                            name={product.name.toUpperCase()}
                            thumb={product.thumb}
                            thumbAlt={product.thumbAlt}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
