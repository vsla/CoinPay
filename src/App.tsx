import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { countriesWithFlagsAndCallingCodes } from './assets/CountriesWithFlagsAndCallingCodes'
import { AccountVerificationLayout } from './components/layout/AccountVerificationLayout'
import { FormLayout } from './components/layout/FormLayout'
import { MobileContainer } from './components/layout/MobileContainer'
import { AddEmailScreen } from './screens/AccountSetup/AddEmailScreen'
import { CountryOfResidenceScreen } from './screens/AccountSetup/CountryOfResidenceScreen'
import { CreatePasscodeScreen } from './screens/AccountSetup/CreatePasscodeScreen'
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
import { WelcomeScreen } from './screens/Welcome/WelcomeScreen'

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
  | 'create-passcode'
  | 'scan-id'
  | 'id-verification-progress'
  | 'take-selfie'
  | 'selfie-capture'
  | 'setting-up-account'
  | 'welcome'

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
          <MobileContainer key="onboarding" className="bg-[#121212]">
            <OnboardingScreen onComplete={() => setScreen('signup')} />
          </MobileContainer>
        )}
        {screen === 'signup' && (
          <MobileContainer key="signup" className="bg-[#121212]">
            <SignUpScreen
              onSignUp={() => setScreen('create-account')}
              onLogIn={() => {}}
            />
          </MobileContainer>
        )}
        {screen === 'create-account' && (
          <MobileContainer key="create-account" className="bg-[#121212]">
            <FormLayout type="signup" onBack={() => setScreen('signup')}>
              <CreateAccountForm onNext={handleCreateAccount} />
            </FormLayout>
          </MobileContainer>
        )}
        {screen === 'verification' && (
          <MobileContainer key="verification" className="bg-[#121212]">
            <FormLayout type="signup" onBack={() => setScreen('create-account')}>
              <VerificationCodeScreen
                phoneNumber={phoneNumber}
                onVerify={() => setScreen('country-residence')}
                onResend={() => {}}
              />
            </FormLayout>
          </MobileContainer>
        )}
        {screen === 'country-residence' && (
          <MobileContainer key="country-residence" className="bg-[#121212]">
            <FormLayout type="account-setup" onBack={() => setScreen('verification')}>
              <CountryOfResidenceScreen
                onNext={() => setScreen('personal-info')}
              />
            </FormLayout>
          </MobileContainer>
        )}
        {screen === 'personal-info' && (
          <MobileContainer key="personal-info" className="bg-[#121212]">
            <FormLayout type="account-setup" onBack={() => setScreen('country-residence')}>
              <PersonalInfoScreen
                onNext={() => setScreen('home-address')}
              />
            </FormLayout>
          </MobileContainer>
        )}
        {screen === 'home-address' && (
          <MobileContainer key="home-address" className="bg-[#121212]">
            <FormLayout type="account-setup" onBack={() => setScreen('personal-info')}>
              <HomeAddressScreen
                onNext={() => setScreen('add-email')}
              />
            </FormLayout>
          </MobileContainer>
        )}
        {screen === 'add-email' && (
          <MobileContainer key="add-email" className="bg-[#121212]">
            <FormLayout type="account-setup" onBack={() => setScreen('home-address')}>
              <AddEmailScreen
                onNext={() => setScreen('scan-id')}
              />
            </FormLayout>
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
          <div key="selfie-capture" className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#121212]">
            <SelfieCaptureScreen
              onCapture={() => setScreen('setting-up-account')}
              onBack={() => setScreen('take-selfie')}
            />
          </div>
        )}
        {screen === 'setting-up-account' && (
          <MobileContainer key="setting-up-account" className="bg-[#121212]">
            <SettingUpAccountScreen
              onComplete={() => setScreen('create-passcode')}
            />
          </MobileContainer>
        )}
        {screen === 'create-passcode' && (
          <MobileContainer key="create-passcode" className="bg-[#121212]">
            <FormLayout type="passcode" onBack={() => setScreen('setting-up-account')}>
              <CreatePasscodeScreen
                onNext={() => setScreen('welcome')}
              />
            </FormLayout>
          </MobileContainer>
        )}
        {screen === 'welcome' && (
          <MobileContainer key="welcome" className="bg-[#121212]">
            <FormLayout type="welcome" onBack={() => setScreen('create-passcode')}>
              <WelcomeScreen onContinue={() => {}} />
            </FormLayout>
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
