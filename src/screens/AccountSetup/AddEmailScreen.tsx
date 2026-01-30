import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { emailSchema } from '../../utils/validationSchemas'

type AddEmailScreenProps = {
  onNext: (email: string) => void
}

type EmailFormValues = {
  email: string
}

const EMAIL_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2.5 5.83333L9.0755 10.05C9.63533 10.3667 10.3647 10.3667 10.9245 10.05L17.5 5.83333M3.33333 15.8333H16.6667C17.5871 15.8333 18.3333 15.0871 18.3333 14.1667V5.83333C18.3333 4.91286 17.5871 4.16667 16.6667 4.16667H3.33333C2.41286 4.16667 1.66667 4.91286 1.66667 5.83333V14.1667C1.66667 15.0871 2.41286 15.8333 3.33333 15.8333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function AddEmailScreen({ onNext }: AddEmailScreenProps) {
  const initialValues: EmailFormValues = {
    email: '',
  }

  const handleSubmit = (values: EmailFormValues) => {
    onNext(values.email)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={emailSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setTouched }) => (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex min-h-full w-full flex-1 flex-col"
        >
          <h1 className="mb-2 cp-title-text">
            Add your email
          </h1>

          <p className="mb-8 cp-subtitle-text">
            This info needs to be accurate with your ID document.
          </p>

          <form
            onSubmit={(e) => {
              setTouched({ email: true })
              handleSubmit(e)
            }}
            className="flex min-h-full w-full flex-1 flex-col"
          >
            <div className="mb-auto flex-1">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : undefined}
                leftIcon={EMAIL_ICON}
              />
            </div>

            <div className="mt-auto pb-6 pt-8">
              <Button
                type="submit"
                variant="primary"
                disabled={!values.email}
              >
                Continue
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </Formik>
  )
}
