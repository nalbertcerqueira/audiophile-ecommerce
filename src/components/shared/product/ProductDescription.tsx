import { ProductItemType } from "./types"

interface ProductDescriptionProps {
    type: ProductItemType
    description: string
}

export function ProductDescription({ type, description }: ProductDescriptionProps) {
    return <p className={`${type}__description`}>{description}</p>
}
