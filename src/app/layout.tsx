import { Metadata } from "next"
import "@/scss/1-base/base.scss"
import HomeLayout from "@/layouts/home"

export const metadata: Metadata = {
    title: "Audiophile Ecommerce",
    icons: [{ rel: "icon", url: "vercel.svg", type: "image/svg+xml" }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <HomeLayout>{children}</HomeLayout>
}
