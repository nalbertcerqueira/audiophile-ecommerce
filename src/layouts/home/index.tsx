import { CartModal } from "@/components/shared/cart/Overlay"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { CartProvider } from "@/contexts/CartContext"
import { Footer } from "./components/Footer"
import { PropsWithChildren } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <AuthProvider>
                    <CartProvider>
                        <CartModalProvider>
                            {children}
                            <Footer />
                            <CartModal />
                        </CartModalProvider>
                    </CartProvider>
                </AuthProvider>
            </div>
        </body>
    )
}
