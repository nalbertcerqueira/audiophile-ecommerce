import { AboutSection } from "@/components/shared/layouts/AboutSection"
import { CategorySection } from "@/components/shared/layouts/CategorySection"
import { Header } from "@/components/shared/layouts/Header"
import { ReactNode } from "react"
import "./styles.scss"

export function SharedLayoutComponent({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            {children}
            <CategorySection className="shared-layout__categories" />
            <AboutSection className="shared-layout__about-us" />
        </>
    )
}
