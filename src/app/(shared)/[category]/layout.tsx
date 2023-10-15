import { Header } from "@/components/shared/layouts/Header"
import { PropsWithChildren } from "react"

export default function CategoryLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header className="header--black" />
            {children}
        </>
    )
}
