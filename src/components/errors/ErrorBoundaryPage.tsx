import { PageError } from "@/components/errors/components/PageError"
import "./styles.scss"
import { PrimaryButton } from "../shared/buttons/PrimaryButton"

export function ErrorBoundaryPage({ reset }: { reset: () => void }) {
    return (
        <PageError
            className="error-boundary"
            title={
                <span className="error-boundary__title">
                    Opps! Something unexpected happened
                </span>
            }
        >
            <span>
                {
                    "Sorry, we couldn't proceed with this operation, but you can try again or go back to our"
                }{" "}
                <a href="/">homepage</a>.
            </span>
            <div className="error-boundary__buttons">
                <PrimaryButton onClick={() => reset()} className="btn--thin">
                    TRY AGAIN
                </PrimaryButton>
            </div>
        </PageError>
    )
}
