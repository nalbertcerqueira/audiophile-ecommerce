import { formatCurrency } from "@/utils/helpers"
import { ResponsiveImageSet } from "@/utils/imageMap/types"
import { AddProductAction, ProductLink } from "./ProductActions"
import { ResponsiveImages } from "../ResponsiveImages"

interface CommonFields {
    id: string
    name: string
    slug: string
    images: ResponsiveImageSet
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
    const { id, name, slug, description, images, type, className } = props

    return (
        <div className={`${type} ${className || ""}`.trim()}>
            <div className={`${type}__img-box`}>
                <ResponsiveImages
                    images={[
                        {
                            ...images.desktop,
                            alt: name,
                            className: `${type}__img ${type}__img--desktop`
                        },
                        {
                            ...images.tablet,
                            alt: name,
                            className: `${type}__img ${type}__img--tablet`
                        },
                        {
                            ...images.mobile,
                            alt: name,
                            className: `${type}__img ${type}__img--mobile`
                        }
                    ]}
                />
            </div>
            <div className={`${type}__info`}>
                {props.new ? <span className={`${type}__label`}>NEW PRODUCT</span> : null}
                <h2 className={`${type}__name`}>{name.toUpperCase()}</h2>
                <p className={`${type}__description`}>{description}</p>
                {type === "product" && (
                    <p className="product__price">{formatCurrency(props.price)}</p>
                )}
                {type === "product" ? (
                    <AddProductAction productId={id} />
                ) : (
                    <ProductLink href={`/${props.category}/${slug}`} />
                )}
            </div>
        </div>
    )
}
