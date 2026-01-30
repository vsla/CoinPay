import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { DatePickerModal } from '../../components/ui/DatePickerModal'
import { Input } from '../../components/ui/Input'

type PersonalInfoScreenProps = {
  onNext: (data: { fullName: string; username: string; dateOfBirth: Date }) => void
}

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function PersonalInfoScreen({ onNext }: PersonalInfoScreenProps) {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const canSubmit = fullName.trim().length > 0 && username.trim().length > 0 && dateOfBirth !== null

  const handleDateConfirm = (date: Date) => {
    setDateOfBirth(date)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex w-full flex-col"
      >
        <h1 className="mb-2 cp-title-text">
          Add your personal info
        </h1>

        <p className="mb-8 cp-subtitle-text">
          This info needs to be accurate with your ID document.
        </p>

        <div className="mb-auto space-y-4">
          <Input
            label="Full Name"
            placeholder="Mr. Jhon Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Username"
            placeholder="@username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="w-full">
            <label className="mb-2 block text-cp-fg font-poppins font-normal text-cp-label leading-[19px] tracking-normal">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                value={dateOfBirth ? formatDate(dateOfBirth) : ''}
                readOnly
                onClick={() => setShowDatePicker(true)}
                className="w-full cursor-pointer rounded-xl border border-cp-border bg-[#121212] px-4 py-4 text-cp-fg placeholder:text-cp-muted focus:border-cp-brand-500 focus:outline-none font-poppins font-normal text-base leading-[22px]"
              />
              <button
                type="button"
                onClick={() => setShowDatePicker(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cp-muted"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15.833 3.333H4.167C3.247 3.333 2.5 4.08 2.5 5V16.667C2.5 17.587 3.247 18.333 4.167 18.333H15.833C16.753 18.333 17.5 17.587 17.5 16.667V5C17.5 4.08 16.753 3.333 15.833 3.333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.333 1.667V5M6.667 1.667V5M2.5 8.333H17.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pb-6 pt-8">
          <Button variant="primary" onClick={() => onNext({ fullName, username, dateOfBirth: dateOfBirth! })} disabled={!canSubmit}>
            Continue
          </Button>
        </div>
      </motion.div>

      <DatePickerModal
        isOpen={showDatePicker}
        value={dateOfBirth || undefined}
        onConfirm={handleDateConfirm}
        onClose={() => setShowDatePicker(false)}
      />
    </>
  )
}
