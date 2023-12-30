import { getUserUseCase } from "@/@core/frontend/main/usecases/user/getUserFactory"
import { useEffect, useState } from "react"
import {
    AuthenticatedUser,
    GuestUser
} from "@/@core/frontend/domain/gateways/user/getUserGateway"

type UserBasicInfo = AuthenticatedUser | GuestUser

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export function useSession() {
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<UserBasicInfo | null>(null)

    useEffect(() => {
        getUserUseCase
            .execute()
            .then(async (data) => {
                if (typeof data === "string") {
                    localStorage.setItem("sessionToken", data)
                    return setStatus({ isLoading: false, isLogged: false })
                }
                const { type } = data
                if (type === "authenticated" || type === "guest") {
                    setUser({ ...data })
                    return setStatus({ isLoading: false, isLogged: type === "authenticated" })
                }
                throw new Error()
            })
            .catch(() => {
                setStatus({ isLoading: false, isLogged: false })
                setUser(null)
            })
    }, [])

    return { status, user }
}
