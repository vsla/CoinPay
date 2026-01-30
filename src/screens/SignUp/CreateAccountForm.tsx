import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { PasswordInput } from '../../components/ui/Input'
import { PhoneInput } from '../../components/ui/PhoneInput'
import { MdLockOutline } from 'react-icons/md'

type CreateAccountFormProps = {
  onNext: (phone: string, countryCode: string) => void
}


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
      <h1 className="mb-2 cp-title-text">
        Create an Account
      </h1>

      <p className="mb-8 cp-subtitle-text">
        Enter your mobile number to verify your account
      </p>

      <div className="mb-auto space-y-4">
        <div className="w-full">
          <label className="mb-2 block text-cp-fg font-poppins font-normal text-cp-label leading-[19px] tracking-normal">
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
          leftIcon={<MdLockOutline size={20} />}
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
