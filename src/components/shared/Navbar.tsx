"use client"

import { matchUrlPathname } from "@/utils/helpers"
import { pathnames } from "@/utils/variables"
import { NavLink } from "./NavLink"
import { usePathname } from "next/navigation"

export function Navbar() {
    const currentPathname = usePathname()

    return (
        <nav className="navbar">
            <ul className="navbar__link-list">
                {pathnames.map((path) => (
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
