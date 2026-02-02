import { describe, it, expect } from 'vitest'
import { getScreenElement, type ScreenId, type AppRouterContext } from './routes'

function makeCtx(overrides?: Partial<AppRouterContext>): AppRouterContext {
  return {
    goTo: () => {},
    state: { phoneNumber: '', showPhoneModal: false },
    setPhoneNumber: () => {},
    setShowPhoneModal: () => {},
    ...overrides,
  }
}

describe('getScreenElement', () => {
  const screens: ScreenId[] = [
    'splash',
    'onboarding',
    'signup',
    'create-account',
    'verification',
    'country-residence',
    'personal-info',
    'home-address',
    'add-email',
    'scan-id',
    'id-verification-progress',
    'take-selfie',
    'selfie-capture',
    'setting-up-account',
    'create-passcode',
    'welcome',
  ]

  it('returns non-null element for every valid screen', () => {
    const ctx = makeCtx()
    for (const screen of screens) {
      const el = getScreenElement(screen, ctx)
      expect(el).not.toBeNull()
    }
  })

  it('returns element for splash screen', () => {
    const ctx = makeCtx()
    const el = getScreenElement('splash', ctx)
    expect(el).not.toBeNull()
  })
})
