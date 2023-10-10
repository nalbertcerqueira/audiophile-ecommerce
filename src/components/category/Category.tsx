"use client"

import { Header } from "@/components/shared/Header"
import { TitleSection } from "./components/TitleSection"
import { usePathname } from "next/navigation"
import { PreviewSection } from "./components/PreviewSection"
import "./styles.scss"

export default function Category() {
    const allowedCategories = ["headphones", "speakers", "earphones"]
    const pathname = decodeURI(usePathname().slice(1))

    return (
        <>
            <div className="header-title-wrapper">
                <Header className="header--black" />
                {allowedCategories.includes(pathname) ? (
                    <TitleSection title={pathname.toUpperCase()} />
                ) : null}
            </div>
            <PreviewSection />
        </>
    )
}
