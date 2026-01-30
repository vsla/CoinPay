import { useState, useRef, useEffect } from 'react'
import { countriesWithFlagsAndCallingCodes } from '../../assets/CountriesWithFlagsAndCallingCodes'
import { typography } from '../../styles/typography'

type CountrySelectProps = {
  value?: string
  onChange: (countryCode: string) => void
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const normalizedValue = value?.toLowerCase()
  const selectedCountry =
    countriesWithFlagsAndCallingCodes.find((c) => c.code === normalizedValue) ||
    countriesWithFlagsAndCallingCodes.find((c) => c.code === 'bd') ||
    countriesWithFlagsAndCallingCodes[0]

  const filteredCountries = searchQuery
    ? countriesWithFlagsAndCallingCodes.filter((c) =>
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countriesWithFlagsAndCallingCodes

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (countryCode: string) => {
    onChange(countryCode)
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border border-cp-border bg-cp-surface px-4 py-4 text-left text-cp-fg focus:border-cp-brand-500 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedCountry.flag}
              alt=""
              className="h-5 w-5 object-contain"
              aria-hidden="true"
            />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}>
              {selectedCountry.country}
            </span>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-cp-border bg-cp-surface shadow-lg">
          <div className="border-b border-cp-border p-3">
            <input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-cp-border bg-cp-bg px-3 py-2 text-cp-fg placeholder:text-cp-muted focus:border-cp-brand-500 focus:outline-none"
              style={typography.body}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => country.code && handleSelect(country.code)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-cp-surface2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={country.flag}
                      alt=""
                      className="h-5 w-5 object-contain"
                      aria-hidden="true"
                    />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}>
                      {country.country}
                    </span>
                  </div>
                  {normalizedValue === country.code && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.667 5L7.5 14.167L3.333 10"
                        stroke="#304FFE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-cp-muted">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
