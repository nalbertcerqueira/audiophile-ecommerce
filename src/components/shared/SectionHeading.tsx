import { PropsWithChildren } from "react"

export function SectionHeading({ children }: PropsWithChildren) {
    return (
        <div className="section-heading">
            <h1 className="section-heading__title">{children}</h1>
        </div>
    )
}
