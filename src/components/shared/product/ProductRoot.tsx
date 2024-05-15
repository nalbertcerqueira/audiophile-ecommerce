import { ResponsiveImageSet } from "@/utils/imageMap/types"
import { ResponsiveImages } from "../ResponsiveImages"
import { ProductItemType } from "./types"
import { ReactNode } from "react"

interface ProductRootProps {
    type: ProductItemType
    name: string
    images: ResponsiveImageSet
    children: ReactNode
    className?: string
}

export function ProductRoot(props: ProductRootProps) {
    const { name, images, type, children, className } = props

    return (
        <div className={`${type} ${className || ""}`.trim()}>
            <div className={`${type}__img-box`}>
                <ResponsiveImages
                    images={[
                        {
                            ...images.desktop,
                            alt: `A closer look image of ${name}`,
                            className: `${type}__img ${type}__img--desktop`
                        },
                        {
                            ...images.tablet,
                            alt: `A closer look image of ${name}`,
                            className: `${type}__img ${type}__img--tablet`
                        },
                        {
                            ...images.mobile,
                            alt: `A closer look image of ${name}`,
                            className: `${type}__img ${type}__img--mobile`
                        }
                    ]}
                />
            </div>
            <div className={`${type}__info`}>{children}</div>
        </div>
    )
}
