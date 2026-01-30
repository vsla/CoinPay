import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { MdEmail } from 'react-icons/md'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { emailSchema } from '../../utils/validationSchemas'

type AddEmailScreenProps = {
  onNext: (email: string) => void
}

type EmailFormValues = {
  email: string
}

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
                leftIcon={<MdEmail size={20} />}
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
