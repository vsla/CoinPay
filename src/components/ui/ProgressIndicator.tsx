type ProgressIndicatorProps = {
  total: number
  current: number
  className?: string
}

export function ProgressIndicator({
  total,
  current,
  className = '',
}: ProgressIndicatorProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current
        return (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${isActive
              ? 'w-3 bg-cp-brand-600'
              : 'w-6 bg-white'
              }`}
            aria-label={`Step ${index + 1} of ${total}`}
          />
        )
      })}
    </div>
  )
}
