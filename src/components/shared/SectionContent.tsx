import { ReactNode } from "react"

interface SectionContentProps {
    children: ReactNode
    className?: string
}

export function SectionContent({ children, className }: SectionContentProps) {
    return (
        <section className={`section-content ${className || ""}`.trim()}>{children}</section>
    )
}
