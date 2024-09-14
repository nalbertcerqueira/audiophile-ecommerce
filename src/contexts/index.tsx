import { NextAuthProvider } from "@/libs/next-auth/Provider"
import { SessionProvider } from "@/contexts/sessionContext/SessionContext"
import { StoreProvider } from "@/libs/redux/StoreProvider"
import { PropsWithChildren } from "react"

export function AppProvider({ children }: PropsWithChildren) {
    return (
        <NextAuthProvider>
            <StoreProvider>
                <SessionProvider>{children}</SessionProvider>
            </StoreProvider>
        </NextAuthProvider>
    )
}
