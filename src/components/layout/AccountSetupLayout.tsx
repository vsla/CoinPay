import type { ReactNode } from 'react'
import { AccountSetupHeader } from './AccountSetupHeader'

type AccountSetupLayoutProps = {
  children: ReactNode
  onBack?: () => void
}

export function AccountSetupLayout({ children, onBack }: AccountSetupLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg px-6 pt-16">
      <AccountSetupHeader onBack={onBack} />
      {children}
    </div>
  )
}
