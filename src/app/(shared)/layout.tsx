import { SharedLayoutComponent } from "@/layouts/shared"
import { PropsWithChildren } from "react"

export default function SharedLayout({ children }: PropsWithChildren) {
    return <SharedLayoutComponent>{children}</SharedLayoutComponent>
}
