export function ClipMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect
        x="6"
        y="7"
        width="20"
        height="18"
        rx="2"
        className="stroke-accent"
        strokeWidth="1.7"
      />
      <circle cx="10" cy="11" r="1.15" className="fill-accent" />
      <circle cx="10" cy="21" r="1.15" className="fill-accent" />
      <circle cx="22" cy="11" r="1.15" className="fill-accent" />
      <circle cx="22" cy="21" r="1.15" className="fill-accent" />
      <path
        d="M13 16h6"
        className="stroke-accent-2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
