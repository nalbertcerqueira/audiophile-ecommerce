import { NextAuthSessionProvider } from "@/contexts/nextAuthSessionContext/NextAuthSessionContext"
import { CheckoutProvider } from "@/contexts/checkoutContext/CheckoutContext"
import { SessionProvider } from "@/contexts/sessionContext/SessionContext"
import { ModalProvider } from "@/contexts/modalContext/ModalContext"
import { CartProvider } from "@/contexts/cartContext/CartContext"
import { PropsWithChildren } from "react"

export function AppProvider({ children }: PropsWithChildren) {
    return (
        <NextAuthSessionProvider>
            <SessionProvider>
                <CartProvider>
                    <ModalProvider>
                        <CheckoutProvider>{children}</CheckoutProvider>
                    </ModalProvider>
                </CartProvider>
            </SessionProvider>
        </NextAuthSessionProvider>
    )
}
