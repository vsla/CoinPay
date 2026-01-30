import type { ReactNode } from 'react'
import { SignUpHeader } from './SignUpHeader'

type SignUpLayoutProps = {
  children: ReactNode
  onBack?: () => void
}

export function SignUpLayout({ children, onBack }: SignUpLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg pt-16">
      <SignUpHeader onBack={onBack} />
      <div className="px-4">
        {children}
      </div>
    </div>
  )
}
