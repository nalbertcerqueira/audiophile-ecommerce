import { ToastContainer } from "react-toastify"
import { AppProvider } from "@/contexts"
import { CartModal } from "@/components/shared/cart/CartModal"
import { Footer } from "./components/Footer"
import { PropsWithChildren } from "react"
import "react-toastify/dist/ReactToastify.css"
import "./styles.scss"

export function HomeContainer({ children }: PropsWithChildren) {
    return (
        <body>
            <div className="app-container">
                <AppProvider>
                    {children}
                    <Footer />
                    <CartModal />
                </AppProvider>
                <ToastContainer draggable={false} />
            </div>
        </body>
    )
}
