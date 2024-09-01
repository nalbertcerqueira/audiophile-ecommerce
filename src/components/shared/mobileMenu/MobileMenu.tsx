"use client"

import { selectUserProfile, selectUserStatus } from "@/store/user/userSlice"
import { MobileUserActions } from "./MobileUserActions"
import { MobileAuthActions } from "./MobileAuthActions"
import { MobileMenuItem } from "./MobileMenuItem"
import { SessionContext } from "@/contexts/sessionContext/SessionContext"
import { useAppSelector } from "@/libs/redux/hooks"
import { AvatarCircle } from "../UserActions"
import { toCapitalized } from "@/utils/helpers"
import { categories } from "@/utils/variables"
import { useContext } from "react"

export function MobileMenu({ isOpen }: { isOpen: boolean }) {
    const { logout } = useContext(SessionContext)
    const isLogged = useAppSelector((state) => state.user.isLogged)
    const isLoading = useAppSelector(selectUserStatus) === "loading"

    const profile = useAppSelector(selectUserProfile)
    const firstName = profile?.type !== "guest" ? toCapitalized(profile.firstName) : undefined
    const profileImage = profile.type !== "guest" ? profile.profileImg : null

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
