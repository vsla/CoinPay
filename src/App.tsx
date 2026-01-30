import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { countriesWithFlagsAndCallingCodes } from './assets/CountriesWithFlagsAndCallingCodes'
import { AccountSetupLayout } from './components/layout/AccountSetupLayout'
import { AccountVerificationLayout } from './components/layout/AccountVerificationLayout'
import { MobileContainer } from './components/layout/MobileContainer'
import { SignUpLayout } from './components/layout/SignUpLayout'
import { AddEmailScreen } from './screens/AccountSetup/AddEmailScreen'
import { CountryOfResidenceScreen } from './screens/AccountSetup/CountryOfResidenceScreen'
import { HomeAddressScreen } from './screens/AccountSetup/HomeAddressScreen'
import { PersonalInfoScreen } from './screens/AccountSetup/PersonalInfoScreen'
import { IdVerificationProgressScreen } from './screens/AccountVerification/IdVerificationProgressScreen'
import { ScanIdDocumentScreen } from './screens/AccountVerification/ScanIdDocumentScreen'
import { SelfieCaptureScreen } from './screens/AccountVerification/SelfieCaptureScreen'
import { SettingUpAccountScreen } from './screens/AccountVerification/SettingUpAccountScreen'
import { TakeSelfieScreen } from './screens/AccountVerification/TakeSelfieScreen'
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen'
import { CreateAccountForm } from './screens/SignUp/CreateAccountForm'
import { PhoneVerificationModal } from './screens/SignUp/PhoneVerificationModal'
import { SignUpScreen } from './screens/SignUp/SignUpScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'
import { VerificationCodeScreen } from './screens/Verification/VerificationCodeScreen'

type Screen =
  | 'splash'
  | 'onboarding'
  | 'signup'
  | 'create-account'
  | 'verification'
  | 'country-residence'
  | 'personal-info'
  | 'home-address'
  | 'add-email'
  | 'scan-id'
  | 'id-verification-progress'
  | 'take-selfie'
  | 'selfie-capture'
  | 'setting-up-account'

function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleCreateAccount = (phone: string, countryCode: string) => {
    const country = countriesWithFlagsAndCallingCodes.find(
      (c) => c.code === countryCode.toLowerCase()
    )
    const callingCode = country?.callingCode?.[0] ? `+${country.callingCode[0]}` : '+880'
    setPhoneNumber(`${callingCode} ${phone}`)
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
                onVerify={(code) => {
                  console.log('Verification code:', code)
                  setScreen('country-residence')
                }}
                onResend={() => console.log('Resend code')}
              />
            </SignUpLayout>
          </MobileContainer>
        )}
        {screen === 'country-residence' && (
          <MobileContainer key="country-residence" className="bg-cp-bg">
            <AccountSetupLayout onBack={() => setScreen('verification')}>
              <CountryOfResidenceScreen
                onNext={(countryCode) => {
                  console.log('Country selected:', countryCode)
                  setScreen('personal-info')
                }}
              />
            </AccountSetupLayout>
          </MobileContainer>
        )}
        {screen === 'personal-info' && (
          <MobileContainer key="personal-info" className="bg-cp-bg">
            <AccountSetupLayout onBack={() => setScreen('country-residence')}>
              <PersonalInfoScreen
                onNext={(data) => {
                  console.log('Personal info:', data)
                  setScreen('home-address')
                }}
              />
            </AccountSetupLayout>
          </MobileContainer>
        )}
        {screen === 'home-address' && (
          <MobileContainer key="home-address" className="bg-cp-bg">
            <AccountSetupLayout onBack={() => setScreen('personal-info')}>
              <HomeAddressScreen
                onNext={(data) => {
                  console.log('Home address:', data)
                  setScreen('add-email')
                }}
              />
            </AccountSetupLayout>
          </MobileContainer>
        )}
        {screen === 'add-email' && (
          <MobileContainer key="add-email" className="bg-cp-bg">
            <AccountSetupLayout onBack={() => setScreen('home-address')}>
              <AddEmailScreen
                onNext={(email) => {
                  console.log('Email:', email)
                  setScreen('scan-id')
                }}
              />
            </AccountSetupLayout>
          </MobileContainer>
        )}
        {screen === 'scan-id' && (
          <MobileContainer key="scan-id" className="bg-[#121212]">
            <AccountVerificationLayout onBack={() => setScreen('add-email')} progress={0.2}>
              <ScanIdDocumentScreen onNext={() => setScreen('id-verification-progress')} />
            </AccountVerificationLayout>
          </MobileContainer>
        )}
        {screen === 'id-verification-progress' && (
          <MobileContainer key="id-verification-progress" className="bg-[#121212]">
            <AccountVerificationLayout onBack={() => setScreen('scan-id')} progress={0.4}>
              <IdVerificationProgressScreen onComplete={() => setScreen('take-selfie')} />
            </AccountVerificationLayout>
          </MobileContainer>
        )}
        {screen === 'take-selfie' && (
          <MobileContainer key="take-selfie" className="bg-[#121212]">
            <AccountVerificationLayout onBack={() => setScreen('id-verification-progress')} progress={0.6}>
              <TakeSelfieScreen onNext={() => setScreen('selfie-capture')} />
            </AccountVerificationLayout>
          </MobileContainer>
        )}
        {screen === 'selfie-capture' && (
          <MobileContainer key="selfie-capture" className="bg-[#121212]">
            <AccountVerificationLayout onBack={() => setScreen('take-selfie')} progress={0.8}>
              <SelfieCaptureScreen
                onCapture={() => setScreen('setting-up-account')}
                onBack={() => setScreen('take-selfie')}
              />
            </AccountVerificationLayout>
          </MobileContainer>
        )}
        {screen === 'setting-up-account' && (
          <MobileContainer key="setting-up-account" className="bg-[#121212]">
            <AccountVerificationLayout progress={1}>
              <SettingUpAccountScreen
                onComplete={() => {
                  console.log('Account verification complete!')
                }}
              />
            </AccountVerificationLayout>
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
