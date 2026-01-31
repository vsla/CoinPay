import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdOutlineFlashOn, MdOutlineFlashOff, MdOutlineFlipCameraIos } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'

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
    const videoElement = videoRef.current

    const requestCameraPermission = async () => {
      try {
        if (!window.isSecureContext) {
          setCameraPermission('denied')
          return
        }
        if (!navigator.mediaDevices?.getUserMedia) {
          setCameraPermission('denied')
          return
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
        })
        setStream(mediaStream)
        setCameraPermission('granted')
        if (videoElement) {
          videoElement.srcObject = mediaStream
          videoElement.play().catch(() => {})
        }
      } catch {
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
      if (videoElement) {
        videoElement.srcObject = null
      }
    }
  }, [])

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full w-full min-h-full flex-col overflow-hidden bg-[#121212]"
    >
      {cameraPermission === 'granted' && stream ? (
        <>
          <div className="absolute inset-0 h-full w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none z-10 " style={{ background: 'radial-gradient(ellipse 81% 56% at 50% 34%, transparent 0%, transparent 50%, rgba(18, 18, 18, 0.6) 50%, rgba(18, 18, 18, 0.85) 100%)' }} /> 
          <div className="absolute inset-0 flex mt-12 justify-center pointer-events-none z-20">
            <div className="h-3/5 w-5/6 rounded-[50%] border-5 border-white" />
          </div>
        </>
      ) : cameraPermission === 'denied' ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-[#121212]">
          {!window.isSecureContext ? (
            <>
              <p className="mb-4 text-white font-poppins font-normal text-sm leading-[19px] tracking-normal">
                Camera requires a secure connection (HTTPS)
              </p>
              <p className="text-cp-muted font-poppins font-normal text-sm leading-[19px] tracking-normal">
                Use HTTPS or test on the same device with localhost.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4 text-white font-poppins font-normal text-sm leading-[19px] tracking-normal">
                Camera permission is required to take a selfie
              </p>
              <p className="text-cp-muted font-poppins font-normal text-sm leading-[19px] tracking-normal">
                Please enable camera access in your browser settings
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#121212]">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cp-brand-600 border-t-transparent" />
        </div>
      )}

      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-40 flex items-center text-white"
        aria-label="Go back"
      >
        <IoIosArrowBack size={24} />
      </button>

      <div className="relative z-30 flex h-full flex-col justify-end mb-6">
        <p className="mb-6 text-center text-white font-poppins font-normal text-sm leading-[22px] tracking-normal max-w-[393px] px-4 mx-auto">
          Take your photo at arms length. Make sure your whole face is visible.
        </p>

        <div className="flex w-full items-center justify-center px-8 pb-6 pt-4">
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`rounded-full p-3 ${flashOn ? 'bg-cp-brand-600 text-white' : 'bg-transparent text-white'}`}
            aria-label="Toggle flash"
          >
            {flashOn ? <MdOutlineFlashOn size={24} /> : <MdOutlineFlashOff size={24} />}
          </button>

          <button
            onClick={onCapture}
            className="h-16 w-16 rounded-full border-4 border-white bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 mx-6"
            aria-label="Capture photo"
          >
            <div className="h-full w-full rounded-full bg-white" />
          </button>

          <button
            onClick={onBack}
            className="rounded-full bg-transparent p-3 text-white"
            aria-label="Rotate camera"
          >
            <MdOutlineFlipCameraIos size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
