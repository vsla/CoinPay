import { AnimatePresence, motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { useState } from 'react'
import trustedImageUrl from '../../assets/Onboarding/TrustedImage.svg'
import spendMoneyImageUrl from '../../assets/Onboarding/SpendMoneyImage.svg'
import receiveMoneyImageUrl from '../../assets/Onboarding/ReceiveMoneyImage.svg'
import { Button } from '../../components/ui/Button'
import { ProgressIndicator } from '../../components/ui/ProgressIndicator'

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

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (info.offset.x > threshold && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-cp-bg">
      {/* Content area */}
      <div className="flex flex-1 flex-col items-center px-6 pt-24">
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
            {/* Illustration - top section */}
            <div className="mb-12 flex h-[260px] items-center justify-center">
              <img
                src={steps[currentStep].imageUrl}
                alt=""
                className="h-full w-auto max-w-full object-contain"
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


            {/* Title - middle section */}
            <h1
              className="mb-auto text-center text-cp-fg"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '34px',
                lineHeight: '41px',
                letterSpacing: '0px',
              }}
            >
              {steps[currentStep].title}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section - progress indicator and button */}
      <div className="px-6 pb-10 pt-4">
        {/* Progress indicator */}


        {/* Button */}
        <Button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              handleNext()
            } else {
              onComplete?.()
            }
          }}
          variant="primary"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
