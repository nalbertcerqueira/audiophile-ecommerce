"use client"

import { getUserUseCase } from "@/@core/frontend/main/usecases/user/getUserFactory"
import { PropsWithChildren, createContext, useState, useEffect } from "react"
import {
    AuthenticatedUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/getUserGateway"

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
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<UserBasicInfo | null>(null)

    useEffect(() => {
        main()
    }, [])

    async function main() {
        try {
            const data = await getUserUseCase.execute()
            if (typeof data === "string") {
                localStorage.setItem("sessionToken", data)
                return setStatus({ isLoading: false, isLogged: false })
            }

            if (typeof data === "object") {
                const { type } = data
                setUser({ ...data })
                return setStatus({ isLoading: false, isLogged: type === "authenticated" })
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
