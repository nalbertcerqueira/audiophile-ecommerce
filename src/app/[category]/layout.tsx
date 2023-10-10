import { CategoryContainer } from "@/layouts/category"
import { ReactNode } from "react"

export default function CategoryLayout({ children }: { children: ReactNode }) {
    return <CategoryContainer>{children}</CategoryContainer>
}
