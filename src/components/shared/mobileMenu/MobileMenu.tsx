"use client"

import { MobileUserActions } from "./MobileUserActions"
import { MobileAuthActions } from "./MobileAuthActions"
import { MobileMenuItem } from "./MobileMenuItem"
import { SessionContext } from "@/contexts/SessionContext"
import { AvatarCircle } from "../UserActions"
import { categories } from "@/utils/variables"
import { useContext } from "react"

export function MobileMenu({ isOpen }: { isOpen: boolean }) {
    const { isLoading, isLogged, user, logout, getFirstName } = useContext(SessionContext)
    const profileImage = user?.type !== "guest" ? user?.images.profile : null
    const firstName = getFirstName()

    return (
        <div
            id="mobile-menu"
            aria-hidden={isOpen ? "false" : "true"}
            className={`mobile-menu ${!isOpen ? "mobile-menu--hidden" : ""}`.trim()}
        >
            {isOpen && (
                <span className="screen-reader" aria-live="assertive">
                    navigation menu is open
                </span>
            )}
            <div className="mobile-menu__user-actions">
                <AvatarCircle
                    alt={isLogged && firstName ? `${firstName}'s profile image` : ""}
                    avatarUrl={profileImage}
                    className="avatar-circle--mobile"
                />
                {isLoading ? null : isLogged ? (
                    <MobileUserActions username={firstName} logout={logout} />
                ) : (
                    <MobileAuthActions />
                )}
            </div>
            <span className="mobile-menu__separator" />
            <nav>
                <ul className="mobile-menu__categories">
                    {categories.map(({ name, link, thumb }, i) => (
                        <li key={i}>
                            <MobileMenuItem link={link} thumb={thumb} name={name} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
