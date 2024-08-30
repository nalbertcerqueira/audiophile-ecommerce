import { ReactNode } from "react"

interface PageLoaderContainerProps {
    children: ReactNode
    className?: string
}

export function PageLoaderContainer({ children, className }: PageLoaderContainerProps) {
    return <div className={`page-loader-container ${className}`.trim()}>{children}</div>
}
