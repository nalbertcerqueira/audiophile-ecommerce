"use client"

import { SessionContext } from "@/contexts/sessionContext/SessionContext"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useEffect } from "react"

interface ProtectedRouteProps {
    routeType: "auth" | "protected"
    routeToRedirect: string
    children: ReactNode
    fallback: ReactNode
}

//Redirecionando o usuário com base no tipo de rota e status da sessão
export function AuthRedirectionRoute(props: ProtectedRouteProps) {
    const { fallback, routeToRedirect, routeType } = props
    const { isLoading, isLogged } = useContext(SessionContext)
    const { replace } = useRouter()

    useEffect(() => {
        if (routeType === "protected") {
            if (!isLoading && !isLogged) replace(routeToRedirect)
        } else {
            if (!isLoading && isLogged) replace(routeToRedirect)
        }
    }, [isLoading, isLogged, routeToRedirect, routeType, replace])

    switch (routeType) {
        case "protected":
            if (!isLoading && isLogged) return props.children
            break
        case "auth":
            if (!isLoading && !isLogged) return props.children
            break
    }

    return fallback
}
