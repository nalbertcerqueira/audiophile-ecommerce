import { PropsWithChildren } from "react"
import { HomeContainer } from "@/layouts/home"
import "@/scss/1-base/base.scss"

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en-us">
            <head>
                <title>Audiophile Ecommerce</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <HomeContainer>{children}</HomeContainer>
        </html>
    )
}
