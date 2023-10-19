export interface StaticGalleryImages {
    first: StaticImages
    second: StaticImages
    third: StaticImages
}

export interface StaticImages {
    desktop: StaticImageData
    tablet: StaticImageData
    mobile: StaticImageData
}

export interface StaticImageMap {
    [key: string | symbol]: {
        product: StaticImages
        preview: StaticImages
        thumb?: StaticImages
        cartThumb: StaticImageData
        gallery: StaticGalleryImages
    }
}
