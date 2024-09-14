import { Header } from "@/components/shared/layouts/Header"
import { ReactNode } from "react"

export default function AccountLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            {children}
        </>
    )
}
