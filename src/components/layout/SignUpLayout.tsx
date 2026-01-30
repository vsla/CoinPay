import type { ReactNode } from 'react'
import { PageHeader } from './PageHeader'

type SignUpLayoutProps = {
  children: ReactNode
  onBack?: () => void
}

export function SignUpLayout({ children, onBack }: SignUpLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg pt-16">
      <PageHeader type="signup" onBack={onBack} />
      <div className="px-4">
        {children}
      </div>
    </div>
  )
}
