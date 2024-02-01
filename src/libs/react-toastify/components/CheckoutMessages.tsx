export function successCheckoutMessage(orderId: string) {
    return (
        <p>
            Success! <span aria-hidden="true">🎉</span> Your order was confirmed. Order id:{" "}
            <b>{orderId}</b>
        </p>
    )
}
