import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Button } from './Button'

type DatePickerModalProps = {
  isOpen: boolean
  value?: Date
  onConfirm: (date: Date) => void
  onClose: () => void
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function DatePickerModal({ isOpen, value, onConfirm, onClose }: DatePickerModalProps) {
  const now = new Date()
  const initialDate = value ?? now
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear())
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)
  const yearListRef = useRef<HTMLDivElement>(null)
  const currentYearButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      const dateToUse = value ?? new Date()
      setSelectedDate(dateToUse)
      setCurrentMonth(dateToUse.getMonth())
      setCurrentYear(dateToUse.getFullYear())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isOpen])

  useEffect(() => {
    if (showYearPicker && currentYearButtonRef.current && yearListRef.current) {
      currentYearButtonRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [showYearPicker])

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleSelectDate = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day))
  }

  const handleConfirm = () => {
    onConfirm(selectedDate)
    onClose()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  
  const prevMonthDays: number[] = []
  if (firstDay > 0) {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const prevMonthTotalDays = getDaysInMonth(prevMonth, prevYear)
    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push(prevMonthTotalDays - i)
    }
  }
  
  const totalCells = prevMonthDays.length + days.length
  const remainingCells = 42 - totalCells
  const nextMonthDays = remainingCells > 0 ? Array.from({ length: remainingCells }, (_, i) => i + 1) : []

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    )
  }

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month)
    setShowMonthPicker(false)
  }

  const handleYearSelect = (year: number) => {
    setCurrentYear(year)
    setShowYearPicker(false)
  }

  const currentYearValue = new Date().getFullYear()
  const minYear = 1900
  const maxYear = currentYearValue
  const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60"
          />

          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full max-w-sm rounded-t-3xl bg-cp-surface p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={handlePrevMonth}
                  className="text-cp-fg hover:text-cp-brand-600"
                  aria-label="Previous month"
                >
                  <MdChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMonthPicker(!showMonthPicker)
                      setShowYearPicker(false)
                    }}
                    className="text-cp-fg hover:text-cp-brand-600 font-poppins font-semibold text-cp-h2 leading-[28px] tracking-normal"
                  >
                    {MONTHS[currentMonth]}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowYearPicker(!showYearPicker)
                      setShowMonthPicker(false)
                    }}
                    className="text-cp-fg hover:text-cp-brand-600 font-poppins font-semibold text-cp-h2 leading-[28px] tracking-normal"
                  >
                    {currentYear}
                  </button>
                </div>
                <button
                  onClick={handleNextMonth}
                  className="text-cp-fg hover:text-cp-brand-600"
                  aria-label="Next month"
                >
                  <MdChevronRight size={24} />
                </button>
              </div>

              {showMonthPicker && (
                <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl border border-cp-border bg-cp-bg p-3">
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleMonthSelect(index)}
                      className={`rounded-lg px-3 py-2 text-cp-body transition-colors ${
                        currentMonth === index
                          ? 'bg-cp-brand-600 text-white'
                          : 'text-cp-fg hover:bg-cp-surface2'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              )}

              {showYearPicker && (
                <div
                  ref={yearListRef}
                  className="mb-4 max-h-48 overflow-y-auto rounded-xl border border-cp-border bg-cp-bg p-3"
                >
                  <div className="grid grid-cols-4 gap-2">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        ref={currentYear === year ? currentYearButtonRef : undefined}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        className={`rounded-lg px-3 py-2 text-cp-body transition-colors ${
                          currentYear === year
                            ? 'bg-cp-brand-600 text-white'
                            : 'text-cp-fg hover:bg-cp-surface2'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4 grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-cp-caption text-cp-muted"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="mb-6 grid grid-cols-7 gap-2">
                {prevMonthDays.map((day) => (
                  <button
                    key={`prev-${day}`}
                    type="button"
                    className="h-10 text-cp-muted opacity-50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {day}
                  </button>
                ))}
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDate(day)}
                    className={`h-10 rounded-full text-cp-fg transition-colors ${
                      isSelected(day)
                        ? 'bg-cp-brand-600 text-white'
                        : 'hover:bg-cp-surface2'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {day}
                  </button>
                ))}
                {nextMonthDays.map((day) => (
                  <button
                    key={`next-${day}`}
                    type="button"
                    className="h-10 text-cp-muted opacity-50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
