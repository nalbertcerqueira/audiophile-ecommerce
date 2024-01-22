import { NextAuthSessionProvider } from "@/contexts/NextAuthSessionContext"
import { PropsWithChildren } from "react"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { SessionProvider } from "@/contexts/SessionContext"
import { ToastContainer } from "react-toastify"
import { CartProvider } from "@/contexts/CartContext"
import { CartModal } from "@/components/shared/cart/Overlay"
import { Footer } from "./components/Footer"
import "react-toastify/dist/ReactToastify.css"
import "./styles.scss"
import { CheckoutProvider } from "@/contexts/CheckoutContext"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <NextAuthSessionProvider>
                    <SessionProvider>
                        <CartProvider>
                            <CartModalProvider>
                                <CheckoutProvider>
                                    {children}
                                    <Footer />
                                    <CartModal />
                                </CheckoutProvider>
                            </CartModalProvider>
                        </CartProvider>
                    </SessionProvider>
                </NextAuthSessionProvider>
                <ToastContainer draggable={false} />
            </div>
        </body>
    )
}
