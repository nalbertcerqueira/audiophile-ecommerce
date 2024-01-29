export function SignupIcon({ className }: { className?: string }) {
    return (
        <svg
            width="64"
            height="64"
            className={className}
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#191C1F"
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18.75 12.75H23.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 10.5V15" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M10.125 15C13.2316 15 15.75 12.4816 15.75 9.375C15.75 6.2684 13.2316 3.75 10.125 3.75C7.0184 3.75 4.5 6.2684 4.5 9.375C4.5 12.4816 7.0184 15 10.125 15Z"
                strokeMiterlimit={10}
            />
            <path
                d="M2.0813 18.7501C3.06685 17.5755 4.29771 16.6309 5.68736 15.9829C7.07701 15.3348 8.59173 14.999 10.125 14.999C11.6584 14.999 13.1731 15.3348 14.5627 15.9829C15.9524 16.6309 17.1832 17.5755 18.1688 18.7501"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
