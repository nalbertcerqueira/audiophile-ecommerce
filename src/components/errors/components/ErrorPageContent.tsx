import { ReactNode } from "react"

interface ErrorPageContentProps {
    children: ReactNode
    title: ReactNode
    className?: string
}

export function ErrorPageContent({ className, children, title }: ErrorPageContentProps) {
    return (
        <div className={`error-page-content ${className || ""}`.trim()}>
            <div className="error-page-content__inner">
                <h1 className="error-page-content__title">{title}</h1>
                <p className="error-page-content__text">{children}</p>
            </div>
        </div>
    )
}
