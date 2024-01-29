import { AudiophileLogo } from "../Logo"
import { CartButton } from "../buttons/CartButton"
import { Navbar } from "../Navbar"
import Link from "next/link"
import { UserActions } from "../UserActions"
import { MobileMenuButton } from "../buttons/MenuButton"

interface HeaderProps {
    className?: string
}

export function Header({ className }: HeaderProps) {
    return (
        <header className={`header ${className || ""}`.trim()}>
            <div className="header__inner-container">
                <MobileMenuButton />
                <Link aria-label="Audiophile homepage" href="/">
                    <AudiophileLogo />
                </Link>
                <Navbar />
                <div className="header__btn-wrapper">
                    <UserActions />
                    <CartButton />
                </div>
            </div>
        </header>
    )
}
