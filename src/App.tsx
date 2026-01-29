import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MobileContainer } from './components/layout/MobileContainer'
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen
          key="splash"
          onExitComplete={() => setShowSplash(false)}
        />
      ) : (
        <MobileContainer key="onboarding" className="bg-cp-bg">
          <OnboardingScreen />
        </MobileContainer>
      )}
    </AnimatePresence>
  )
}

export default App
