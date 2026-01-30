import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { PasswordInput } from '../../components/ui/Input'
import { PhoneInput } from '../../components/ui/PhoneInput'
import { typography } from '../../styles/typography'

type CreateAccountFormProps = {
  onNext: (phone: string, countryCode: string) => void
}

const LOCK_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M15.625 7.5V5.625C15.625 3.00684 13.4932 0.875 10.875 0.875C8.25684 0.875 6.125 3.00684 6.125 5.625V7.5M10.875 13.125V15M5.625 7.5H16.125C16.7463 7.5 17.25 8.00368 17.25 8.625V16.375C17.25 16.9963 16.7463 17.5 16.125 17.5H5.625C5.00368 17.5 4.5 16.9963 4.5 16.375V8.625C4.5 8.00368 5.00368 7.5 5.625 7.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function CreateAccountForm({ onNext }: CreateAccountFormProps) {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('bd')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const canSubmit = phone.trim().length > 0 && password.trim().length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsLoading(false)
    onNext(phone, countryCode)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col"
    >
      <h1 className="mb-2 text-cp-fg" style={typography.h2}>
        Create an Account
      </h1>

      <p className="mb-8 text-cp-muted" style={typography.bodySmall}>
        Enter your mobile number to verify your account
      </p>

      <div className="mb-auto space-y-4">
        <div className="w-full">
          <label className="mb-2 block text-cp-fg" style={typography.label}>
            Phone
          </label>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            countryCode={countryCode}
            onCountryChange={setCountryCode}
          />
        </div>

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={LOCK_ICON}
        />
      </div>

      <div className="pb-6 pt-8">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          isLoading={isLoading}
        >
          Sign up
        </Button>
      </div>
    </motion.div>
  )
}
