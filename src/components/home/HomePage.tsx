import { Header } from "../shared/Header"
import { HeroSection } from "./components/HeroSection"
import { CategorySection } from "../shared/CategorySection"
import { ProductGridSection } from "./components/ProductGridSection"
import { AboutSection } from "../shared/AboutSection"
import "./styles.scss"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { Overlay } from "../shared/Overlay"

export function Home() {
    return (
        <div>
            <CartModalProvider>
                <div className="header-hero-wrapper">
                    <Header />
                    <HeroSection />
                </div>
                <CategorySection className="homepage-categories" />
                <ProductGridSection />
                <AboutSection className="homepage-about-us" />
                <Overlay />
            </CartModalProvider>
        </div>
    )
}
