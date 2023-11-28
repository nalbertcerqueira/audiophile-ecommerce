import { PropsWithChildren } from "react"
import { Header } from "@/components/shared/layouts/Header"
import "./styles.scss"

export function AuthLayoutContainer({ children }: PropsWithChildren) {
    return (
        <>
            <Header className="header--black" />
            <div className="auth-page-container">{children}</div>
        </>
    )
}
