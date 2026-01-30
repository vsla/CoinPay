import { motion } from 'framer-motion'
import { useState } from 'react'
import { MdOutlineFlashOn, MdOutlineFlashOff, MdOutlineFlipCameraIos } from 'react-icons/md'
import { typography } from '../../styles/typography'

type SelfieCaptureScreenProps = {
  onCapture: () => void
  onBack: () => void
}

export function SelfieCaptureScreen({ onCapture, onBack }: SelfieCaptureScreenProps) {
  const [flashOn, setFlashOn] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col"
    >
      <div className="relative mb-8 flex h-[400px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-2xl bg-cp-surface">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[300px] w-[300px] rounded-full border-4 border-white/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[280px] w-[280px] rounded-full bg-gradient-to-b from-cp-brand-600/20 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[250px] w-[250px] rounded-full bg-cp-surface" />
          </div>
        </div>
      </div>

      <p
        className="mb-8 text-center text-cp-fg"
        style={{
          ...typography.bodySmall,
          maxWidth: '393px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        Take your photo at arms length. Make sure your whole face is visible.
      </p>

      <div className="mt-auto flex w-full items-center justify-between px-8 pb-6 pt-8">
        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`rounded-full p-3 ${flashOn ? 'bg-cp-brand-600 text-white' : 'bg-cp-surface text-cp-muted'}`}
          aria-label="Toggle flash"
        >
          {flashOn ? <MdOutlineFlashOn size={24} /> : <MdOutlineFlashOff size={24} />}
        </button>

        <button
          onClick={onCapture}
          className="h-16 w-16 rounded-full border-4 border-white bg-white shadow-lg active:scale-95"
          aria-label="Capture photo"
        >
          <div className="h-full w-full rounded-full bg-cp-brand-600" />
        </button>

        <button
          onClick={onBack}
          className="rounded-full bg-cp-surface p-3 text-cp-muted"
          aria-label="Rotate camera"
        >
          <MdOutlineFlipCameraIos size={24} />
        </button>
      </div>
    </motion.div>
  )
}
