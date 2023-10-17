import Image from "next/image"
import Link from "next/link"
import { StaticImageData } from "next/image"

interface ProductCardProps {
    thumb: string | StaticImageData
    name: string
    link: string
    thumbAlt: string
}

export function OtherProduct({ thumb, name, link, thumbAlt }: ProductCardProps) {
    return (
        <div className="other-product">
            <Image className="other-product__thumb" src={thumb} alt={thumbAlt} />
            <h3 className="other-product__name">{name}</h3>
            <Link className="btn btn--primary other-product__link" href={link}>
                SEE PRODUCT
            </Link>
        </div>
    )
}
