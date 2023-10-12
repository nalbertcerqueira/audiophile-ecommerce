"use client"

import { ArrowRightIcon } from "./icons/ArrowRightIcon"
import { useRouter } from "next/navigation"

export function BackButton() {
    const router = useRouter()

    return (
        <button className="back-button" onClick={() => router.back()} type="button">
            <ArrowRightIcon className="back-button__icon" />
            Go Back
        </button>
    )
}
