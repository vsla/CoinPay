import { motion } from 'framer-motion'
import { useState } from 'react'
import createAccountImageUrl from '../../assets/SignUp/CreateAccountImage.svg'
import { Button } from '../../components/ui/Button'

type SignUpScreenProps = {
  onSignUp?: () => void
  onLogIn?: () => void
}

export function SignUpScreen({ onSignUp, onLogIn }: SignUpScreenProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async () => {
    setIsLoading(true)
    // Simulate API call
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
      className="flex min-h-dvh w-full flex-col bg-cp-bg px-6 pt-12"
    >
      {/* Illustration */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src={createAccountImageUrl}
          alt=""
          className="h-auto w-full max-w-[280px] object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h1
        className="mb-4 text-center text-cp-fg"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '34px',
          lineHeight: '41px',
          letterSpacing: '0px',
        }}
      >
        Create your Coinpay account
      </h1>

      {/* Description */}
      <p className="mb-auto text-center text-cp-body text-cp-muted">
        Coinpay is a powerful tool that allows you to easily send, receive, and track all your
        transactions.
      </p>

      {/* Buttons */}
      <div className="mt-auto space-y-3 pb-6 pt-8">
        <Button variant="primary" onClick={handleSignUp} isLoading={isLoading}>
          Sign up
        </Button>
        <Button variant="outline" onClick={onLogIn} disabled={isLoading}>
          Log in
        </Button>
      </div>

      {/* Terms and Privacy */}
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
