import { CategoryLink } from "../CategoryItem"
import { StaticImageData } from "next/image"
import Image from "next/image"

export interface MobileMenuItem {
    name: string
    link: string
    thumb: string | StaticImageData
}

export function MobileMenuItem({ name, thumb, link }: MobileMenuItem) {
    return (
        <div key={name} className="mobile-category">
            <div aria-hidden="true" className="mobile-category__thumb-box">
                <Image src={thumb} className="mobile-category__thumb" alt="" />
            </div>
            <div className="mobile-category__info">
                <p aria-hidden="true" className="mobile-category__name">
                    {name.toUpperCase()}
                </p>
                <CategoryLink ariaLabel={name} link={link} />
            </div>
        </div>
    )
}
