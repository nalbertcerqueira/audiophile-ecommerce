/* eslint-disable @next/next/no-img-element */
"use client"

import { useContext } from "react"
import { toCapitalized } from "@/utils/helpers"
import { useAppSelector } from "@/libs/redux/hooks"
import { SessionContext } from "@/contexts/sessionContext/SessionContext"
import { selectUserProfile } from "@/store/user/userSlice"

import Link from "next/link"
import GenericProfileImage from "/public/imgs/profile.jpg"

interface AvatarCircleProps {
    className?: string
    avatarUrl?: string | null
    alt?: string
}

export function AvatarCircle({ avatarUrl, alt, className }: AvatarCircleProps) {
    return (
        <div className={`avatar-circle ${className || ""}`.trim()}>
            <img
                alt={alt}
                src={avatarUrl || GenericProfileImage.src}
                className="avatar-circle__img"
            />
        </div>
    )
}

export function UserActions() {
    const { logout } = useContext(SessionContext)
    const isLogged = useAppSelector((state) => state.user.isLogged)
    const profile = useAppSelector(selectUserProfile)
    const firstName = profile?.type !== "guest" ? toCapitalized(profile.firstName) : null
    const profileImage = profile.type !== "guest" ? profile.profileImg : null

    function renderUserActions() {
        return (
            <div>
                <p className="user-actions__name">Hi, {firstName}</p>
                <div className="user-actions__wrapper">
                    <Link className="user-actions__action" href="/account">
                        Account
                    </Link>
                    <span>|</span>
                    <button type="button" onClick={logout} className="user-actions__action">
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    function renderAuthActions() {
        return (
            <div className="user-actions__auth">
                <div>
                    <Link className="user-actions__auth-link" href="/signin">
                        Signin
                    </Link>
                    <span> or</span>
                </div>
                <Link className="user-actions__auth-link" href="/signup">
                    Signup here
                </Link>
            </div>
        )
    }

    return (
        <div className="user-actions">
            <AvatarCircle
                alt={isLogged && firstName ? `${firstName}'s profile image` : ""}
                avatarUrl={profileImage}
            />
            {isLogged ? renderUserActions() : renderAuthActions()}
        </div>
    )
}
