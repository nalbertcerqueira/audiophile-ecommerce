import { StaticImageData } from "next/image"

export interface StaticGalleryImages {
    first: ResponsiveImageSet
    second: ResponsiveImageSet
    third: ResponsiveImageSet
}

export interface ResponsiveImageSet {
    desktop: StaticImageData
    tablet: StaticImageData
    mobile: StaticImageData
}

export interface StaticImageMap {
    [key: string | symbol]: {
        product: ResponsiveImageSet
        preview: ResponsiveImageSet
        thumb?: ResponsiveImageSet
        cartThumb: StaticImageData
        gallery: StaticGalleryImages
    }
}
