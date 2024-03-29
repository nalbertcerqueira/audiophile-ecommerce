export function LogoutIcon({ className }: { className: string }) {
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
                d="M16.3125 8.0625L20.25 12L16.3125 15.9375"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M9.75 12H20.25" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M9.75 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H9.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
