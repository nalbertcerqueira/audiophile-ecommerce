"use client"

import { TitleSection } from "./components/TitleSection"
import { PreviewSection } from "./components/PreviewSection"
import { Header } from "../shared/Header"
import { Overlay } from "../shared/Overlay"
import { CartModalProvider } from "@/contexts/CartModalContext"
import "./styles.scss"

export default function Category() {
    return (
        <CartModalProvider>
            <Header className="header--black" />
            <TitleSection />
            <PreviewSection />
            <Overlay />
        </CartModalProvider>
    )
}
