"use client"

import { AudiophileLogo } from "../Logo"
import { toCapitalized } from "@/utils/helpers"
import { AuthContext } from "@/contexts/AuthContext"
import { CartButton } from "../buttons/CartButton"
import { Navbar } from "../Navbar"
import { useContext } from "react"
import Link from "next/link"
import { UserActions } from "../UserActions"

interface HeaderProps {
    className?: string
}

export function Header({ className }: HeaderProps) {
    const { user, isLoading, isLogged } = useContext(AuthContext)
    const firstName = user?.name.split(" ")[0]

    return (
        <header className={`header ${className || ""}`.trim()}>
            <div className="header__inner-container">
                <Link className="header__home-link" aria-label="Audiophile homepage" href="/">
                    <AudiophileLogo />
                </Link>
                <Navbar />
                <div className="header__btn-wrapper">
                    <UserActions
                        name={toCapitalized(firstName)}
                        isLogged={isLogged}
                        className={isLoading ? "user-actions--hidden" : ""}
                    />
                    <CartButton />
                </div>
            </div>
        </header>
    )
}
