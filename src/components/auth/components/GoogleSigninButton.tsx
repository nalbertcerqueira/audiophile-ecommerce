import { GoogleIcon } from "@/components/shared/icons/GoogleIcon"
import { MouseEventHandler, ReactNode } from "react"

interface GoogleSigninButtonProps {
    isSubmitting: boolean
    children: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function GoogleSigninButton(props: GoogleSigninButtonProps) {
    const { isSubmitting, children, onClick } = props
    return (
        <button
            onClick={onClick}
            disabled={isSubmitting}
            className="btn third-party-btn third-party-btn--google"
            type="button"
        >
            <GoogleIcon className="third-party-btn__icon" />
            {children}
        </button>
    )
}
