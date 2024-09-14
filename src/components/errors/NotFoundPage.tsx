import { Header } from "../shared/layouts/Header"
import { NotFoundContent } from "./components/NotFoundContent"
import "./styles.scss"

export function NotFoundPage() {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            <NotFoundContent />
        </>
    )
}
