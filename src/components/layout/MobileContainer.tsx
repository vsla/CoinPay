import type { ReactNode } from 'react'
import { tokens } from '../../styles/tokens'

type MobileContainerProps = {
  children: ReactNode
  className?: string
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className="min-h-dvh w-full bg-transparent">
      <div
        className={[
          'relative mx-auto min-h-dvh w-full overflow-hidden',
          className ?? '',
        ].join(' ')}
        style={{ maxWidth: tokens.layout.maxMobileWidthPx }}
      >
        {children}
      </div>
    </div>
  )
}
