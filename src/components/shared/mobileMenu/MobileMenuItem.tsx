import { CategoryLink } from "../CategoryItem"
import { StaticImageData } from "next/image"
import Image from "next/image"

export interface MobileMenuItem {
    name: string
    link: string
    thumb: string | StaticImageData
    thumbAlt: string
}

export function MobileMenuItem({ name, thumb, thumbAlt, link }: MobileMenuItem) {
    return (
        <div key={name} className="mobile-category">
            <div className="mobile-category__thumb-box">
                <Image src={thumb} className="mobile-category__thumb" alt={thumbAlt} />
            </div>
            <div className="mobile-category__info">
                <h3 className="mobile-category__name">{name.toUpperCase()}</h3>
                <CategoryLink link={link} />
            </div>
        </div>
    )
}
