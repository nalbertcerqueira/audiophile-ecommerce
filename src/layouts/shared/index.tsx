import { AboutSection } from "@/components/shared/layouts/AboutSection"
import { CategorySection } from "@/components/shared/layouts/CategorySection"
import { Header } from "@/components/shared/layouts/Header"
import { ReactNode } from "react"
import "./styles.scss"

export function SharedLayoutComponent({ children }: { children: ReactNode }) {
    return (
        <>
            <Header className="header--black" />
            {children}
            <CategorySection className="shared-categories" />
            <AboutSection className="shared-about-us" />
        </>
    )
}
