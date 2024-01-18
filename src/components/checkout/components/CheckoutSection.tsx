import { CheckoutForm } from "./CheckoutForm"
import { CheckoutSummary } from "./CheckoutSummary"

export function CheckoutSection() {
    const formId = "checkout-form"

    return (
        <section className="checkout-section">
            <div className="checkout-section__inner-container">
                <CheckoutForm formId={formId} />
                <CheckoutSummary formId={formId} />
            </div>
        </section>
    )
}
