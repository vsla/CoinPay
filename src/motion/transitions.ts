import type { Transition, Variants } from 'framer-motion'
import { tokens } from '../styles/tokens'

export const screenTransition: Transition = {
  duration: tokens.motion.durations.splashFadeMs / 1000,
  ease: tokens.motion.easing,
}

export const fadeVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}
