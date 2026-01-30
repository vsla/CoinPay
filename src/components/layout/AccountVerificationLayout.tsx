import type { ReactNode } from 'react'
import { PageHeader } from './PageHeader'

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
    <div className="flex min-h-dvh w-full flex-col bg-[#121212] pt-4">
      <div className="relative z-20">
        <PageHeader type="account-verification" onBack={onBack} progress={progress} />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
