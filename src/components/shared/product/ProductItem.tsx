import Image from "next/image"
import { formatCurrency } from "@/utils/helpers"
import { StaticImages } from "@/utils/imageMap/types"
import { AddProductAction, ProductLink } from "./ProductActions"

interface CommonFields {
    id: string
    name: string
    slug: string
    images: StaticImages
    new: boolean
    description: string
    className?: string
}

interface PreviewProps extends CommonFields {
    type: "preview"
    category: string
}

interface ProductProps extends CommonFields {
    type: "product"
    price: number
}

type ProductItemProps = PreviewProps | ProductProps

export function ProductItem(props: ProductItemProps) {
    const { id, name, slug, description, images } = props

    return (
        <div className={`product ${props.className || ""}`.trim()}>
            <div className="product__img-box">
                <Image
                    placeholder="blur"
                    src={images.desktop}
                    alt={name}
                    className="product__img"
                />
            </div>
            <div className="product__info">
                {props.new ? <span className="product__label">NEW PRODUCT</span> : null}
                <h2 className="product__name">{name.toUpperCase()}</h2>
                <p className="product__description">{description}</p>
                {props.type === "product" && (
                    <p className="product__price">{formatCurrency(props.price)}</p>
                )}
                {props.type === "product" ? (
                    <AddProductAction productId={id} />
                ) : (
                    <ProductLink href={`/${props.category}/${slug}`} />
                )}
            </div>
        </div>
    )
}
