/* eslint-disable @next/next/no-img-element */
"use client"

import GenericProfileImage from "/public/imgs/profile.jpg"
import { SessionContext } from "@/contexts/SessionContext"
import { useContext } from "react"
import Link from "next/link"

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
    const { user, isLoading, isLogged, logout, getFirstName } = useContext(SessionContext)
    const profileImage = user?.type !== "guest" ? user?.images.profile : null
    const firstName = getFirstName()

    function renderUserActions() {
        return (
            <div>
                <span className="user-actions__name">Hi, {firstName}</span>
                <div className="user-actions__wrapper">
                    <Link className="user-actions__action" href="/">
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
        <div className={`user-actions ${isLoading ? "user-actions--hidden" : ""}`.trim()}>
            <AvatarCircle
                alt={isLogged && firstName ? `${firstName}'s profile image` : ""}
                avatarUrl={profileImage}
            />
            {isLogged ? renderUserActions() : renderAuthActions()}
        </div>
    )
}
