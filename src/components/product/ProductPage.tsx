import { ProductSection } from "./components/ProductSection"
import { GallerySection } from "./components/GallerySection"
import { BackButton } from "../shared/BackButton"
import { RelatedProductsSection } from "./components/RelatedProductsSection"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { Overlay } from "../shared/Overlay"
import { Header } from "../shared/Header"
import "./styles.scss"

export function Product() {
    return (
        <CartModalProvider>
            <Header className="header--black" />
            <div className="utils-wrapper">
                <div className="utils-wrapper__inner">
                    <BackButton />
                </div>
            </div>
            <ProductSection />
            <GallerySection />
            <RelatedProductsSection />
            <Overlay />
        </CartModalProvider>
    )
}
