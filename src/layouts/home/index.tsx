import { Footer } from "./components/Footer"
import { PropsWithChildren } from "react"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { CartProvider } from "@/contexts/CartContext"
import { CartModal } from "@/components/shared/cart/Overlay"
import "@/scss/index.scss"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <CartProvider>
                    <CartModalProvider>
                        {children}
                        <CartModal />
                    </CartModalProvider>
                </CartProvider>
                <Footer />
            </div>
        </body>
    )
}
