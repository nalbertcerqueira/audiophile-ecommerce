import { AriaAttributes } from "react"

interface CounterProps {
    disabled?: boolean
    className?: string
    count: number
    ariaLive?: AriaAttributes["aria-live"]
    increment: () => void
    decrement: () => void
}

export function Counter(props: CounterProps) {
    const { className, count, disabled, ariaLive, increment, decrement } = props

    return (
        <div
            className={`counter ${className || ""} ${
                disabled ? "counter--disabled" : ""
            }`.trim()}
        >
            <button
                aria-disabled={disabled}
                disabled={disabled}
                onClick={decrement}
                className="counter__action-btn"
                type="button"
                aria-controls="counter-display"
                aria-label="decrement quantity"
            >
                -
            </button>
            <p
                aria-live={ariaLive || "polite"}
                id="counter-display"
                className="counter__display"
            >
                {count}
            </p>
            <button
                aria-disabled={disabled}
                disabled={disabled}
                onClick={increment}
                className="counter__action-btn"
                type="button"
                aria-controls="counter-display"
                aria-label="increment quantity"
            >
                +
            </button>
        </div>
    )
}
