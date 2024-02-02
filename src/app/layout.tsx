import { PropsWithChildren } from "react"
import { HomeContainer } from "@/layouts/home"
import "@/scss/index.scss"

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en-us">
            <head>
                <title>Audiophile Ecommerce</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <HomeContainer>{children}</HomeContainer>
        </html>
    )
}
