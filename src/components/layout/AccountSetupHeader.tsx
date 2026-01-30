import { IoIosArrowBack } from 'react-icons/io'

type AccountSetupHeaderProps = {
  onBack?: () => void
}

export function AccountSetupHeader({ onBack }: AccountSetupHeaderProps) {
  return (
    <div className="mb-6">
      <div className="px-4">

      {onBack && (
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="-ml-2 flex items-center text-cp-fg"
            aria-label="Go back"
          >
            <IoIosArrowBack size={24} />
          </button>
          <span
            className="text-cp-muted"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '19px',
            }}
          >
            Account setup
          </span>
          <div className="w-6" />
        </div>
      )}
      </div>
      <div className="relative h-0.5 w-full bg-cp-border" aria-hidden="true">
        <div className="absolute left-0 top-0 h-full w-[32px] bg-cp-brand-600" />
      </div>
    </div>
  )
}
