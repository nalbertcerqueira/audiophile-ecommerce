export function SummarySkeleton() {
    return (
        <div className="summary-skeleton">
            <div className="summary-skeleton__fields">
                <span className="summary-skeleton__field-loader" />
                <span className="summary-skeleton__field-loader" />
                <span className="summary-skeleton__field-loader" />
            </div>
            <span className="summary-skeleton__total-loader" />
        </div>
    )
}
