import { motion } from 'framer-motion'
import { useState } from 'react'
import createAccountImageUrl from '../../assets/SignUp/CreateAccountImage.svg'
import { Button } from '../../components/ui/Button'
import { typography } from '../../styles/typography'

type SignUpScreenProps = {
  onSignUp?: () => void
  onLogIn?: () => void
}

export function SignUpScreen({ onSignUp, onLogIn }: SignUpScreenProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
    onSignUp?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-dvh w-full flex-col bg-cp-bg px-6 pt-6"
    >
      <div className="mb-8 flex items-center justify-center">
        <img
          src={createAccountImageUrl}
          alt=""
          className="h-auto w-full max-w-3/5 object-contain"
          aria-hidden="true"
        />
      </div>

      <h1 className="mb-4 text-center text-cp-fg" style={typography.h1}>
        Create your Coinpay account
      </h1>

      <p className="mb-auto text-center text-cp-body text-cp-muted">
        Coinpay is a powerful tool that allows you to easily send, receive, and track all your
        transactions.
      </p>

      <div className="mt-auto space-y-3 pb-6 pt-8">
        <Button variant="primary" onClick={handleSignUp} isLoading={isLoading}>
          Sign up
        </Button>
        <Button variant="outline" onClick={onLogIn} disabled={isLoading}>
          Log in
        </Button>
      </div>

      <p className="pb-6 text-center text-cp-caption text-cp-muted">
        By continuing you accept our{' '}
        <a href="#" className="text-cp-brand-600 underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-cp-brand-600 underline">
          Privacy Policy
        </a>
      </p>
    </motion.div>
  )
}
