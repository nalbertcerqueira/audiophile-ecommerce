import { MouseEventHandler, ReactNode } from "react"

interface SocialSigninButtonProps {
    provider: "google" | "github"
    isSubmitting: boolean
    children: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function SocialSigninButton(props: SocialSigninButtonProps) {
    const { isSubmitting, children, provider, onClick } = props

    return (
        <button
            onClick={onClick}
            disabled={isSubmitting}
            className={`btn third-party-btn third-party-btn--${provider}`.trim()}
            type="button"
        >
            {children}
        </button>
    )
}
