"use client"

import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useEffect } from "react"

interface ProtectedRouteProps {
    routeType: "auth" | "protected"
    routeToRedirect: string
    children: ReactNode
    fallback: ReactNode
}

export function AuthRedirectionRoute(props: ProtectedRouteProps) {
    const { fallback, routeToRedirect, routeType } = props
    const { isLoading, isLogged } = useContext(AuthContext)
    const { push } = useRouter()

    useEffect(() => {
        if (routeType === "protected") {
            if (!isLoading && !isLogged) push(routeToRedirect)
        } else {
            if (!isLoading && isLogged) push(routeToRedirect)
        }
    }, [isLoading, isLogged, routeToRedirect, routeType, push])

    if (isLoading) {
        return fallback
    }

    switch (routeType) {
        case "protected":
            if (!isLoading && isLogged) return props.children
            break
        case "auth":
            if (!isLoading && !isLogged) return props.children
            break
    }
}
