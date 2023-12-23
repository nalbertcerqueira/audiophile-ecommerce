"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import Link from "next/link"

interface NavLinkProps {
    children: ReactNode
    path: string
}

export function NavLink({ path, children }: NavLinkProps) {
    const currentPathname = usePathname()

    function shouldRenderMarker(path: string): boolean {
        if (currentPathname === "/" && path === "/home") {
            return true
        }
        return currentPathname === path
    }

    return (
        <Link className="nav-link" href={path}>
            {children}
            {shouldRenderMarker(path) && <span className="nav-link__marker" />}
        </Link>
    )
}
