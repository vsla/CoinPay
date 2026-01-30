import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import type { KeyboardEvent } from 'react'

const CODE_LENGTH = 6

type VerificationCodeScreenProps = {
  phoneNumber: string
  onVerify: (code: string) => void
  onResend?: () => void
}

export function VerificationCodeScreen({
  phoneNumber,
  onVerify,
  onResend,
}: VerificationCodeScreenProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, CODE_LENGTH)
    const newCode = [...code]
    for (let i = 0; i < pasted.length && i < CODE_LENGTH; i++) {
      newCode[i] = pasted[i]
    }
    setCode(newCode)
    const nextEmpty = newCode.findIndex((digit) => !digit)
    const focusIndex = nextEmpty !== -1 ? nextEmpty : CODE_LENGTH - 1
    inputRefs.current[focusIndex]?.focus()
  }

  const fullCode = code.join('')
  const isComplete = fullCode.length === CODE_LENGTH

  useEffect(() => {
    if (isComplete) {
      onVerify(fullCode)
    }
  }, [isComplete, fullCode, onVerify])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col"
    >
      <h1 className="mb-2 cp-title-text">
        Confirm your phone
      </h1>

      <p className="mb-8 cp-subtitle-text">
        We send 6 digits code to <span className="font-medium text-cp-fg">{phoneNumber}</span>
      </p>

      <div className="mb-auto flex-1">
        <div className="mb-8 flex gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="h-12 w-full border-b-2 border-t-0 border-l-0 border-r-0 border-white bg-transparent text-center text-2xl font-semibold text-cp-fg focus:border-cp-brand-500 focus:outline-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          ))}
        </div>

        <p className="text-center text-cp-muted font-poppins font-normal text-cp-body leading-[22px]">
          Didn't get a code?{' '}
          <button
            onClick={onResend}
            className="text-cp-brand-600 underline font-poppins font-normal text-cp-body leading-[22px]"
          >
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  )
}
