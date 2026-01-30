import * as Yup from 'yup'

export const createAccountSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Phone number is required')
    .min(8, 'Phone number must be at least 8 digits')
    .matches(/^\d+$/, 'Phone number must contain only digits'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  countryCode: Yup.string().required('Country code is required'),
})

export const personalInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .test('no-leading-underscore', 'Username cannot start with an underscore', (value) => {
      return value ? !value.startsWith('_') : true
    }),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'You must be at least 18 years old', (value) => {
      if (!value) return false
      const today = new Date()
      const birthDate = new Date(value)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18
      }
      return age >= 18
    }),
})

export const homeAddressSchema = Yup.object().shape({
  addressLine: Yup.string()
    .required('Address line is required')
    .min(5, 'Address must be at least 5 characters'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'City can only contain letters, spaces, hyphens, and apostrophes'),
  postcode: Yup.string()
    .required('Postcode is required')
    .matches(/^[A-Z0-9\s-]+$/i, 'Postcode format is invalid'),
})

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address'
    ),
})
