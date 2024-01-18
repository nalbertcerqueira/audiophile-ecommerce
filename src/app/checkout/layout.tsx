import { Header } from "@/components/shared/layouts/Header"
import { PropsWithChildren } from "react"

export default function CheckoutLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            {children}
        </>
    )
}
