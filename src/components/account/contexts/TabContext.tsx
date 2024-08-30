"use client"

import { usePathname } from "next/dist/client/components/navigation"
import { createContext, ReactNode, useEffect, useState } from "react"

interface TabContextProps {
    currentTab: string
    updateTab: (tag: string) => void
}

export const TabContext = createContext<TabContextProps>({} as TabContextProps)

export function TabProvider({ children }: { children: ReactNode }) {
    const [tab, setTab] = useState<string>("loading")
    const pathname = usePathname()

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        setTab(searchParams.get("tab") || "profile")
    }, [])

    function updateTab(tab: string): void {
        setTab(tab)
        window.history.replaceState({}, "", `${pathname}?tab=${tab || "profile"}`)
    }

    return (
        <TabContext.Provider value={{ currentTab: tab, updateTab }}>
            {children}
        </TabContext.Provider>
    )
}
