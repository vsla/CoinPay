import { useState, useRef, useEffect } from 'react'
import { MdCheck, MdExpandMore } from 'react-icons/md'
import { countriesWithFlagsAndCallingCodes } from '../../assets/CountriesWithFlagsAndCallingCodes'

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
        className="w-full rounded-xl border border-cp-border bg-[#121212] px-4 py-4 text-left text-cp-fg focus:border-cp-brand-500 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedCountry.flag}
              alt=""
              className="h-5 w-5 object-contain"
              aria-hidden="true"
            />
            <span className="font-poppins font-normal text-cp-body leading-[22px]">
              {selectedCountry.country}
            </span>
          </div>
          <MdExpandMore
            size={20}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-cp-border bg-[#121212] shadow-lg">
          <div className="border-b border-cp-border p-3">
            <input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-cp-border bg-[#121212] px-3 py-2 text-cp-fg placeholder:text-cp-muted focus:border-cp-brand-500 focus:outline-none font-poppins font-normal text-base leading-[22px]"
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
                    <span className="font-poppins font-normal text-cp-body leading-[22px]">
                      {country.country}
                    </span>
                  </div>
                  {normalizedValue === country.code && (
                    <MdCheck size={20} className="text-cp-brand-500" />
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
