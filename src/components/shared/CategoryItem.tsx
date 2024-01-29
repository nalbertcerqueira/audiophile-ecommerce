import { ArrowRightIcon } from "@/components/shared/icons/ArrowRightIcon"
import { StaticImageData } from "next/image"
import Link from "next/link"
import Image from "next/image"

export interface CategoryProps {
    name: string
    link: string
    thumb: string | StaticImageData
    thumbAlt: string
}

export function CategoryItem({ name, link, thumb, thumbAlt }: CategoryProps) {
    return (
        <div key={name} className="category">
            <div className="category__thumb-container">
                <Image src={thumb} className="category__thumb" alt={thumbAlt} />
                <div className="category__thumb-shadow" />
            </div>
            <div className="category__info">
                <h3 className="category__name">{name.toUpperCase()}</h3>
                <CategoryLink link={link} />
            </div>
        </div>
    )
}

export function CategoryLink({ link }: { link: string }) {
    return (
        <Link className="category__link" href={link}>
            SHOP
            <span>
                <ArrowRightIcon className="category__arrow-icon" />
            </span>
        </Link>
    )
}
