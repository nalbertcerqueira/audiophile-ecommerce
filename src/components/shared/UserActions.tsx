import Image from "next/image"
import Link from "next/link"

interface UserActionsProps {
    isLogged: boolean
    name?: string
    className?: string
    avatarUrl?: string
}

export function UserActions({ name, className, avatarUrl, isLogged }: UserActionsProps) {
    function logout() {
        localStorage.removeItem("sessionToken")
        location.assign("/")
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
                    <Link className="user-actions__auth-link" href="/login">
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
            <div className="user-actions__avatar">
                <Image alt="" src={avatarUrl || ""} className="user-actions__avatar-img" />
            </div>
            {isLogged ? renderUserActions() : renderAuthActions()}
        </div>
    )
}
