import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdOutlineFlashOn, MdOutlineFlashOff, MdOutlineFlipCameraIos } from 'react-icons/md'
import { typography } from '../../styles/typography'

type SelfieCaptureScreenProps = {
  onCapture: () => void
  onBack: () => void
}

export function SelfieCaptureScreen({ onCapture, onBack }: SelfieCaptureScreenProps) {
  const [flashOn, setFlashOn] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        })
        setStream(mediaStream)
        setCameraPermission('granted')
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (error) {
        console.error('Camera permission denied:', error)
        setCameraPermission('denied')
      }
    }

    requestCameraPermission()

    return () => {
      setStream((currentStream) => {
        if (currentStream) {
          currentStream.getTracks().forEach((track) => track.stop())
        }
        return null
      })
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full w-full flex-1 flex-col"
    >
      <div className="relative mb-8 flex h-[400px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-2xl bg-cp-surface">
        {cameraPermission === 'granted' && stream ? (
          <div className="relative h-full w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[300px] rounded-full border-4 border-white/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[280px] w-[280px] rounded-full bg-gradient-to-b from-cp-brand-600/20 to-transparent" />
            </div>
          </div>
        ) : cameraPermission === 'denied' ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <p className="mb-4 text-cp-fg" style={typography.bodySmall}>
              Camera permission is required to take a selfie
            </p>
            <p className="text-cp-muted" style={typography.bodySmall}>
              Please enable camera access in your browser settings
            </p>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cp-brand-600 border-t-transparent" />
          </div>
        )}
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
