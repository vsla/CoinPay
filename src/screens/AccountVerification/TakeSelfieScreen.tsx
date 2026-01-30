import { motion } from 'framer-motion'
import { MdOutlinePhotoCamera } from 'react-icons/md'
import takeSelfieImageUrl from '../../assets/AccountVerification/TakeSelfieImage.svg'
import { typography } from '../../styles/typography'

type TakeSelfieScreenProps = {
  onNext: () => void
}

export function TakeSelfieScreen({ onNext }: TakeSelfieScreenProps) {
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
          src={takeSelfieImageUrl}
          alt=""
          className="h-auto w-full max-w-[280px] object-contain"
          aria-hidden="true"
        />
      </div>

      <h1 className="mb-4 text-center text-cp-fg" style={typography.h3}>
        Take selfie to verify your identity
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
        Quick and easy identification verification using your phone's camera. Confirm your identity
        with a self-captured photo.
      </p>

      <div className="mt-auto w-full pb-6 pt-8">
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-cp-brand-600 text-white shadow-lg active:scale-95"
            aria-label="Take selfie"
          >
            <MdOutlinePhotoCamera size={32} />
          </button>
        </div>
        <p className="mt-4 text-center text-cp-muted" style={typography.bodySmall}>
          Take a selfie
        </p>
      </div>
    </motion.div>
  )
}
