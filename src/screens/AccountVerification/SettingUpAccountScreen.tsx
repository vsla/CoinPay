import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import settingUpAccountImageUrl from '../../assets/AccountVerification/SettingUpAccountImage.svg'

type SettingUpAccountScreenProps = {
  onComplete: () => void
}

type VerificationStep = {
  id: string
  label: string
  status: 'pending' | 'completed' | 'processing'
}

export function SettingUpAccountScreen({ onComplete }: SettingUpAccountScreenProps) {
  const [steps, setSteps] = useState<VerificationStep[]>([
    { id: 'phone', label: 'Phone verified', status: 'pending' },
    { id: 'document', label: 'Checking up document ID', status: 'pending' },
    { id: 'photo', label: 'Verifying photo', status: 'pending' },
  ])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) => (step.id === 'phone' ? { ...step, status: 'completed' } : step))
        )
      }, 500)
    )

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === 'document' ? { ...step, status: 'completed' } : step
          )
        )
      }, 2000)
    )

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) => (step.id === 'photo' ? { ...step, status: 'processing' } : step))
        )
      }, 3000)
    )

    timers.push(
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step) => (step.id === 'photo' ? { ...step, status: 'completed' } : step))
        )
      }, 4500)
    )

    timers.push(
      setTimeout(() => {
        onComplete()
      }, 5500)
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col items-center justify-center px-3"
    >
      <div className="mb-12 flex items-center justify-center mt-10">
        <img
          src={settingUpAccountImageUrl}
          alt=""
          className="h-auto w-full max-w-[280px] object-contain"
          aria-hidden="true"
        />
      </div>

      <h1 className="mb-4 text-center text-cp-fg font-poppins font-semibold text-cp-h3 leading-[34px] tracking-normal">
        Setting up <br/> your account
      </h1>

      <p className="mb-8 px-4 text-center text-cp-muted font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal max-w-[393px] mx-auto">
        We are analyzing your data to verify
      </p>

      <div className="w-full space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-6 w-6 items-center justify-center">
              <AnimatePresence mode="wait">
                {step.status === 'completed' && (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#304FFE"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
                {step.status === 'processing' && (
                  <motion.div
                    key="loader"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="h-6 w-6"
                  >
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-cp-brand-600 border-t-transparent" />
                  </motion.div>
                )}
                {step.status === 'pending' && (
                  <motion.div
                    key="pending"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="h-6 w-6 rounded-full border-2 border-cp-border"
                  />
                )}
              </AnimatePresence>
            </div>
            <span
              className={`font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal ${step.status === 'completed' ? 'text-cp-fg' : step.status === 'processing' ? 'text-cp-fg' : 'text-cp-muted'}`}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
