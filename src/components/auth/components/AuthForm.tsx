import { FormEvent, ReactNode } from "react"

interface AuthFormProps {
    children: ReactNode
    isSubmitting: boolean
    submitBtn: ReactNode
    submitHandler: (e: FormEvent<HTMLFormElement>) => void
}

export function AuthForm({ children, isSubmitting, submitBtn, submitHandler }: AuthFormProps) {
    return (
        <form onSubmit={submitHandler} className="auth-form">
            <div className="auth-form__input-wrapper">{children}</div>
            <button
                disabled={isSubmitting}
                className="btn btn--primary auth-form__submit-btn"
                type="submit"
            >
                {submitBtn}
            </button>
        </form>
    )
}
