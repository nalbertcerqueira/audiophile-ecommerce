import { NextAuthSessionProvider } from "@/contexts/NextAuthSessionContext"
import { ModalProvider } from "@/contexts/ModalContext"
import { CheckoutProvider } from "@/contexts/CheckoutContext"
import { SessionProvider } from "@/contexts/SessionContext"
import { CartProvider } from "@/contexts/CartContext"
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
