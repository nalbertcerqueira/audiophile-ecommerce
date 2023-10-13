"use client"

import { usePathname } from "next/navigation"
import { allowedCategories } from "../constants"

export function TitleSection() {
    const pathname = decodeURI(usePathname().slice(1))

    if (!allowedCategories.includes(pathname)) {
        return null
    }

    return (
        <section className="title-section">
            <div className="title-section__inner-container">
                <h1 className="title-section__title">{pathname.toLocaleUpperCase()}</h1>
            </div>
        </section>
    )
}
