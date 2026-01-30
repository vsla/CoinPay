import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdCalendarToday } from 'react-icons/md'
import { Button } from '../../components/ui/Button'
import { DatePickerModal } from '../../components/ui/DatePickerModal'
import { Input } from '../../components/ui/Input'
import { personalInfoSchema } from '../../utils/validationSchemas'

type PersonalInfoScreenProps = {
  onNext: (data: { fullName: string; username: string; dateOfBirth: Date }) => void
}

type PersonalInfoFormValues = {
  fullName: string
  username: string
  dateOfBirth: Date | null
}

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function PersonalInfoScreen({ onNext }: PersonalInfoScreenProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const initialValues: PersonalInfoFormValues = {
    fullName: '',
    username: '',
    dateOfBirth: null,
  }

  const handleSubmit = (values: PersonalInfoFormValues) => {
    if (values.dateOfBirth) {
      onNext({
        fullName: values.fullName,
        username: values.username,
        dateOfBirth: values.dateOfBirth,
      })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={personalInfoSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched, setTouched }) => (
        <>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-full w-full flex-1 flex-col"
          >
            <h1 className="mb-2 cp-title-text">
              Add your personal info
            </h1>

            <p className="mb-8 cp-subtitle-text">
              This info needs to be accurate with your ID document.
            </p>

            <form
              onSubmit={(e) => {
                setTouched({ fullName: true, username: true, dateOfBirth: true })
                handleSubmit(e)
              }}
              className="flex min-h-full w-full flex-1 flex-col"
            >
              <div className="mb-auto flex-1 space-y-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="Mr. Jhon Doe"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && errors.fullName ? errors.fullName : undefined}
                />

                <Input
                  label="Username"
                  name="username"
                  placeholder="@username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && errors.username ? errors.username : undefined}
                />

                <div className="w-full">
                  <label className="mb-2 block text-cp-fg font-poppins font-normal text-cp-label leading-[19px] tracking-normal">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      value={values.dateOfBirth ? formatDate(values.dateOfBirth) : ''}
                      readOnly
                      onClick={() => setShowDatePicker(true)}
                      className={`w-full cursor-pointer rounded-xl border bg-[#121212] px-4 py-4 text-cp-fg placeholder:text-cp-muted focus:border-cp-brand-500 focus:outline-none font-poppins font-normal text-base leading-[22px] ${
                        touched.dateOfBirth && errors.dateOfBirth ? 'border-cp-danger' : 'border-cp-border'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowDatePicker(true)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-cp-muted"
                    >
                      <MdCalendarToday size={20} />
                    </button>
                  </div>
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <p className="mt-1 text-cp-caption text-cp-danger">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>

              <div className="mt-auto pb-6 pt-8">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!values.fullName && !values.username && !values.dateOfBirth}
                >
                  Continue
                </Button>
              </div>
            </form>
          </motion.div>

          <DatePickerModal
            isOpen={showDatePicker}
            value={values.dateOfBirth || undefined}
            onConfirm={(date) => {
              setFieldValue('dateOfBirth', date)
              setFieldTouched('dateOfBirth', true)
            }}
            onClose={() => setShowDatePicker(false)}
          />
        </>
      )}
    </Formik>
  )
}
