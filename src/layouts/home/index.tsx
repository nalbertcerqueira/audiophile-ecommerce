import { Footer } from "./components/Footer"
import { PropsWithChildren } from "react"
import "@/scss/index.scss"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                {children}
                <Footer />
            </div>
        </body>
    )
}
