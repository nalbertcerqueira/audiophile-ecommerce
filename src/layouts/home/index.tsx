import { CartModal } from "@/components/shared/cart/Overlay"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { CartProvider } from "@/contexts/CartContext"
import { Footer } from "./components/Footer"
import { PropsWithChildren } from "react"
import { SessionProvider } from "@/contexts/SessionContext"
import "./styles.scss"
import { NextAuthSessionProvider } from "@/contexts/NextAuthSessionProvider"

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
            </div>
        </body>
    )
}
