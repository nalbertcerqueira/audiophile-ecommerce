import { PageError } from "@/components/errors/components/PageError"
import "./styles.scss"

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
                <button
                    onClick={() => reset()}
                    type="button"
                    className="btn btn--primary btn--thin"
                >
                    TRY AGAIN
                </button>
            </div>
        </PageError>
    )
}
