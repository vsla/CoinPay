import type { InputHTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
}

export function Input({
  label,
  leftIcon,
  rightIcon,
  error,
  className = '',
  style,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-cp-fg font-poppins font-normal text-cp-label leading-[19px] tracking-normal">
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full rounded-xl border bg-[#121212] px-4 py-4 text-cp-fg placeholder:text-cp-muted focus:border-cp-brand-500 focus:outline-none font-poppins font-normal text-base leading-[22px] ${
            leftIcon ? 'pl-12' : ''
          } ${rightIcon ? 'pr-12' : ''} ${error ? 'border-cp-danger' : 'border-cp-border'} ${className}`}
          style={style}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-cp-caption text-cp-danger">{error}</p>}
    </div>
  )
}

type PasswordInputProps = Omit<InputProps, 'type' | 'rightIcon'> & {
  showPasswordToggle?: boolean
}

export function PasswordInput({
  showPasswordToggle = true,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-cp-muted hover:text-cp-fg"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <MdVisibility size={20} />
            ) : (
              <MdVisibilityOff size={20} />
            )}
          </button>
        ) : undefined
      }
    />
  )
}
