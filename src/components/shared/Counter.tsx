interface CounterProps {
    disabled?: boolean
    className?: string
    count: number
    increment: () => void
    decrement: () => void
}

export function Counter({ className, count, disabled, increment, decrement }: CounterProps) {
    return (
        <div
            className={`counter ${className || ""} ${
                disabled ? "counter--disabled" : ""
            }`.trim()}
        >
            <button
                disabled={disabled}
                onClick={decrement}
                className="counter__action-btn"
                type="button"
                aria-label="decrement count"
            >
                -
            </button>
            <p className="counter__display">{count}</p>
            <button
                disabled={disabled}
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
