import { useEffect, useState } from "react"
import { UserProps } from "@/@core/shared/entities/user/user"
import { getUserUseCase } from "@/@core/frontend/main/usecases/user/getUserFactory"

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export function useSession() {
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<Pick<UserProps, "name" | "email"> | null>(null)

    useEffect(() => {
        getUserUseCase
            .execute()
            .then(async (data) => {
                if (typeof data === "string") {
                    localStorage.setItem("sessionToken", data)
                    return setStatus({ isLoading: false, isLogged: false })
                }

                if (data.type === "authenticated") {
                    const { name, email } = data
                    setUser({ email, name })
                    return setStatus({ isLoading: false, isLogged: true })
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
