import type { ReactNode } from 'react'
import { AccountVerificationHeader } from './AccountVerificationHeader'

type AccountVerificationLayoutProps = {
  children: ReactNode
  onBack?: () => void
  progress: number
}

export function AccountVerificationLayout({
  children,
  onBack,
  progress,
}: AccountVerificationLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col pt-16">
      <AccountVerificationHeader onBack={onBack} progress={progress} />
      <div className="px-4">
        {children}
      </div>
    </div>
  )
}
