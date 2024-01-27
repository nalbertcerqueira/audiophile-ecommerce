"use client"

import { usePathname } from "next/navigation"
import { NavLink } from "./NavLink"
import { matchUrlPathname } from "@/utils/helpers"

export function Navbar() {
    const currentPathname = usePathname()
    const paths: string[] = ["/home", "/headphones", "/speakers", "/earphones"]

    return (
        <nav className="navbar">
            <ul className="navbar__link-list">
                {paths.map((path) => (
                    <li key={path}>
                        <NavLink
                            withMarker={matchUrlPathname(currentPathname, path.slice(1))}
                            path={`${path === "/home" ? "/" : path}`}
                        >
                            {path.slice(1).toUpperCase()}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
