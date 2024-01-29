"use client"

import {
    AuthenticatedUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/getUserGateway"
import { getUserUseCase } from "@/@core/frontend/main/usecases/user/getUserFactory"
import { toCapitalized } from "@/utils/helpers"
import { PropsWithChildren, createContext, useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

type UserBasicInfo = AuthenticatedUser | GuestUser

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

interface SessionContextProps {
    isLogged: boolean
    isLoading: boolean
    user: AuthenticatedUser | GuestUser | null
    logout: () => void
    getFirstName: () => string | null
}

export const SessionContext = createContext<SessionContextProps>({} as SessionContextProps)

export function SessionProvider({ children }: PropsWithChildren) {
    const nextAuthSession = useSession()
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<UserBasicInfo | null>(null)

    useEffect(() => {
        if (nextAuthSession.status === "authenticated") {
            const token = nextAuthSession.data.accessToken
            token && localStorage.setItem("accessToken", token)
        }
    }, [nextAuthSession.status, nextAuthSession.data?.accessToken])

    useEffect(() => {
        nextAuthSession.status !== "loading" && validateSession()
    }, [nextAuthSession.status])

    async function validateSession() {
        //Removendo o accessToken do usuário anônimo após obter os dados da sessão
        document.cookie = `guest-access-token=0;path=/;expires=${new Date().toUTCString()};sameSite=Lax`

        try {
            const data = await getUserUseCase.execute()
            if (typeof data === "string") {
                localStorage.setItem("accessToken", data)
                return setStatus({ isLoading: false, isLogged: false })
            }

            if (data && typeof data === "object") {
                const { type } = data
                setUser({ ...data })
                return setStatus({
                    isLoading: false,
                    isLogged: type === "authenticated" || type === "external"
                })
            }

            throw new Error()
        } catch {
            setStatus({ isLoading: false, isLogged: false })
            setUser(null)
        }
    }

    function logout() {
        localStorage.removeItem("accessToken")
        signOut({ callbackUrl: "/" })
    }

    function getFirstName(): string | null {
        if (user?.type === "authenticated" || user?.type === "external") {
            return toCapitalized(user.name.split(" ")[0]) || null
        }

        return null
    }

    return (
        <SessionContext.Provider value={{ ...status, user, logout, getFirstName }}>
            {children}
        </SessionContext.Provider>
    )
}
