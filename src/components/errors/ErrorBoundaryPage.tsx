import { Header } from "../shared/layouts/Header"
import { PrimaryButton } from "../shared/buttons/PrimaryButton"
import { ErrorPageContent } from "./components/ErrorPageContent"
import "./styles.scss"

export function ErrorBoundaryPage({ reset }: { reset: () => void }) {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            <ErrorPageContent
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
            </ErrorPageContent>
        </>
    )
}
