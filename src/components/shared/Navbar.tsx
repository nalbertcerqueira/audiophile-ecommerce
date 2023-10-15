"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
    const links: string[] = ["home", "headphones", "speakers", "earphones"]

    const pathname = usePathname()

    function shouldRenderMarker(link: string): boolean {
        if (pathname === "/" && link === "home") {
            return true
        }
        return !!pathname.match(link)
    }

    return (
        <nav className="navbar">
            <ul className="navbar__link-list">
                {links.map((link) => (
                    <li key={link}>
                        <Link
                            className="navbar__link"
                            href={`/${link === "home" ? "" : link}`}
                        >
                            {link.toUpperCase()}
                            {shouldRenderMarker(link) && <span className="navbar__marker" />}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
