import { AboutSection } from "@/components/shared/AboutSection"
import { CategorySection } from "@/components/shared/CategorySection"
import { Header } from "@/components/shared/Header"
import { ReactNode } from "react"
import "./styles.scss"

export function CategoryContainer({ children }: { children: ReactNode }) {
    return (
        <>
            <Header className="header--black" />
            {children}
            <CategorySection className="category-page-categories" />
            <AboutSection className="category-page-about-us" />
        </>
    )
}
