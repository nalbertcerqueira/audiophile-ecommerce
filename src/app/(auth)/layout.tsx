import { AuthLayoutContainer } from "@/layouts/auth"
import { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
    return <AuthLayoutContainer>{children}</AuthLayoutContainer>
}
