import { MouseEvent, ReactNode } from "react"

interface OverlayProps {
    isHidden: boolean
    children: ReactNode
    className?: string
    onClick: (e: MouseEvent<HTMLDivElement>) => void
}

export function Overlay({ isHidden, className, children, onClick }: OverlayProps) {
    return (
        <div
            onClick={onClick}
            className={`overlay ${isHidden ? "overlay--hidden" : ""}`.trim()}
        >
            <div className={`overlay__inner ${className || ""} `.trim()}>{children}</div>
        </div>
    )
}
