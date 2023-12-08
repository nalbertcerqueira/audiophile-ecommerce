import { useEffect, useState } from "react"
import { UserProps } from "@/@core/shared/entities/user/user"

interface SessionStatus {
    isLogged: boolean
    isLoading: boolean
}

export function useSession(apiUrl: string) {
    const [status, setStatus] = useState<SessionStatus>({ isLoading: true, isLogged: false })
    const [user, setUser] = useState<Pick<UserProps, "name" | "email"> | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (res) => {
                if (res.ok) {
                    const { data } = await res.json()
                    setUser(data)
                    setStatus({ isLoading: false, isLogged: true })
                } else {
                    throw new Error(res.statusText)
                }
            })
            .catch(() => {
                setStatus({ isLoading: false, isLogged: false })
            })
    }, [apiUrl])

    return { status, user }
}
