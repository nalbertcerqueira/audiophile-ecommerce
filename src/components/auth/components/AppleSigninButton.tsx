import { AppleIcon } from "@/components/shared/icons/AppleIcon"
import { ReactNode } from "react"

interface AppleSigninButtonProps {
    isSubmitting: boolean
    children: ReactNode
}

export function AppleSigninButton({ isSubmitting, children }: AppleSigninButtonProps) {
    return (
        <button
            disabled={isSubmitting}
            className="btn third-party-btn third-party-btn--apple"
            type="button"
        >
            <AppleIcon className="third-party-btn__icon" />
            {children}
        </button>
    )
}
