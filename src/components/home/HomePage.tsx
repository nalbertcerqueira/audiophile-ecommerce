import { Header } from "../shared/Header"
import { HeroSection } from "./components/HeroSection"
import { CategorySection } from "../shared/CategorySection"
import { ProductGridSection } from "./components/ProductGrid"
import { AboutSection } from "../shared/AboutSection"
import "./styles.scss"

export function Home() {
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
