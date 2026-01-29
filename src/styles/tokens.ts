export const tokens = {
  colors: {
    splash: {
      blue0: '#0636C9',
      blue1: '#0B4DE8',
      blue2: '#083CCF',
    },
    white: '#FFFFFF',
  },
  motion: {
    durations: {
      splashHoldMs: 3000,
      splashFadeMs: 800,
    },
    easing: [0.22, 1, 0.36, 1] as const,
  },
  layout: {
    maxMobileWidthPx: 420,
  },
} as const

export type Tokens = typeof tokens
