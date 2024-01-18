import { Header } from "../shared/layouts/Header"
import { HeroSection } from "./components/HeroSection"
import { CategorySection } from "../shared/layouts/CategorySection"
import { ProductGridSection } from "./components/ProductGridSection"
import { AboutSection } from "../shared/layouts/AboutSection"
import "./styles.scss"

export function HomePageComponent() {
    return (
        <>
            <div className="header-hero-wrapper">
                <Header />
                <HeroSection />
            </div>
            <CategorySection className="homepage-categories" />
            <ProductGridSection />
            <AboutSection className="homepage-about-us" />
        </>
    )
}
