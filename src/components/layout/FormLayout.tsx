import type { ReactNode } from 'react'
import { PageHeader } from './PageHeader'

export type FormLayoutType = 'signup' | 'account-setup' | 'passcode' | 'welcome'

type FormLayoutProps = {
  type: FormLayoutType
  children: ReactNode
  onBack?: () => void
}

export function FormLayout({ type, children, onBack }: FormLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#121212] pt-4">
      <PageHeader type={type} onBack={onBack} />
      <div className="flex flex-1 flex-col px-4">
        {children}
      </div>
    </div>
  )
}
