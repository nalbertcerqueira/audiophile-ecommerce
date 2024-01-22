export function successCheckoutMessage(orderId: string) {
    return (
        <p>
            Success! 🎉 Your order was confirmed. Order id: <b>{orderId}</b>
        </p>
    )
}
