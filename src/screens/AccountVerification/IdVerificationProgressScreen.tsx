import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import documentIdCardImageUrl from '../../assets/AccountVerification/DocumentIdCardImage.svg'

type IdVerificationProgressScreenProps = {
  onComplete: () => void
}

export function IdVerificationProgressScreen({ onComplete }: IdVerificationProgressScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col items-center justify-center"
    >
      <div className="mb-8 text-center">
        <p className="mb-4 text-cp-fg font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal">
          1/2 Please scan front of your ID card
        </p>
      </div>

      <div className="mb-12 flex items-center justify-center">
        <div className="relative">
          <img
            src={documentIdCardImageUrl}
            alt=""
            className="h-auto w-full max-w-[280px] object-contain"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full bg-cp-brand-600/20" />
          </div>
        </div>
      </div>

      <h1 className="mb-4 text-center text-cp-fg font-poppins font-semibold text-cp-h3 leading-[34px] tracking-normal">
        ID verification in progress
      </h1>

      <p className="mb-8 px-4 text-center text-cp-muted font-poppins font-normal text-cp-body-small leading-[19px] tracking-normal max-w-[393px] mx-auto">
        Hold tight, it won't take long
      </p>

      <div className="w-full max-w-[280px]">
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-cp-border">
          <motion.div
            className="h-full bg-cp-brand-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
