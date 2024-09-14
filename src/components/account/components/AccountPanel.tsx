import { AccountSideMenu } from "./AccountSideMenu"
import { TabProvider } from "../contexts/TabContext"
import { AccountTabDisplay } from "./AccountTabDisplay"

export function AccountPanel() {
    return (
        <TabProvider>
            <section className="account-section">
                <div className="account-section__inner-container">
                    <AccountSideMenu />
                    <AccountTabDisplay />
                </div>
            </section>
        </TabProvider>
    )
}
