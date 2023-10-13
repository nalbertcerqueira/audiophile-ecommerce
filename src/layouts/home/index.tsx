import { Footer } from "./components/Footer"
import { PropsWithChildren } from "react"
import { CartModalProvider } from "@/contexts/CartModalContext"
import { Overlay } from "@/components/shared/Overlay"
import "@/scss/index.scss"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <CartModalProvider>
                    {children}
                    <Overlay />
                </CartModalProvider>
                <Footer />
            </div>
        </body>
    )
}
