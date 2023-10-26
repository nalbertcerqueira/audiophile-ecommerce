interface CounterProps {
    className?: string
    count: number
    increment: () => void
    decrement: () => void
}

export function Counter({ className, count, increment, decrement }: CounterProps) {
    return (
        <div className={`counter ${className || ""}`.trim()}>
            <button
                onClick={decrement}
                className="counter__action-btn"
                type="button"
                aria-label="decrement count"
            >
                -
            </button>
            <p className="counter__display">{count}</p>
            <button
                onClick={increment}
                className="counter__action-btn"
                type="button"
                aria-label="increment count"
            >
                +
            </button>
        </div>
    )
}
