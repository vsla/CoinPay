import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MobileContainer } from './components/layout/MobileContainer'
import { SignUpLayout } from './components/layout/SignUpLayout'
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen'
import { CreateAccountForm } from './screens/SignUp/CreateAccountForm'
import { PhoneVerificationModal } from './screens/SignUp/PhoneVerificationModal'
import { SignUpScreen } from './screens/SignUp/SignUpScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'
import { VerificationCodeScreen } from './screens/Verification/VerificationCodeScreen'

type Screen = 'splash' | 'onboarding' | 'signup' | 'create-account' | 'verification'

function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleCreateAccount = (phone: string) => {
    setPhoneNumber(`+880 ${phone}`)
    setShowModal(true)
  }

  const handleConfirmPhone = () => {
    setShowModal(false)
    setScreen('verification')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <SplashScreen key="splash" onExitComplete={() => setScreen('onboarding')} />
        )}
        {screen === 'onboarding' && (
          <MobileContainer key="onboarding" className="bg-cp-bg">
            <OnboardingScreen onComplete={() => setScreen('signup')} />
          </MobileContainer>
        )}
        {screen === 'signup' && (
          <MobileContainer key="signup" className="bg-cp-bg">
            <SignUpScreen
              onSignUp={() => setScreen('create-account')}
              onLogIn={() => {}}
            />
          </MobileContainer>
        )}
        {screen === 'create-account' && (
          <MobileContainer key="create-account" className="bg-cp-bg">
            <SignUpLayout onBack={() => setScreen('signup')}>
              <CreateAccountForm onNext={handleCreateAccount} />
            </SignUpLayout>
          </MobileContainer>
        )}
        {screen === 'verification' && (
          <MobileContainer key="verification" className="bg-cp-bg">
            <SignUpLayout onBack={() => setScreen('create-account')}>
              <VerificationCodeScreen
                phoneNumber={phoneNumber}
                onVerify={(code) => console.log('Verification code:', code)}
                onResend={() => console.log('Resend code')}
              />
            </SignUpLayout>
          </MobileContainer>
        )}
      </AnimatePresence>

      {screen === 'create-account' && (
        <PhoneVerificationModal
          isOpen={showModal}
          phoneNumber={phoneNumber}
          onConfirm={handleConfirmPhone}
          onCancel={() => {
            setShowModal(false)
            setScreen('create-account')
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default App
