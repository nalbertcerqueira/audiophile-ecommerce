/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import GenricProfileImage from "/public/imgs/profile.jpg"

interface UserActionsProps {
    isLogged: boolean
    name?: string
    className?: string
    avatarUrl?: string | null
}

export function UserActions({ name, className, avatarUrl, isLogged }: UserActionsProps) {
    function logout() {
        localStorage.removeItem("accessToken")
        signOut({ callbackUrl: "/" })
    }

    function renderUserActions() {
        return (
            <div>
                <span className="user-actions__name">Hi, {name}</span>
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
                        Login
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
        <div className={`user-actions ${className || ""}`.trim()}>
            <div className="user-actions__avatar" aria-hidden="true">
                <img
                    alt=""
                    src={avatarUrl || GenricProfileImage.src}
                    className="user-actions__avatar-img"
                />
            </div>
            {isLogged ? renderUserActions() : renderAuthActions()}
        </div>
    )
}
