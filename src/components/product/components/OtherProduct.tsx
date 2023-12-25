import Image from "next/image"
import Link from "next/link"
import { StaticImageData } from "next/image"

interface ProductCardProps {
    thumb: StaticImageData
    name: string
    link: string
    thumbAlt: string
}

export function OtherProduct({ thumb, name, link, thumbAlt }: ProductCardProps) {
    return (
        <div className="other-product">
            <Image className="other-product__thumb" src={thumb} alt={thumbAlt} />
            <div className="other-product__info">
                <h3 className="other-product__name">{name}</h3>
                <Link className="btn btn--primary" href={link}>
                    SEE PRODUCT
                </Link>
            </div>
        </div>
    )
}
