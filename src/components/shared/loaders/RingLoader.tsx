export function RingLoader({ className }: { className?: string }) {
    return (
        <div className={`ring-loader ${className || ""}`.trim()}>
            <span className="ring-loader__slice" />
            <span className="ring-loader__slice" />
            <span className="ring-loader__slice" />
        </div>
    )
}
