export interface Accessory {
    item: string
    quantity: number
}

export interface ImageMap {
    mobile: string
    tablet: string
    desktop: string
}

export interface ProductGallery {
    first: ImageMap
    second: ImageMap
    third: ImageMap
}

export interface RelatedProduct {
    slug: string
    name: string
    category: string
    image: ImageMap
}

//Interface de um Produto
export interface ProductProps {
    id: string
    slug: string
    name: string
    shortName: string
    category: string
    new: boolean
    price: number
    description: string
    features: string
    includes?: Accessory[]
    others: RelatedProduct[]
    image: ImageMap
    gallery: ProductGallery
}
