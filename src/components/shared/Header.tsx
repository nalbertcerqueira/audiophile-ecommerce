import { AudiophileLogo } from "./Logo"
import { CartIcon } from "./icons/CartIcon"
import { Navbar } from "./Navbar"
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
                <button className="header__cart-btn" type="button" aria-label="show cart">
                    <CartIcon />
                </button>
            </div>
            <span className="header__division"></span>
        </header>
    )
}
