"use client"

import { useSession } from "@/hooks/useSession"
import { PropsWithChildren, createContext } from "react"
import { UserProps } from "@/@core/shared/entities/user/user"

interface AuthContextProps {
    isLogged: boolean
    isLoading: boolean
    user: Pick<UserProps, "name" | "email"> | null
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: PropsWithChildren) {
    const { status, user } = useSession("/api/auth/user")
    const { isLoading, isLogged } = status

    return (
        <AuthContext.Provider value={{ isLogged, isLoading, user }}>
            {children}
        </AuthContext.Provider>
    )
}
