import { AccountPanel } from "./components/AccountPanel"
import { BackButton } from "../shared/buttons/BackButton"

export function AccountPageComponent() {
    return (
        <div className="account-page-container">
            <div className="utils-wrapper">
                <div className="utils-wrapper__inner">
                    <BackButton />
                </div>
            </div>
            <AccountPanel />
        </div>
    )
}
