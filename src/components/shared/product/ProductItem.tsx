import { formatCurrency } from "@/utils/helpers"
import { ResponsiveImageSet } from "@/utils/imageMap/types"
import { AddProductAction } from "./ProductAction"
import { ResponsiveImages } from "../ResponsiveImages"
import { ProductLink } from "./ProductLink"

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

    function renderProductLabel() {
        if (!props.new) {
            return null
        }
        return <span className={`${type}__label`}>NEW PRODUCT</span>
    }

    function renderTitle() {
        if (type === "preview") {
            return <h2 className={`${type}__name`}>{name.toUpperCase()}</h2>
        }
        return <h1 className={`${type}__name`}>{name.toUpperCase()}</h1>
    }

    function renderLinkOrAction() {
        if (type === "product") {
            return <AddProductAction productId={id} />
        }
        return <ProductLink href={`/${props.category}/${slug}`} />
    }

    function renderPrice() {
        if (type === "preview") {
            return null
        }
        return <p className="product__price">{formatCurrency(props.price)}</p>
    }

    return (
        <div className={`${type} ${className || ""}`.trim()}>
            <div className={`${type}__img-box`}>
                <ResponsiveImages
                    images={[
                        {
                            ...images.desktop,
                            alt: `a detailed image of ${name}`,
                            className: `${type}__img ${type}__img--desktop`
                        },
                        {
                            ...images.tablet,
                            alt: `a detailed image of ${name}`,
                            className: `${type}__img ${type}__img--tablet`
                        },
                        {
                            ...images.mobile,
                            alt: `a detailed image of ${name}`,
                            className: `${type}__img ${type}__img--mobile`
                        }
                    ]}
                />
            </div>
            <div className={`${type}__info`}>
                {renderProductLabel()}
                {renderTitle()}
                <p className={`${type}__description`}>{description}</p>
                {renderPrice()}
                {renderLinkOrAction()}
            </div>
        </div>
    )
}
