"use client"

import { matchUrlPathname } from "@/utils/helpers"
import { pathnames } from "@/utils/variables"
import { NavLink } from "@/components/shared/NavLink"
import { usePathname } from "next/navigation"

export function FooterNavLinks() {
    const currentPathname = usePathname()

    return (
        <ul className="footer__nav-links">
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
    )
}
