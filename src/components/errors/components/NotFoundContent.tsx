import { ErrorPageContent } from "./ErrorPageContent"
import Link from "next/link"

export function NotFoundContent({ className }: { className?: string }) {
    return (
        <ErrorPageContent title="404" className={className}>
            Sorry, we couldn&apos;t find what you&apos;re looking for. But you can find plenty
            of other things on our <Link href="/">homepage</Link>.
        </ErrorPageContent>
    )
}
