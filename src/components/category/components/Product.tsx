import Image from "next/image"
import Link from "next/link"
import Headphone01 from "/public/imgs/category/headphones/xx99-mark-two-preview.jpg"

export function Product({ className }: { className?: string }) {
    return (
        <div className={`product ${className}`.trim()}>
            <div className="product__img-box">
                <Image
                    src={Headphone01}
                    alt="xx99 mark one headphone"
                    className="product__img"
                />
            </div>
            <div className="product__info">
                <span className="product__label">NEW PRODUCT</span>
                <h2 className="product__name">XX99 MARK II HEADPHONES</h2>
                <p className="product__description">
                    The new XX99 Mark II headphones is the pinnacle of pristine audio. It
                    redefines your premium headphone experience by reproducing the balanced
                    depth and precision of studio-quality sound.
                </p>
                <Link role="button" href="/" className="btn btn--primary product__link">
                    SEE PRODUCT
                </Link>
            </div>
        </div>
    )
}
