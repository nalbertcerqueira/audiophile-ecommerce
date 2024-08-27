import { CheckoutForm } from "./checkoutForm/CheckoutForm"
import { CheckoutSummary } from "./checkoutSummary"
import { SectionContent } from "@/components/shared/SectionContent"

export function CheckoutSection() {
    const formId = "checkout-form"

    return (
        <section className="checkout-section">
            <div className="checkout-section__inner-container">
                <SectionContent>
                    <CheckoutForm formId={formId} />
                </SectionContent>
                <CheckoutSummary.Root formId={formId}>
                    <CheckoutSummary.Items />
                    <CheckoutSummary.Fields />
                </CheckoutSummary.Root>
            </div>
        </section>
    )
}
