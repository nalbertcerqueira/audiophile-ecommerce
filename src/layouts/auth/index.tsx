import { PropsWithChildren } from "react"
import { Header } from "@/components/shared/layouts/Header"
import "./styles.scss"

export function AuthLayoutContainer({ children }: PropsWithChildren) {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            <div className="auth-page-container">{children}</div>
        </>
    )
}
