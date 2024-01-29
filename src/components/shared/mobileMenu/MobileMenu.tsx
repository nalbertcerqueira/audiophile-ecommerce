import { SessionContext } from "@/contexts/SessionContext"
import { MobileMenuItem } from "./MobileMenuItem"
import { AvatarCircle } from "../UserActions"
import { categories } from "@/utils/variable"
import { SignupIcon } from "../icons/SignupIcon"
import { SinginIcon } from "../icons/SigninIcon"
import { useContext } from "react"
import Link from "next/link"
import { AccountIcon } from "../icons/AccountIcon"
import { LogoutIcon } from "../icons/LogoutIcon"

export function MobileMenu({ isOpen }: { isOpen: boolean }) {
    const { isLoading, isLogged, user, logout, getFirstName } = useContext(SessionContext)
    const profileImage = user?.type !== "guest" ? user?.images.profile : null
    const firstName = getFirstName()

    function renderAuthActions() {
        return (
            <div>
                <h4 className="mobile-menu__title">Hi,Login to your account!</h4>
                <div className="mobile-menu__links">
                    <Link className="mobile-menu__user-link" href="/signin">
                        <SinginIcon className="mobile-menu__auth-icon" />
                        Login
                    </Link>
                    <Link className="mobile-menu__user-link" href="/signup">
                        <SignupIcon className="mobile-menu__auth-icon" />
                        Singup
                    </Link>
                </div>
            </div>
        )
    }

    function renderUserActions() {
        return (
            <div>
                <h4 className="mobile-menu__title">Hi,{firstName}!</h4>
                <div className="mobile-menu__links">
                    <Link
                        role="button"
                        className="btn btn--primary btn--super-thin btn--rounded"
                        href="/"
                    >
                        <AccountIcon className="mobile-menu__user-icon" />
                        Account
                    </Link>
                    <button
                        onClick={() => logout()}
                        type="button"
                        className="btn btn--empty btn--super-thin btn--rounded"
                    >
                        <LogoutIcon className="mobile-menu__user-icon" />
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`mobile-menu ${!isOpen ? "mobile-menu--hidden" : ""}`.trim()}>
            <div className="mobile-menu__user-actions">
                <AvatarCircle avatarUrl={profileImage} className="avatar-circle--mobile" />
                {isLoading ? null : isLogged ? renderUserActions() : renderAuthActions()}
            </div>
            <span className="mobile-menu__separator" />
            <div className="mobile-menu__categories">
                {categories.map(({ name, link, thumb, thumbAlt }, i) => (
                    <MobileMenuItem
                        key={i}
                        link={link}
                        thumb={thumb}
                        name={name}
                        thumbAlt={thumbAlt}
                    />
                ))}
            </div>
        </div>
    )
}
