import Link from "next/link"

export function ProductLink({ href }: { href: string }) {
    return (
        <Link role="button" href={href} className="btn btn--primary preview__product-link">
            SEE PRODUCT
        </Link>
    )
}
