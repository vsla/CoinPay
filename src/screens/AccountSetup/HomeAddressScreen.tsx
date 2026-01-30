import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

type HomeAddressScreenProps = {
  onNext: (data: { addressLine: string; city: string; postcode: string }) => void
}

export function HomeAddressScreen({ onNext }: HomeAddressScreenProps) {
  const [addressLine, setAddressLine] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')

  const canSubmit = addressLine.trim().length > 0 && city.trim().length > 0 && postcode.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col"
    >
        <h1 className="mb-2 text-cp-fg font-poppins font-semibold text-cp-h2 leading-[28px] tracking-normal">
          Home address
        </h1>

      <p className="mb-8 text-cp-muted font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal">
        This info needs to be accurate with your ID document.
      </p>

      <div className="mb-auto space-y-4">
        <Input
          label="Address Line"
          placeholder="Mr. Jhon Doe"
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
        />

        <Input
          label="City"
          placeholder="City, State"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Input
          label="Postcode"
          placeholder="Ex: 00000"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>

      <div className="pb-6 pt-8">
        <Button
          variant="primary"
          onClick={() => onNext({ addressLine, city, postcode })}
          disabled={!canSubmit}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
