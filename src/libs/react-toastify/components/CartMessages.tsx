interface SuccessAdditionProps {
    productName?: string
    quantity: number
}

export function SuccessAdditionMessage({ productName, quantity }: SuccessAdditionProps) {
    return (
        <p>
            <b>
                {quantity} - {productName || null}
            </b>{" "}
            successfully added to cart!
        </p>
    )
}

export function CartAwaitingMessage() {
    return <p>Adding product to cart...</p>
}
