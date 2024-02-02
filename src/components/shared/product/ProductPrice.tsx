import { formatCurrency } from "@/utils/helpers"

export function ProductPrice({ price }: { price: number }) {
    return (
        <p aria-label={`${price} dollars`} className="product__price">
            {formatCurrency(price)}
        </p>
    )
}
