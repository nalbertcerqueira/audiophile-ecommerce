import { CheckoutForm } from "./checkoutForm/CheckoutForm"
import { CheckoutSummary } from "./checkoutSummary"

export function CheckoutSection() {
    const formId = "checkout-form"

    return (
        <section className="checkout-section">
            <div className="checkout-section__inner-container">
                <CheckoutForm formId={formId} />
                <CheckoutSummary.Root formId={formId}>
                    <CheckoutSummary.Items />
                    <CheckoutSummary.Fields />
                </CheckoutSummary.Root>
            </div>
        </section>
    )
}
