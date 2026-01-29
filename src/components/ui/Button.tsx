import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'w-full rounded-xl px-6 py-4 text-cp-body font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variantStyles = {
    primary: 'bg-cp-brand-600 text-white active:bg-cp-brand-500',
    secondary: 'bg-cp-surface text-cp-fg active:bg-cp-surface2',
    outline: 'border-2 border-white/20 bg-transparent text-white active:bg-white/10',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
