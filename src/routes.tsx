import type { ReactNode } from 'react'
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
import { SignUpScreen } from './screens/SignUp/SignUpScreen'
import { SplashScreen } from './screens/Splash/SplashScreen'
import { VerificationCodeScreen } from './screens/Verification/VerificationCodeScreen'
import { WelcomeScreen } from './screens/Welcome/WelcomeScreen'

export type ScreenId =
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
  | 'create-passcode'
  | 'welcome'

export type AppRouterState = {
  phoneNumber: string
  showPhoneModal: boolean
}

export type AppRouterContext = {
  goTo: (screen: ScreenId) => void
  state: AppRouterState
  setPhoneNumber: (v: string) => void
  setShowPhoneModal: (v: boolean) => void
}

const CONTAINER_CLASS = 'bg-[#121212]'

function formatPhone(phone: string, countryCode: string): string {
  const country = countriesWithFlagsAndCallingCodes.find(
    (c) => c.code === countryCode.toLowerCase()
  )
  const code = country?.callingCode?.[0] ? `+${country.callingCode[0]}` : '+880'
  return `${code} ${phone}`
}

function wrap(
  key: string,
  children: ReactNode,
  ctx: AppRouterContext,
  layout?:
    | { type: 'form'; formType: 'signup' | 'account-setup' | 'passcode' | 'welcome'; back: ScreenId }
    | { type: 'verification'; back: ScreenId; progress: number }
): ReactNode {
  if (!layout) return <>{children}</>
  const { goTo } = ctx
  if (layout.type === 'form') {
    return (
      <MobileContainer key={key} className={CONTAINER_CLASS}>
        <FormLayout type={layout.formType} onBack={() => goTo(layout.back)}>
          {children}
        </FormLayout>
      </MobileContainer>
    )
  }
  return (
    <MobileContainer key={key} className={CONTAINER_CLASS}>
      <AccountVerificationLayout onBack={() => goTo(layout.back)} progress={layout.progress}>
        {children}
      </AccountVerificationLayout>
    </MobileContainer>
  )
}

export function getScreenElement(screen: ScreenId, ctx: AppRouterContext): ReactNode {
  const { goTo, state, setPhoneNumber, setShowPhoneModal } = ctx

  const form = (
    formType: 'signup' | 'account-setup' | 'passcode' | 'welcome',
    back: ScreenId,
    children: ReactNode
  ) => wrap(screen, children, ctx, { type: 'form', formType, back })

  const verification = (back: ScreenId, progress: number, children: ReactNode) =>
    wrap(screen, children, ctx, { type: 'verification', back, progress })

  switch (screen) {
    case 'splash':
      return <SplashScreen key="splash" onExitComplete={() => goTo('onboarding')} />
    case 'onboarding':
      return (
        <MobileContainer key="onboarding" className={CONTAINER_CLASS}>
          <OnboardingScreen onComplete={() => goTo('signup')} />
        </MobileContainer>
      )
    case 'signup':
      return (
        <MobileContainer key="signup" className={CONTAINER_CLASS}>
          <SignUpScreen onSignUp={() => goTo('create-account')} onLogIn={() => {}} />
        </MobileContainer>
      )
    case 'create-account':
      return form(
        'signup',
        'signup',
        <CreateAccountForm
          onNext={(phone, countryCode) => {
            setPhoneNumber(formatPhone(phone, countryCode))
            setShowPhoneModal(true)
          }}
        />
      )
    case 'verification':
      return form(
        'signup',
        'create-account',
        <VerificationCodeScreen
          phoneNumber={state.phoneNumber}
          onVerify={() => goTo('country-residence')}
          onResend={() => {}}
        />
      )
    case 'country-residence':
      return form('account-setup', 'verification', <CountryOfResidenceScreen onNext={() => goTo('personal-info')} />)
    case 'personal-info':
      return form('account-setup', 'country-residence', <PersonalInfoScreen onNext={() => goTo('home-address')} />)
    case 'home-address':
      return form('account-setup', 'personal-info', <HomeAddressScreen onNext={() => goTo('add-email')} />)
    case 'add-email':
      return form('account-setup', 'home-address', <AddEmailScreen onNext={() => goTo('scan-id')} />)
    case 'scan-id':
      return verification('add-email', 0.2, <ScanIdDocumentScreen onNext={() => goTo('id-verification-progress')} />)
    case 'id-verification-progress':
      return verification('scan-id', 0.4, <IdVerificationProgressScreen onComplete={() => goTo('take-selfie')} />)
    case 'take-selfie':
      return verification('id-verification-progress', 0.6, <TakeSelfieScreen onNext={() => goTo('selfie-capture')} />)
    case 'selfie-capture':
      return (
        <div key="selfie-capture" className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#121212]">
          <SelfieCaptureScreen
            onCapture={() => goTo('setting-up-account')}
            onBack={() => goTo('take-selfie')}
          />
        </div>
      )
    case 'setting-up-account':
      return (
        <MobileContainer key="setting-up-account" className={CONTAINER_CLASS}>
          <SettingUpAccountScreen onComplete={() => goTo('create-passcode')} />
        </MobileContainer>
      )
    case 'create-passcode':
      return form('passcode', 'setting-up-account', <CreatePasscodeScreen onNext={() => goTo('welcome')} />)
    case 'welcome':
      return form('welcome', 'create-passcode', <WelcomeScreen onContinue={() => {}} />)
    default:
      return null
  }
}
