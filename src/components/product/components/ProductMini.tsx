import Image from "next/image"
import Link from "next/link"
import { StaticImageData } from "next/image"

interface ProductCardProps {
    thumb: string | StaticImageData
    name: string
    link: string
    thumbAlt: string
}

export function ProductMini({ thumb, name, link, thumbAlt }: ProductCardProps) {
    return (
        <div className="product-mini">
            <Image className="product-mini__thumb" src={thumb} alt={thumbAlt} />
            <h3 className="product-mini__name">{name}</h3>
            <Link className="btn btn--primary product-mini__link" href={link}>
                SEE PRODUCT
            </Link>
        </div>
    )
}
