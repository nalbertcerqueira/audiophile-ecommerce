import { AudiophileLogo } from "../Logo"
import { CartButton } from "../buttons/CartButton"
import { Navbar } from "../Navbar"
import Link from "next/link"

interface HeaderProps {
    className?: string
}

export function Header({ className }: HeaderProps) {
    return (
        <header className={`header ${className || ""}`.trim()}>
            <div className="header__inner-container">
                <Link className="header__home-link" aria-label="Audiophile homepage" href="/">
                    <AudiophileLogo />
                </Link>
                <Navbar />
                <div className="header__btn-wrapper">
                    <CartButton />
                </div>
            </div>
        </header>
    )
}
