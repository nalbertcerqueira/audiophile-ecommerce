import { AccountIcon } from "../icons/AccountIcon"
import { LogoutIcon } from "../icons/LogoutIcon"
import Link from "next/link"

interface MobileUserActionProps {
    username: string | null
    logout: () => void
}

export function MobileUserActions({ username, logout }: MobileUserActionProps) {
    return (
        <div>
            <h4 className="mobile-menu__title">Hi, {username}!</h4>
            <div className="mobile-menu__links">
                <Link className="btn btn--primary btn--super-thin btn--rounded" href="/">
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
