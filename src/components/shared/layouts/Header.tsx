import { HomepageLink } from "../HomepageLink"
import { CartButton } from "../buttons/CartButton"
import { Navbar } from "../Navbar"
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
                <HomepageLink />
                <Navbar />
                <div className="header__btn-wrapper">
                    <UserActions />
                    <CartButton />
                </div>
            </div>
        </header>
    )
}
