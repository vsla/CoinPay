import { typography } from '../../styles/typography'

type AccountVerificationHeaderProps = {
  onBack?: () => void
  progress: number // 0 to 1
}

export function AccountVerificationHeader({ onBack, progress }: AccountVerificationHeaderProps) {
  if (!onBack) return null

  return (
    <div className="mb-6">
      <div className="px-4">
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
      </div>
      <div className="relative h-0.5 w-full bg-cp-border" aria-hidden="true">
        <div
          className="absolute left-0 top-0 h-full bg-cp-brand-600 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
