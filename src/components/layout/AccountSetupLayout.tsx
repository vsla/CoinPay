import type { ReactNode } from 'react'
import { PageHeader } from './PageHeader'

type AccountSetupLayoutProps = {
  children: ReactNode
  onBack?: () => void
}

export function AccountSetupLayout({ children, onBack }: AccountSetupLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg pt-16">
      <PageHeader type="account-setup" onBack={onBack} />
      <div className="px-4">
        {children}
      </div>
    </div>
  )
}
