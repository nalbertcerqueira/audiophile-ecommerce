import { ReactNode } from "react"
import Link from "next/link"

interface NavLinkProps {
    children: ReactNode
    path: string
    withMarker?: boolean
}

export function NavLink({ path, withMarker, children }: NavLinkProps) {
    return (
        <Link className="nav-link" href={path}>
            {children}
            {withMarker && <span className="nav-link__marker" />}
        </Link>
    )
}
