import { useEffect, useState } from "react"
import { UserProps } from "@/@core/shared/entities/user/user"
import { getUserGateway } from "@/@core/frontend/main/usecases/user/getUserFactory"

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export function useSession() {
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<Pick<UserProps, "name" | "email"> | null>(null)

    useEffect(() => {
        getUserGateway
            .execute()
            .then(async (userData) => {
                if (userData) {
                    setUser({ ...userData })
                    setStatus({ isLoading: false, isLogged: true })
                } else {
                    throw new Error("Unauthorized")
                }
            })
            .catch((error) => {
                console.log(error)
                setStatus({ isLoading: false, isLogged: false })
                setUser(null)
            })
    }, [])

    return { status, user }
}
