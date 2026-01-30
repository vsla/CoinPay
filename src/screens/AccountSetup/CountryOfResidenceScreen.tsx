import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { CountrySelect } from '../../components/ui/CountrySelect'

type CountryOfResidenceScreenProps = {
  onNext: (countryCode: string) => void
}

export function CountryOfResidenceScreen({ onNext }: CountryOfResidenceScreenProps) {
  const [country, setCountry] = useState('bd')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col"
    >
        <h1 className="mb-2 text-cp-fg font-poppins font-semibold text-cp-h2 leading-[28px] tracking-normal">
          Country of residence
        </h1>

      <p className="mb-8 text-cp-muted font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal">
        This info needs to be accurate with your ID document.
      </p>

      <div className="mb-auto">
        <label className="mb-2 block text-cp-fg font-poppins font-normal text-cp-label leading-[19px] tracking-normal">
          Country
        </label>
        <CountrySelect value={country} onChange={setCountry} />
      </div>

      <div className="pb-6 pt-8">
        <Button variant="primary" onClick={() => onNext(country)}>
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
