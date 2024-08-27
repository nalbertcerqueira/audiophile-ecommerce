import { PropsWithChildren } from "react"

export function SectionContent({ children }: PropsWithChildren) {
    return <section className="section-content">{children}</section>
}
