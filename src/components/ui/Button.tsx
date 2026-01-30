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
    'w-full h-14 px-6 py-4 font-poppins font-medium text-base leading-[24px] tracking-normal text-center transition-all duration-200 disabled:cursor-not-allowed rounded-[50px]'
  const variantStyles = {
    primary: 'bg-cp-brand-600 text-white active:bg-cp-brand-500 disabled:bg-cp-disabled disabled:text-[#D0D0D0]',
    secondary: 'bg-cp-surface text-cp-fg active:bg-cp-surface2 disabled:bg-cp-disabled disabled:text-[#D0D0D0]',
    outline: 'border-1 border-cp-secondary bg-transparent active:bg-white/10 text-cp-secondary disabled:bg-cp-disabled disabled:text-[#D0D0D0] disabled:border-cp-disabled',
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
