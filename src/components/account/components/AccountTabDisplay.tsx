"use client"

import { TabLoader } from "./tabSections/tabLoader/TabLoader"
import { TabContext } from "../contexts/TabContext"
import { TabNotFound } from "./tabSections/notFound/TabNotFound"
import { ProfileSection } from "./tabSections/profile/ProfileSection"
import { useContext } from "react"

export function AccountTabDisplay() {
    const { currentTab } = useContext(TabContext)

    function renderTabContent() {
        switch (currentTab) {
            case "profile":
                return <ProfileSection />
            case "loading":
                return <TabLoader />
            default:
                return <TabNotFound />
        }
    }

    return <div>{renderTabContent()}</div>
}
