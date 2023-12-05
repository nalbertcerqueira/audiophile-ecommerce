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
    const { isLoading, isLogged, user } = useSession()

    return (
        <AuthContext.Provider value={{ isLogged, isLoading, user }}>
            {children}
        </AuthContext.Provider>
    )
}
