import { motion } from 'framer-motion'
import { MdOutlineQrCodeScanner } from 'react-icons/md'
import scanIdDocumentImageUrl from '../../assets/AccountVerification/ScanIdDocumentImage.svg'

type ScanIdDocumentScreenProps = {
  onNext: () => void
}

export function ScanIdDocumentScreen({ onNext }: ScanIdDocumentScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col"
    >
      <div className="mb-12 flex flex-1 items-center justify-center">
        <img
          src={scanIdDocumentImageUrl}
          alt=""
          className="h-auto w-full max-w-3/6 object-contain"
          aria-hidden="true"
        />
      </div>

      <h3 className="mb-4 text-center text-cp-fg font-poppins font-semibold text-cp-h3 leading-[34px] tracking-normal">
        Scan ID document to <br /> verify your identity
      </h3>

      <p className="mb-4 text-center cp-subtitle-text px-4">
        Confirm your identity with just a few taps on your phone
      </p>

      <div className="mt-auto w-full pb-6 pt-8">
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="flex h-15 w-15 items-center justify-center rounded-full bg-cp-brand-600 text-white shadow-lg active:scale-95"
            aria-label="Scan ID"
          >
            <MdOutlineQrCodeScanner size={28} />
          </button>
        </div>
        <p className="mt-2 text-center text-cp-muted font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal">
          Scan
        </p>
      </div>
    </motion.div>
  )
}
