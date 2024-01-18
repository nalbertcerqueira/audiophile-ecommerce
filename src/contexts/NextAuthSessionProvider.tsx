"use client"

import { PropsWithChildren, createContext } from "react"
import { SessionProvider } from "next-auth/react"

const NextAuthSessionContext = createContext({})

export function NextAuthSessionProvider({ children }: PropsWithChildren) {
    return (
        <NextAuthSessionContext.Provider value={{}}>
            <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
        </NextAuthSessionContext.Provider>
    )
}
