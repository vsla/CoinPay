import { motion } from 'framer-motion'
import { MdOutlineQrCodeScanner } from 'react-icons/md'
import scanIdDocumentImageUrl from '../../assets/AccountVerification/ScanIdDocumentImage.svg'
import { typography } from '../../styles/typography'

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
          className="h-auto w-full max-w-[280px] object-contain"
          aria-hidden="true"
        />
      </div>

      <h1 className="mb-4 text-center text-cp-fg" style={typography.h3}>
        Scan ID document to verify your identity
      </h1>

      <p
        className="mb-8 text-center text-cp-muted"
        style={{
          ...typography.bodySmall,
          maxWidth: '393px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        Confirm your identity with just a few taps on your phone
      </p>

      <div className="mt-auto w-full pb-6 pt-8">
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-cp-brand-600 text-white shadow-lg active:scale-95"
            aria-label="Scan ID"
          >
            <MdOutlineQrCodeScanner size={32} />
          </button>
        </div>
        <p className="mt-4 text-center text-cp-muted" style={typography.bodySmall}>
          Scan
        </p>
      </div>
    </motion.div>
  )
}
