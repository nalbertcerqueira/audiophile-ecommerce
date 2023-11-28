import { GoogleIcon } from "@/components/shared/icons/GoogleIcon"
import { ReactNode } from "react"

interface GoogleLoginButtonProps {
    isSubmitting: boolean
    children: ReactNode
}

export function GoogleLoginButton({ isSubmitting, children }: GoogleLoginButtonProps) {
    return (
        <button disabled={isSubmitting} className="btn google-btn" type="button">
            <GoogleIcon className="google-btn__icon" />
            {children}
        </button>
    )
}
