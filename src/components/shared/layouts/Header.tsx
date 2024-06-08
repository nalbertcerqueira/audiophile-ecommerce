import { HomepageLink } from "../HomepageLink"
import { CartButton } from "../buttons/CartButton"
import { Navbar } from "../Navbar"
import { UserActions } from "../UserActions"
import { MobileMenuButton } from "../buttons/MenuButton"

export function Header() {
    return (
        <header className="header">
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
