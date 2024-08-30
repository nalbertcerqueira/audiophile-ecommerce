"use client"

import { ReactNode, useContext } from "react"
import { TabContext } from "../contexts/TabContext"

interface TabButtonProps {
    href: string
    tabId: string
    selected: boolean
    children: ReactNode
}

export function TabButton({ children, selected, tabId }: TabButtonProps) {
    const { updateTab } = useContext(TabContext)
    const className = `tab ${selected ? "tab--selected" : ""}`

    return (
        <button
            className={className}
            onClick={() => updateTab(tabId)}
            type="button"
            role="link"
        >
            {children}
        </button>
    )
}
