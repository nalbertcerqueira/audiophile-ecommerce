import { RingLoader } from "@/components/shared/loaders/RingLoader"
import { FormEvent, ReactNode } from "react"

interface AuthFormProps {
    children: ReactNode
    isSubmitting: boolean
    submitBtn: ReactNode
    ariaLabel?: string
    submitHandler: (e: FormEvent<HTMLFormElement>) => void
}

export function AuthForm(props: AuthFormProps) {
    const { children, isSubmitting, submitBtn, ariaLabel, submitHandler } = props

    return (
        <form aria-label={ariaLabel} onSubmit={submitHandler} className="auth-form">
            <div className="auth-form__input-wrapper">{children}</div>
            <button
                aria-disabled={isSubmitting}
                disabled={isSubmitting}
                className="btn btn--primary auth-form__submit-btn"
                type="submit"
            >
                {submitBtn}
                {isSubmitting && (
                    <div className="btn-overlay">
                        <RingLoader />
                    </div>
                )}
            </button>
        </form>
    )
}
