import { AboutSection } from "@/components/shared/AboutSection"
import { CategorySection } from "@/components/shared/CategorySection"
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
