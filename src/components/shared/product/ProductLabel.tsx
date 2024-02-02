import { ProductItemType } from "./types"

export function ProductLabel({ type }: { type: ProductItemType }) {
    return <span className={`${type}__label`}>NEW PRODUCT</span>
}
