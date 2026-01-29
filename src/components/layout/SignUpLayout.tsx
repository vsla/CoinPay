import type { ReactNode } from 'react'
import { SignUpHeader } from './SignUpHeader'

type SignUpLayoutProps = {
  children: ReactNode
  onBack?: () => void
}

export function SignUpLayout({ children, onBack }: SignUpLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg px-6 pt-16">
      <SignUpHeader onBack={onBack} />
      {children}
    </div>
  )
}
