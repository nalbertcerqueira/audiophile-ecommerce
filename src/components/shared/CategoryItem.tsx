import { ArrowRightIcon } from "@/components/shared/icons/ArrowRightIcon"
import { StaticImageData } from "next/image"
import Link from "next/link"
import Image from "next/image"

export interface CategoryProps {
    name: string
    link: string
    thumb: string | StaticImageData
}

export function CategoryItem({ name, link, thumb }: CategoryProps) {
    return (
        <div key={name} className="category">
            <div className="category__thumb-container">
                <Image src={thumb} className="category__thumb" alt="" />
                <div className="category__thumb-shadow" />
            </div>
            <div className="category__info">
                <p aria-hidden="true" className="category__name">
                    {name.toUpperCase()}
                </p>
                <CategoryLink ariaLabel={`shop ${name}`} link={link} />
            </div>
        </div>
    )
}

export function CategoryLink({ link, ariaLabel }: { link: string; ariaLabel?: string }) {
    return (
        <Link aria-label={ariaLabel} className="category-link" href={link}>
            SHOP
            <span>
                <ArrowRightIcon className="category-link__arrow-icon" />
            </span>
        </Link>
    )
}
