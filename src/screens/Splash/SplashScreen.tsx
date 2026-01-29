import { motion } from 'framer-motion'
import { fadeVariants, screenTransition } from '../../motion/transitions'
import dottedMapUrl from '../../assets/SplashScreen/DottedMapBackground.svg'
import logoUrl from '../../assets/SplashScreen/LogoCoinbase.svg'
import backgroundSplashUrl from '../../assets/SplashScreen/BackgroundSplashCreen.svg'

type SplashScreenProps = {
  onExitComplete?: () => void
}

export function SplashScreen({ onExitComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="relative min-h-dvh w-full overflow-hidden"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={screenTransition}
      onAnimationComplete={(definition) => {
        if (definition === 'exit') onExitComplete?.()
      }}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#043164]" aria-hidden="true" />

      {/* Diagonal background (Figma export) */}
      <img
        src={backgroundSplashUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.85]"
      />

      {/* Dotted world map */}
      <img
        src={dottedMapUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 w-full -translate-y-1/2 select-none "
      />

      {/* Logo */}
      <div className="relative flex min-h-dvh w-full items-center justify-center px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <img
          src={logoUrl}
          alt="CoinPay"
          className="w-[120px] max-w-[70vw] select-none"
          draggable={false}
        />
      </div>
    </motion.div>
  )
}
