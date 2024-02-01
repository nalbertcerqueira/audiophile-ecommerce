export function CirclePattern({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            aria-hidden="true"
            focusable="false"
            width="944"
            height="944"
            viewBox="0 0 944 944"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g stroke="#FFF" fill="none" fillRule="evenodd" opacity="0.25">
                <circle cx="472" cy="472" r="235.5" />
                <circle cx="472" cy="472" r="270.5" />
                <circle cx="472" cy="472" r="471.5" />
            </g>
        </svg>
    )
}
