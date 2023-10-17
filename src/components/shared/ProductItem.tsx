import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/utils/helpers"
import { Counter } from "./Counter"
import { StaticImages } from "@/utils/imageMap/types"

interface CommonFields {
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
    function renderActions(): JSX.Element {
        if (props.type === "preview") {
            return (
                <Link
                    role="button"
                    href={`/${props.category}/${props.slug}`}
                    className="btn btn--primary product__link"
                >
                    SEE PRODUCT
                </Link>
            )
        }
        return (
            <div className="product__cart-actions">
                <Counter />
                <button className="btn btn--primary" type="button">
                    ADD TO CART
                </button>
            </div>
        )
    }

    return (
        <div className={`product ${props.className || ""}`.trim()}>
            <div className="product__img-box">
                <Image
                    placeholder="blur"
                    src={props.images.desktop}
                    alt={props.name}
                    className="product__img"
                />
            </div>
            <div className="product__info">
                {props.new ? <span className="product__label">NEW PRODUCT</span> : null}
                <h2 className="product__name">{props.name.toUpperCase()}</h2>
                <p className="product__description">{props.description}</p>
                {props.type === "product" && (
                    <p className="product__price">{formatCurrency(props.price)}</p>
                )}
                {renderActions()}
            </div>
        </div>
    )
}
