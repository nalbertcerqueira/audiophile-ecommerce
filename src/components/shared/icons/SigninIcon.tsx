export function SinginIcon({ className }: { className?: string }) {
    return (
        <svg
            width="64"
            height="64"
            aria-hidden="true"
            focusable="false"
            className={className}
            stroke="#191C1F"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.8125 15.9375L12.75 12L8.8125 8.0625"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M2.25 12H12.75" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M12.75 3.75H18C18.1989 3.75 18.3897 3.82902 18.5303 3.96967C18.671 4.11032 18.75 4.30109 18.75 4.5V19.5C18.75 19.6989 18.671 19.8897 18.5303 20.0303C18.3897 20.171 18.1989 20.25 18 20.25H12.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
