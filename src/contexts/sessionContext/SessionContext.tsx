"use client"

import { SessionContextProps } from "./types"
import { PropsWithChildren, createContext, useCallback, useEffect } from "react"

import { useAppDispatch } from "@/libs/redux/hooks"
import { useSession, signOut } from "next-auth/react"
import { getUserProfile } from "@/store/user/index"
import { emitToast } from "@/libs/react-toastify/utils"

export const SessionContext = createContext<SessionContextProps>({} as SessionContextProps)

export function SessionProvider({ children }: PropsWithChildren) {
    const nextAuthSession = useSession()
    const sessionStatus = nextAuthSession.status
    const dispatch = useAppDispatch()

    const createSession = useCallback(async () => {
        //Removendo o accessToken do usuário convidado caso o mesmo tenha sido
        //autenticado com auxilio do next-auth
        document.cookie = `guest-access-token=0;path=/;expires=${new Date().toUTCString()};sameSite=Lax`

        await dispatch(getUserProfile()).catch((error) => emitToast("error", error.message))
    }, [dispatch])

    function logout() {
        localStorage.removeItem("accessToken")
        signOut({ callbackUrl: "/signin" })
    }

    useEffect(() => {
        //Persistindo o accessToken no localStorage caso o usuário tenha se autenticado
        //com auxílio do next-auth
        if (sessionStatus === "authenticated") {
            const token = nextAuthSession.data.accessToken
            token && localStorage.setItem("accessToken", token)
        }

        //Buscando as informações do usuário no banco de dados
        if (sessionStatus !== "loading") {
            createSession()
        }
    }, [sessionStatus, nextAuthSession.data?.accessToken, createSession])

    return <SessionContext.Provider value={{ logout }}>{children}</SessionContext.Provider>
}
