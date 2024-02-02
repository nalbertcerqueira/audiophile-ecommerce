import { ProductItemType } from "./types"

interface ProductNameProps {
    type: ProductItemType
    name: string
}

export function ProductName({ name, type }: ProductNameProps) {
    if (type === "preview") {
        return <h2 className={`${type}__name`}>{name.toUpperCase()}</h2>
    }
    return <h1 className={`${type}__name`}>{name.toUpperCase()}</h1>
}
