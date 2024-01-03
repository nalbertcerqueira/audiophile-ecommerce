import { GoogleIcon } from "@/components/shared/icons/GoogleIcon"
import { ReactNode } from "react"

interface GoogleSigninButtonProps {
    isSubmitting: boolean
    children: ReactNode
}

export function GoogleSigninButton({ isSubmitting, children }: GoogleSigninButtonProps) {
    return (
        <button
            disabled={isSubmitting}
            className="btn third-party-btn third-party-btn--google"
            type="button"
        >
            <GoogleIcon className="third-party-btn__icon" />
            {children}
        </button>
    )
}
