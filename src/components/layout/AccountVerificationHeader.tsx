import { IoIosArrowBack } from 'react-icons/io'

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
          <IoIosArrowBack size={24} />
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
