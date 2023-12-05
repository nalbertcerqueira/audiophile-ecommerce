import { useEffect, useState } from "react"
import { UserProps } from "@/@core/shared/entities/user/user"

export function useSession() {
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<Pick<UserProps, "name" | "email"> | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        fetch("/api/auth/user", { headers: { Authorization: `Bearer ${token}` } })
            .then(async (res) => {
                if (res.ok) {
                    const { data } = await res.json()
                    setUser(data)
                    setIsLogged(true)
                } else {
                    setIsLogged(false)
                }
            })
            .catch(() => {
                setIsLogged(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return { isLoading, isLogged, user }
}
