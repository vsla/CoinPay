import { describe, it, expect } from 'vitest'
import {
  createAccountSchema,
  personalInfoSchema,
  homeAddressSchema,
  emailSchema,
} from './validationSchemas'

describe('createAccountSchema', () => {
  it('accepts valid phone, password, countryCode', async () => {
    const result = await createAccountSchema.isValid({
      phone: '12345678',
      password: 'Password1',
      countryCode: 'us',
    })
    expect(result).toBe(true)
  })

  it('rejects phone shorter than 8 digits', async () => {
    const result = await createAccountSchema.isValid({
      phone: '1234567',
      password: 'Password1',
      countryCode: 'us',
    })
    expect(result).toBe(false)
  })

  it('rejects password without uppercase, lowercase, and number', async () => {
    const result = await createAccountSchema.isValid({
      phone: '12345678',
      password: 'password',
      countryCode: 'us',
    })
    expect(result).toBe(false)
  })
})

describe('personalInfoSchema', () => {
  it('accepts valid fullName, username, dateOfBirth', async () => {
    const birth = new Date()
    birth.setFullYear(birth.getFullYear() - 25)
    const result = await personalInfoSchema.isValid({
      fullName: 'John Doe',
      username: 'johndoe',
      dateOfBirth: birth,
    })
    expect(result).toBe(true)
  })

  it('rejects username starting with underscore', async () => {
    const birth = new Date()
    birth.setFullYear(birth.getFullYear() - 25)
    const result = await personalInfoSchema.isValid({
      fullName: 'John Doe',
      username: '_johndoe',
      dateOfBirth: birth,
    })
    expect(result).toBe(false)
  })
})

describe('homeAddressSchema', () => {
  it('accepts valid address, city, postcode', async () => {
    const result = await homeAddressSchema.isValid({
      addressLine: '123 Main Street',
      city: 'New York',
      postcode: '10001',
    })
    expect(result).toBe(true)
  })

  it('rejects address shorter than 5 characters', async () => {
    const result = await homeAddressSchema.isValid({
      addressLine: '123',
      city: 'NY',
      postcode: '10001',
    })
    expect(result).toBe(false)
  })
})

describe('emailSchema', () => {
  it('accepts valid email', async () => {
    const result = await emailSchema.isValid({ email: 'user@example.com' })
    expect(result).toBe(true)
  })

  it('rejects invalid email', async () => {
    const result = await emailSchema.isValid({ email: 'notanemail' })
    expect(result).toBe(false)
  })
})
