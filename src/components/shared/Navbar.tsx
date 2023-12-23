import { NavLink } from "./NavLink"

export function Navbar() {
    const paths: string[] = ["/home", "/headphones", "/speakers", "/earphones"]

    return (
        <nav className="navbar">
            <ul className="navbar__link-list">
                {paths.map((path) => (
                    <li key={path}>
                        <NavLink path={`${path === "/home" ? "/" : path}`}>
                            {path.slice(1).toUpperCase()}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
