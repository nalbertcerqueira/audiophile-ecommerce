"use client"

import { useState } from "react"

export function Counter({ className }: { className?: string }) {
    const [count, setCount] = useState<number>(0)

    return (
        <div className={`counter ${className || ""}`.trim()}>
            <button
                onClick={() =>
                    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
                }
                className="counter__action-btn"
                type="button"
                aria-label="decrement count"
            >
                -
            </button>
            <p className="counter__display">{count}</p>
            <button
                onClick={() => setCount((prevCount) => prevCount + 1)}
                className="counter__action-btn"
                type="button"
                aria-label="increment count"
            >
                +
            </button>
        </div>
    )
}
