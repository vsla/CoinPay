import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MobileContainer } from './components/layout/MobileContainer'
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'
import { tokens } from './styles/tokens'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => {
      setShowSplash(false)
    }, tokens.motion.durations.splashHoldMs)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <MobileContainer key="onboarding" className="bg-cp-bg">
          <OnboardingScreen />
        </MobileContainer>
      )}
    </AnimatePresence>
  )
}

export default App
