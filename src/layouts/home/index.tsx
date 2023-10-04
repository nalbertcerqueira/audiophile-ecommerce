import { PropsWithChildren } from "react"

export default function HomeLayout({ children }: PropsWithChildren) {
    return (
        <html lang="pt-br">
            <body>
                <div></div>
                {children}
            </body>
        </html>
    )
}
