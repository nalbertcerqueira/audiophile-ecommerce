import { AboutSection } from "@/components/shared/layouts/AboutSection"
import { CategorySection } from "@/components/shared/layouts/CategorySection"
import { ReactNode } from "react"
import "./styles.scss"

export function SharedLayoutComponent({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <CategorySection className="shared-categories" />
            <AboutSection className="shared-about-us" />
        </>
    )
}
