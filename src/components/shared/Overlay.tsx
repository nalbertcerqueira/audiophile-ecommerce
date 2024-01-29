import { ReactNode } from "react"

interface OverlayProps {
    isHidden: boolean
    children: ReactNode
    className?: string
}

export function Overlay({ isHidden, className, children }: OverlayProps) {
    return (
        <div
            className={`${className || ""} overlay ${isHidden ? "overlay--hidden" : ""}`.trim()}
        >
            <div className={"overlay__inner"}>{children}</div>
        </div>
    )
}
