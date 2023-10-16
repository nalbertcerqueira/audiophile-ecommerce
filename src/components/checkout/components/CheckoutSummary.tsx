import { CartItem } from "@/components/shared/cart/CartItem"
import { SummaryField } from "@/components/shared/cart/SummaryField"

interface CheckoutSummaryProps {
    formId: string
}

export function CheckoutSummary({ formId }: CheckoutSummaryProps) {
    return (
        <div className="summary">
            <h3 className="summary__title">SUMMARY</h3>
            <div className="summary__items">
                <CartItem readOnly />
                <CartItem readOnly />
                <CartItem readOnly />
            </div>
            <div className="summary__total-fields">
                <SummaryField name="TOTAL" value="$ 5,396" />
                <SummaryField name="SHIPPING" value="$ 50" />
                <SummaryField name="VAT (INCLUDED)" value="$ 1,079" />
            </div>
            <div className="summary__grand-total">
                <SummaryField name="GRAND TOTAL" value="$ 5,446" />
            </div>
            <button
                form={formId}
                type="submit"
                className="btn btn--primary summary__submit-btn"
            >
                CONTINUE & PAY
            </button>
        </div>
    )
}
