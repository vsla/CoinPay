import type { InputHTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import { typography } from '../../styles/typography'

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
      <label className="mb-2 block text-cp-fg" style={typography.label}>
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full rounded-xl border bg-cp-surface px-4 py-4 text-cp-fg placeholder:text-cp-muted focus:border-cp-brand-500 focus:outline-none ${
            leftIcon ? 'pl-12' : ''
          } ${rightIcon ? 'pr-12' : ''} ${error ? 'border-cp-danger' : 'border-cp-border'} ${className}`}
          style={{ ...typography.body, ...style }}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 3.75C6.25 3.75 3.125 6.25 1.875 10C3.125 13.75 6.25 16.25 10 16.25C13.75 16.25 16.875 13.75 18.125 10C16.875 6.25 13.75 3.75 10 3.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 2.5L17.5 17.5M8.125 8.125C7.77982 8.47018 7.5 8.91018 7.5 9.375C7.5 10.4105 8.33947 11.25 9.375 11.25C9.83982 11.25 10.2798 10.9702 10.625 10.625M15.625 15.625C14.125 16.875 12.125 17.5 10 17.5C6.25 17.5 3.125 15 1.875 11.25C2.5 9.375 3.75 7.875 5.375 6.875L15.625 15.625ZM6.875 6.875L8.125 8.125M12.5 4.375C13.75 4.75 14.875 5.625 15.625 6.875C16.875 10.625 13.75 13.125 10 13.125C9.375 13.125 8.75 13 8.125 12.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        ) : undefined
      }
    />
  )
}
