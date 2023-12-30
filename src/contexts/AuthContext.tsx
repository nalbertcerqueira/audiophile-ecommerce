"use client"

import { useSession } from "@/hooks/useSession"
import { PropsWithChildren, createContext } from "react"
import {
    AuthenticatedUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/getUserGateway"

interface AuthContextProps {
    isLogged: boolean
    isLoading: boolean
    user: AuthenticatedUser | GuestUser | null
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: PropsWithChildren) {
    const { status, user } = useSession()
    const { isLoading, isLogged } = status

    return (
        <AuthContext.Provider value={{ isLogged, isLoading, user }}>
            {children}
        </AuthContext.Provider>
    )
}
