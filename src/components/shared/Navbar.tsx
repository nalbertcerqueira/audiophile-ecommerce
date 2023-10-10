import Link from "next/link"

export function Navbar() {
    const links: string[] = ["home", "headphones", "speakers", "earphones"]
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
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
