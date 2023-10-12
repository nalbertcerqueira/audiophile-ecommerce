import Image from "next/image"
import Link from "next/link"
import ProductImg from "/public/imgs/product/xx99-mark-two/xx99-mark-two-main.jpg"
import { Counter } from "./Counter"

interface ProductProps {
    className?: string
    type: "preview" | "product"
    label?: string
}

export function ProductItem({ className, label, type }: ProductProps) {
    function renderActions() {
        if (type === "preview") {
            return (
                <Link role="button" href="/" className="btn btn--primary product__link">
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
        <div className={`product ${className || ""}`.trim()}>
            <div className="product__img-box">
                <Image
                    src={ProductImg}
                    alt="xx99 mark one headphone"
                    className="product__img"
                />
            </div>
            <div className="product__info">
                {label ? <span className="product__label">{label.toUpperCase()}</span> : null}
                <h2 className="product__name">XX99 MARK II HEADPHONES</h2>
                <p className="product__description">
                    The new XX99 Mark II headphones is the pinnacle of pristine audio. It
                    redefines your premium headphone experience by reproducing the balanced
                    depth and precision of studio-quality sound.
                </p>
                {type === "preview" ? null : <p className="product__price">$ 2,999</p>}
                {renderActions()}
            </div>
        </div>
    )
}
