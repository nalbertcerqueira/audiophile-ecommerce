import { staticProductImages } from "@/utils/imageMap"
import { ProductProps } from "@/@core/shared/entities/product/product"
import { ProductItem } from "@/components/shared/product/index"

export function PreviewSection({ products }: { products: ProductProps[] }) {
    function renderPreviews() {
        return products?.map((product, i) => {
            const className = i % 2 !== 0 ? "preview--reverse" : undefined
            const description = product.description

            return (
                <ProductItem.Root
                    key={product.id}
                    name={product.name}
                    type="preview"
                    className={className}
                    images={staticProductImages[product.slug].preview}
                >
                    {product.new && <ProductItem.Label type="preview" />}
                    <ProductItem.Name name={product.name} type="preview" />
                    <ProductItem.Description type="preview" description={description} />
                    <ProductItem.Link href={`/${product.category}/${product.slug}`} />
                </ProductItem.Root>
            )
        })
    }

    return (
        <section className="previews">
            <div className="previews__inner-container">{renderPreviews()}</div>
        </section>
    )
}
