import { categories } from "@/utils/variable"
import Image from "next/image"
import { StaticImageData } from "next/image"
import { CategoryLink } from "../CategoryItem"

export interface MobileMenuItem {
    name: string
    link: string
    thumb: string | StaticImageData
    thumbAlt: string
}

export function MobileMenu() {
    return (
        <div className="mobile-menu">
            <div className="mobile-menu__categories">
                {categories.map(({ name, link, thumb, thumbAlt }, i) => (
                    <MobileMenuItem
                        key={i}
                        link={link}
                        thumb={thumb}
                        name={name}
                        thumbAlt={thumbAlt}
                    />
                ))}
            </div>
        </div>
    )
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
