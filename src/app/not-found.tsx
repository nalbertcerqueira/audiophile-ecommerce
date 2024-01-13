import { Header } from "@/components/shared/layouts/Header"
import Link from "next/link"

export default function NotFoundPage() {
    return (
        <>
            <div className="header-bg--black">
                <Header />
            </div>
            <div className="not-found">
                <h1 className="not-found__title">
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </h1>
                <p className="not-found__text">
                    <span>
                        Sorry, we couldn&apos;t find what you&apos;re looking for. But you can
                        find plenty of other things on our
                    </span>{" "}
                    <Link className="not-found__homepage-link" href="/">
                        homepage
                    </Link>
                    <span>.</span>
                </p>
            </div>
        </>
    )
}
