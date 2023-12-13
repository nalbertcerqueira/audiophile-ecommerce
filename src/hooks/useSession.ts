import { useEffect, useState } from "react"
import { UserProps } from "@/@core/shared/entities/user/user"
import { getUserUseCase } from "@/@core/frontend/main/usecases/user/getUserFactory"

type UserData = Pick<UserProps, "id"> & Partial<Pick<UserProps, "name" | "email">>

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export function useSession() {
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<UserData | null>(null)

    useEffect(() => {
        getUserUseCase
            .execute()
            .then(async (data) => {
                if (typeof data === "string") {
                    localStorage.setItem("sessionToken", data)
                    return setStatus({ isLoading: false, isLogged: false })
                }

                const { type, ...userRest } = data
                setStatus({ isLoading: false, isLogged: type === "authenticated" })
                setUser(userRest)
            })
            .catch(() => {
                setStatus({ isLoading: false, isLogged: false })
                setUser(null)
            })
    }, [])

    return { status, user }
}
