import { IoIosArrowBack } from 'react-icons/io'

type PageHeaderType = 'signup' | 'account-setup' | 'account-verification'

type PageHeaderProps = {
  type: PageHeaderType
  onBack?: () => void
  progress?: number // 0 to 1, only used for account-verification
}

const headerTitles: Record<PageHeaderType, string> = {
  'signup': '',
  'account-setup': 'Account setup',
  'account-verification': 'Account verification',
}

export function PageHeader({ type, onBack, progress }: PageHeaderProps) {
  const title = headerTitles[type]
  const showTitle = type === 'account-setup' || type === 'account-verification'
  const isVerification = type === 'account-verification'
  
  if (!onBack && !showTitle) return null

  return (
    <div className="mb-6">
      <div className="px-4">
        {onBack && (
          <div className={`mb-4 flex items-center ${showTitle ? 'justify-between' : ''}`}>
            <button
              onClick={onBack}
              className="-ml-2 flex items-center text-cp-fg"
              aria-label="Go back"
            >
              <IoIosArrowBack size={24} />
            </button>
            {showTitle && (
              <>
                <span className="text-cp-muted font-poppins font-normal text-sm leading-[19px] tracking-normal">
                  {title}
                </span>
                <div className="w-6" />
              </>
            )}
          </div>
        )}
      </div>
      <div className="relative h-0.5 w-full bg-cp-border" aria-hidden="true">
        {isVerification && progress !== undefined ? (
          <div
            className="absolute left-0 top-0 h-full bg-cp-brand-600 transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        ) : (
          <div className="absolute left-0 top-0 h-full w-[32px] bg-cp-brand-600" />
        )}
      </div>
    </div>
  )
}
