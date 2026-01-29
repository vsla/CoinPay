import type { ReactNode } from 'react'
import { tokens } from '../../styles/tokens'

type MobileContainerProps = {
  children: ReactNode
  className?: string
}

/**
 * Mobile-first fullscreen container that:
 * - Uses modern viewport units (100dvh) for mobile browser chrome
 * - Respects iOS safe-area insets
 * - Optionally centers within a max mobile width on larger screens
 */
export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className="min-h-dvh w-full bg-transparent">
      <div
        className={[
          'relative mx-auto min-h-dvh w-full overflow-hidden',
          'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
          className ?? '',
        ].join(' ')}
        style={{ maxWidth: tokens.layout.maxMobileWidthPx }}
      >
        {children}
      </div>
    </div>
  )
}
