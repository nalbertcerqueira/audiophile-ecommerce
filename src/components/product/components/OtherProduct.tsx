import Link from "next/link"
import { ResponsiveImages } from "@/components/shared/ResponsiveImages"
import { ResponsiveImageSet } from "@/utils/imageMap/types"

interface ProductCardProps {
    thumbs: ResponsiveImageSet
    name: string
    link: string
}

export function OtherProduct({ thumbs, name, link }: ProductCardProps) {
    return (
        <div className="other-product">
            <ResponsiveImages
                images={[
                    {
                        ...thumbs.desktop,
                        alt: "",
                        className: "other-product__thumb other-product__thumb--desktop"
                    },
                    {
                        ...thumbs.tablet,
                        alt: "",
                        className: "other-product__thumb other-product__thumb--tablet"
                    },
                    {
                        ...thumbs.mobile,
                        alt: "",
                        className: "other-product__thumb other-product__thumb--mobile"
                    }
                ]}
            />
            <div className="other-product__info">
                <h3 className="other-product__name">{name}</h3>
                <Link className="btn btn--primary" href={link}>
                    SEE PRODUCT
                </Link>
            </div>
        </div>
    )
}
