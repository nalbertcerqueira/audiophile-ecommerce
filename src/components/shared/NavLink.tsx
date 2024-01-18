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
        if (currentPathname === "/" && path === "/") return true
        if (!currentPathname) return false

        const isPathIncluded = currentPathname?.split("/").some((nestedPath) => {
            return nestedPath.length && nestedPath === path.slice(1)
        })

        return isPathIncluded
    }

    return (
        <Link className="nav-link" href={path}>
            {children}
            {shouldRenderMarker(path) && <span className="nav-link__marker" />}
        </Link>
    )
}
