import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { getScreenElement, type ScreenId } from './routes'
import { PhoneVerificationModal } from './screens/SignUp/PhoneVerificationModal'

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('splash')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPhoneModal, setShowPhoneModal] = useState(false)

  const ctx = {
    goTo: setScreen,
    state: { phoneNumber, showPhoneModal },
    setPhoneNumber,
    setShowPhoneModal,
  }

  const confirmPhone = () => {
    setShowPhoneModal(false)
    setScreen('verification')
  }

  return (
    <>
      <AnimatePresence mode="wait">{getScreenElement(screen, ctx)}</AnimatePresence>

      {screen === 'create-account' && (
        <PhoneVerificationModal
          isOpen={showPhoneModal}
          phoneNumber={phoneNumber}
          onConfirm={confirmPhone}
          onCancel={() => setShowPhoneModal(false)}
          onClose={() => setShowPhoneModal(false)}
        />
      )}
    </>
  )
}
