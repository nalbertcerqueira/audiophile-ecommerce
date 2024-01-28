import { Header } from "@/components/shared/layouts/Header"
import { ReactNode } from "react"

interface PageErrorProps {
    children: ReactNode
    title: ReactNode
    className?: string
}

export function PageError({ title, className, children }: PageErrorProps) {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            <div className={`page-error ${className}`}>
                <div className="page-error__inner-container">
                    <h1 className="page-error__title">{title}</h1>
                    <p className="page-error__text">{children}</p>
                </div>
            </div>
        </>
    )
}
