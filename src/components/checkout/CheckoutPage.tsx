import { Header } from "@/components/shared/layouts/Header"
import { BackButton } from "@/components/shared/buttons/BackButton"
import { CheckoutSection } from "./components/CheckoutSection"
import { ConfirmationModal } from "./components/ConfirmationModal"
import "./styles.scss"

export function CheckoutPageComponent() {
    return (
        <>
            <div className="checkout-page-container">
                <Header className="header--black" />
                <div className="utils-wrapper">
                    <div className="utils-wrapper__inner">
                        <BackButton />
                    </div>
                </div>
                <CheckoutSection />
                <ConfirmationModal />
            </div>
        </>
    )
}
