"use client"

import { useEffect } from "react"
import { ErrorBoundaryPage } from "@/components/errors/ErrorBoundaryPage"

interface ErrorPops {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorPops) {
    useEffect(() => console.error(error), [error])

    return <ErrorBoundaryPage reset={reset} />
}
