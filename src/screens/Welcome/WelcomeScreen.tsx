import { motion } from 'framer-motion'
import welcomeImageUrl from '../../assets/welcomeScreen/WelcomeScreenImage.svg'
import { Button } from '../../components/ui/Button'

type WelcomeScreenProps = {
  onContinue: () => void
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col"
    >
      <div className="mb-6 flex flex-1 flex-col items-center justify-center">
        <img
          src={welcomeImageUrl}
          alt=""
          className="mb-8 h-auto w-full max-w-[241px] object-contain"
          aria-hidden="true"
        />
        <h1 className="mb-2 text-center text-cp-fg font-poppins font-semibold text-cp-h1 leading-[41px] tracking-normal">
          Congratulations!
        </h1>
        <h2 className="mb-4 text-center text-cp-fg font-poppins font-semibold text-cp-h1 leading-[41px] tracking-normal">
          Welcome to Coinpay
        </h2>
        <p className="mb-auto text-center cp-subtitle-text max-w-sm">
          We are happy to have you. It&apos;s time to send, receive and track your expense.
        </p>
      </div>

      <div className="mt-auto pb-6 pt-8">
        <Button variant="primary" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
