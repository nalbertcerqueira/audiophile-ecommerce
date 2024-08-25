import { PrimaryButton } from "@/components/shared/buttons/PrimaryButton"
import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { FormEvent, ReactNode } from "react"

interface AuthFormProps {
    children: ReactNode
    isSubmitting: boolean
    submitBtn: ReactNode
    ariaLabel?: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function AuthForm(props: AuthFormProps) {
    const { children, isSubmitting, submitBtn, ariaLabel, onSubmit } = props

    return (
        <form aria-label={ariaLabel} onSubmit={onSubmit} className="auth-form">
            <div className="auth-form__input-wrapper">{children}</div>
            <PrimaryButton
                type="submit"
                className=" auth-form__submit-btn"
                ariaDisabled={isSubmitting}
                disabled={isSubmitting}
            >
                {submitBtn}
                {isSubmitting && (
                    <div className="btn-overlay">
                        <RingLoader />
                    </div>
                )}
            </PrimaryButton>
        </form>
    )
}
