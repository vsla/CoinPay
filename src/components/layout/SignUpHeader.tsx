type SignUpHeaderProps = {
  onBack?: () => void
}

export function SignUpHeader({ onBack }: SignUpHeaderProps) {
  if (!onBack) return null

  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="-ml-2 mb-4 flex items-center text-cp-fg"
        aria-label="Go back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="relative h-0.5 w-full bg-cp-border" aria-hidden="true">
        <div className="absolute left-0 top-0 h-full w-[32px] bg-cp-brand-600" />
      </div>
    </div>
  )
}
