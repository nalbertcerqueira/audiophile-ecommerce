import { MobileMenuModal } from "@/components/shared/mobileMenu/MobileMenuModal"
import { ToastContainer } from "react-toastify"
import { AppProvider } from "@/contexts"
import { CartModal } from "@/components/shared/cart/CartModal"
import { Footer } from "../../components/shared/layouts/Footer"
import { PropsWithChildren } from "react"
import "react-toastify/dist/ReactToastify.css"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <AppProvider>
                    {children}
                    <Footer />
                    <CartModal />
                    <MobileMenuModal />
                </AppProvider>
                <ToastContainer draggable={false} />
            </div>
        </body>
    )
}
