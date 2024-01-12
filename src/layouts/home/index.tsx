import { NextAuthSessionProvider } from "@/contexts/NextAuthSessionProvider"
import { PropsWithChildren } from "react"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { SessionProvider } from "@/contexts/SessionContext"
import { ToastContainer } from "react-toastify"
import { CartProvider } from "@/contexts/CartContext"
import { CartModal } from "@/components/shared/cart/Overlay"
import { Footer } from "./components/Footer"
import "react-toastify/dist/ReactToastify.css"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <NextAuthSessionProvider>
                    <SessionProvider>
                        <CartProvider>
                            <CartModalProvider>
                                {children}
                                <Footer />
                                <CartModal />
                            </CartModalProvider>
                        </CartProvider>
                    </SessionProvider>
                </NextAuthSessionProvider>
                <ToastContainer draggable={false} />
            </div>
        </body>
    )
}
