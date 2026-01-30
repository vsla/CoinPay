import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { homeAddressSchema } from '../../utils/validationSchemas'

type HomeAddressScreenProps = {
  onNext: (data: { addressLine: string; city: string; postcode: string }) => void
}

type HomeAddressFormValues = {
  addressLine: string
  city: string
  postcode: string
}

export function HomeAddressScreen({ onNext }: HomeAddressScreenProps) {
  const initialValues: HomeAddressFormValues = {
    addressLine: '',
    city: '',
    postcode: '',
  }

  const handleSubmit = (values: HomeAddressFormValues) => {
    onNext(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={homeAddressSchema}
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
            Home address
          </h1>

          <p className="mb-8 cp-subtitle-text">
            This info needs to be accurate with your ID document.
          </p>

          <form
            onSubmit={(e) => {
              setTouched({ addressLine: true, city: true, postcode: true })
              handleSubmit(e)
            }}
            className="flex min-h-full w-full flex-1 flex-col"
          >
            <div className="mb-auto flex-1 space-y-4">
              <Input
                label="Address Line"
                name="addressLine"
                placeholder="123 Main Street"
                value={values.addressLine}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addressLine && errors.addressLine ? errors.addressLine : undefined}
              />

              <Input
                label="City"
                name="city"
                placeholder="City, State"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city ? errors.city : undefined}
              />

              <Input
                label="Postcode"
                name="postcode"
                placeholder="Ex: 00000"
                value={values.postcode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postcode && errors.postcode ? errors.postcode : undefined}
              />
            </div>

            <div className="mt-auto pb-6 pt-8">
              <Button
                type="submit"
                variant="primary"
                disabled={!values.addressLine && !values.city && !values.postcode}
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
