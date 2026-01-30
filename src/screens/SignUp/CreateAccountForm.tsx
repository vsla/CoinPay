import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { PasswordInput } from '../../components/ui/Input'
import { PhoneInput } from '../../components/ui/PhoneInput'
import { createAccountSchema } from '../../utils/validationSchemas'
import { MdLockOutline } from 'react-icons/md'

type CreateAccountFormProps = {
  onNext: (phone: string, countryCode: string) => void
}

type CreateAccountFormValues = {
  phone: string
  password: string
  countryCode: string
}

export function CreateAccountForm({ onNext }: CreateAccountFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const initialValues: CreateAccountFormValues = {
    phone: '',
    password: '',
    countryCode: 'bd',
  }

  const handleSubmit = async (values: CreateAccountFormValues) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsLoading(false)
    onNext(values.phone, values.countryCode)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAccountSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setTouched }) => (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex min-h-full w-full flex-1 flex-col"
        >
          <h1 className="mb-2 cp-title-text">
            Create an Account
          </h1>

          <p className="mb-8 cp-subtitle-text">
            Enter your mobile number to verify your account
          </p>

          <form
            onSubmit={(e) => {
              setTouched({ phone: true, password: true, countryCode: true })
              handleSubmit(e)
            }}
            className="flex min-h-full w-full flex-1 flex-col"
          >
            <div className="mb-auto flex-1 space-y-4">
              <div className="w-full">
                <label className="mb-2 block text-cp-fg font-poppins font-normal text-cp-label leading-[19px] tracking-normal">
                  Phone
                </label>
                <PhoneInput
                  value={values.phone}
                  onChange={(phone) => setFieldValue('phone', phone)}
                  countryCode={values.countryCode}
                  onCountryChange={(code) => setFieldValue('countryCode', code)}
                  error={touched.phone && errors.phone ? errors.phone : undefined}
                />
              </div>

              <div className="w-full">
                <PasswordInput
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password ? errors.password : undefined}
                  leftIcon={<MdLockOutline size={20} />}
                />
                <p className="mt-1.5 text-cp-caption text-cp-muted">
                  At least 8 characters with one uppercase letter, one lowercase letter, and one number
                </p>
              </div>
            </div>

            <div className="mt-auto pb-6 pt-8">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Sign up
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </Formik>
  )
}
