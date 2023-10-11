"use client"

import { useState } from "react"

export function Counter() {
    const [count, setCount] = useState<number>(0)

    return (
        <div className="counter">
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
            <span className="counter__display">{count}</span>
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
