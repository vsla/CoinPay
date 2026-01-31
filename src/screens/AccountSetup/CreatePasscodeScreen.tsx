import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type CreatePasscodeScreenProps = {
  onNext: (passcode: string) => void
}

export function CreatePasscodeScreen({ onNext }: CreatePasscodeScreenProps) {
  const [passcode, setPasscode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPasscode(value)
    if (value.length === 4) {
      onNext(value)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col"
    >
      <h1 className="mb-2 cp-title-text">
        Create passcode
      </h1>

      <p className="mb-8 cp-subtitle-text">
        This info needs to be accurate with your ID document.
      </p>

      <div className="mb-auto flex flex-1 flex-col items-center justify-center">
        <div
          className="relative flex cursor-text flex-col items-center justify-center"
          onClick={() => inputRef.current?.focus()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.focus()}
          role="button"
          tabIndex={0}
          aria-label="Enter passcode"
        >
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={passcode}
            onChange={handleChange}
            autoFocus
            autoComplete="one-time-code"
            className="absolute inset-0 cursor-text opacity-0"
            style={{ caretColor: 'transparent' }}
            aria-label="Passcode"
          />
          <div className="mb-12 flex gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`h-5 w-5 rounded-full border-2 transition-colors ${
                  index < passcode.length
                    ? 'border-cp-fg bg-cp-fg'
                    : 'border-cp-muted bg-transparent'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
