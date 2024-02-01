import { SinginIcon } from "../icons/SigninIcon"
import { SignupIcon } from "../icons/SignupIcon"
import Link from "next/link"

export function MobileAuthActions() {
    return (
        <div>
            <h4 className="mobile-menu__title">Hi, Signin to your account!</h4>
            <div className="mobile-menu__links">
                <Link
                    aria-label="signin here"
                    className="mobile-menu__user-link"
                    href="/signin"
                >
                    <SinginIcon className="mobile-menu__auth-icon" />
                    Login
                </Link>
                <Link
                    aria-label="signup here"
                    className="mobile-menu__user-link"
                    href="/signup"
                >
                    <SignupIcon className="mobile-menu__auth-icon" />
                    Singup
                </Link>
            </div>
        </div>
    )
}
