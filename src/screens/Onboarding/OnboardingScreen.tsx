import { AnimatePresence, motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { useState } from 'react'
import trustedImageUrl from '../../assets/Onboarding/TrustedImage.svg'
import spendMoneyImageUrl from '../../assets/Onboarding/SpendMoneyImage.svg'
import receiveMoneyImageUrl from '../../assets/Onboarding/ReceiveMoneyImage.svg'
import { Button } from '../../components/ui/Button'
import { ProgressIndicator } from '../../components/ui/ProgressIndicator'
import { typography } from '../../styles/typography'

type OnboardingStep = {
  title: string
  imageUrl: string
}

const steps: OnboardingStep[] = [
  {
    title: 'Trusted by millions of people, part of one part',
    imageUrl: trustedImageUrl,
  },
  {
    title: 'Spend money abroad, and track your expense',
    imageUrl: spendMoneyImageUrl,
  },
  {
    title: 'Receive Money From Anywhere In The World',
    imageUrl: receiveMoneyImageUrl,
  },
]

type OnboardingScreenProps = {
  onComplete?: () => void
}

const SWIPE_THRESHOLD = 50

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (info.offset.x > SWIPE_THRESHOLD && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg">
      <div className="flex flex-1 flex-col items-center px-6  pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            dragElastic={0.2}
            className="flex w-full flex-col items-center"
          >
            <div className="mb-12 flex h-[260px] items-center justify-center">
              <img
                src={steps[currentStep].imageUrl}
                alt=""
                className="h-full w-auto max-w-5/6 object-contain"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-12 mb-8">
          <ProgressIndicator total={steps.length} current={currentStep} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            dragElastic={0.2}
            className="flex w-full flex-col items-center"
          >
            <h1 className="mb-auto text-center text-cp-fg" style={typography.h1}>
              {steps[currentStep].title}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-10 pt-4">
        <Button
          onClick={() => {
            if (isLastStep) {
              onComplete?.()
            } else {
              handleNext()
            }
          }}
          variant="primary"
        >
          {isLastStep ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
