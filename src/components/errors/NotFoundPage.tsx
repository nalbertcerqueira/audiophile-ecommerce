import { PageError } from "@/components/errors/components/PageError"
import Link from "next/link"
import "./styles.scss"

export function NotFoundPage() {
    return (
        <>
            <PageError title="404">
                Sorry, we couldn&apos;t find what you&apos;re looking for. But you can find
                plenty of other things on our <Link href="/">homepage</Link>.
            </PageError>
        </>
    )
}
