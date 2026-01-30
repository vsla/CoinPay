import { IoIosArrowBack } from 'react-icons/io'

type SignUpHeaderProps = {
  onBack?: () => void
}

export function SignUpHeader({ onBack }: SignUpHeaderProps) {
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
        <div className="absolute left-0 top-0 h-full w-[32px] bg-cp-brand-600" />
      </div>
    </div>
  )
}
