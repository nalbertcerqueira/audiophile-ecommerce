"use client"

import { tabList } from "../helpers/variables"
import { TabContext } from "../contexts/TabContext"
import { TabButton } from "./TabButton"
import { useContext } from "react"
import "../styles.scss"
import { LogoutIcon } from "@/components/shared/icons/LogoutIcon"
import { SessionContext } from "@/contexts/sessionContext/SessionContext"

export function AccountSideMenu() {
    const { currentTab } = useContext(TabContext)
    const { logout } = useContext(SessionContext)

    return (
        <div className="account-menu">
            <ul>
                {tabList.map((tab) => (
                    <li key={tab.id}>
                        <TabButton
                            tabId={tab.id}
                            selected={currentTab === tab.id}
                            href={`/account?tab=${tab.id}`}
                        >
                            {tab.icon({ className: "tab__icon" })}
                            <span>{tab.name}</span>
                        </TabButton>
                    </li>
                ))}
            </ul>
            <button onClick={() => logout()} type="button" className="tab-logout">
                <LogoutIcon className="tab-logout__icon" />
                Logout
            </button>
        </div>
    )
}
