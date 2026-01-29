import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MobileContainer } from './components/layout/MobileContainer'
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen'
import { SignUpScreen } from './screens/SignUp/SignUpScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'

type Screen = 'splash' | 'onboarding' | 'signup'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash')

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'splash' && (
        <SplashScreen
          key="splash"
          onExitComplete={() => setCurrentScreen('onboarding')}
        />
      )}
      {currentScreen === 'onboarding' && (
        <MobileContainer key="onboarding" className="bg-cp-bg">
          <OnboardingScreen onComplete={() => setCurrentScreen('signup')} />
        </MobileContainer>
      )}
      {currentScreen === 'signup' && (
        <MobileContainer key="signup" className="bg-cp-bg">
          <SignUpScreen onSignUp={() => {}} onLogIn={() => {}} />
        </MobileContainer>
      )}
    </AnimatePresence>
  )
}

export default App
