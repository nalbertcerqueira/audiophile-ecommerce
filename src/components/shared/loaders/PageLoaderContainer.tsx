import { PropsWithChildren } from "react"

export function PageLoaderContainer({ children }: PropsWithChildren) {
    return <div className="page-loader-container">{children}</div>
}
