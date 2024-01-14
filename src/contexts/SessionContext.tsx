"use client"

import { getUserUseCase } from "@/@core/frontend/main/usecases/user/getUserFactory"
import { PropsWithChildren, createContext, useState, useEffect } from "react"
import {
    AuthenticatedUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/getUserGateway"
import { useSession } from "next-auth/react"

type UserBasicInfo = AuthenticatedUser | GuestUser

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

interface SessionContextProps {
    isLogged: boolean
    isLoading: boolean
    user: AuthenticatedUser | GuestUser | null
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
        if (nextAuthSession.status !== "loading") {
            validateSession()
        }
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

    return (
        <SessionContext.Provider value={{ ...status, user }}>
            {children}
        </SessionContext.Provider>
    )
}
