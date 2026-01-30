import { AnimatePresence, motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { Button } from '../../components/ui/Button'

type PhoneVerificationModalProps = {
  isOpen: boolean
  phoneNumber: string
  onConfirm: () => void
  onCancel: () => void
  onClose: () => void
}

export function PhoneVerificationModal({
  isOpen,
  phoneNumber,
  onConfirm,
  onCancel,
  onClose,
}: PhoneVerificationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-2xl bg-cp-surface p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-cp-muted hover:text-cp-fg"
                aria-label="Close"
              >
                <MdClose size={24} />
              </button>

              <div className="mb-6 flex justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-cp-brand-500 border-t-transparent animate-spin" />
              </div>

              <h2 className="mb-4 text-center text-cp-h2 font-semibold text-cp-fg">
                Verify your phone number before we send code
              </h2>

              <p className="mb-6 text-center text-cp-body text-cp-muted">
                Is this correct? <span className="font-medium text-cp-fg">{phoneNumber}</span>
              </p>

              <div className="space-y-3">
                <Button variant="primary" onClick={onConfirm}>
                  Yes
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  No
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
