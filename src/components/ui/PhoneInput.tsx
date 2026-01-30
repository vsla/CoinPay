import { useEffect, useRef, useState } from 'react'
import { MdCheck, MdExpandMore } from 'react-icons/md'
import { countriesWithFlagsAndCallingCodes } from '../../assets/CountriesWithFlagsAndCallingCodes'

type PhoneInputProps = {
  value: string
  onChange: (phone: string) => void
  countryCode?: string
  onCountryChange?: (countryCode: string) => void
  error?: string
}

export function PhoneInput({
  value,
  onChange,
  countryCode = 'bd',
  onCountryChange,
  error,
}: PhoneInputProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedCountry =
    countriesWithFlagsAndCallingCodes.find((c) => c.code === countryCode.toLowerCase()) ||
    countriesWithFlagsAndCallingCodes.find((c) => c.code === 'bd') ||
    countriesWithFlagsAndCallingCodes[0]
  
  const phoneCode = selectedCountry.callingCode.length > 0 
    ? `+${selectedCountry.callingCode[0]}` 
    : '+880'

  const filteredCountries = searchQuery
    ? countriesWithFlagsAndCallingCodes.filter((c) =>
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countriesWithFlagsAndCallingCodes

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false)
        setSearchQuery('')
      }
    }

    if (isCountryOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCountryOpen])

  const handleCountrySelect = (code: string) => {
    onCountryChange?.(code)
    setIsCountryOpen(false)
    setSearchQuery('')
  }

  return (
    <div className="w-full">
      <div className={`relative flex items-center rounded-xl border bg-[#121212] ${
        error ? 'border-cp-danger' : 'border-cp-border'
      }`} ref={containerRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="flex items-center gap-2 border-r border-cp-border px-4 py-4"
          >
            <img
              src={selectedCountry.flag}
              alt=""
              className="h-5 w-5 object-contain"
              aria-hidden="true"
            />
            <span className="text-cp-fg font-poppins font-normal text-cp-body leading-[22px]">
              {phoneCode}
            </span>
            <MdExpandMore
              size={16}
              className={`ml-1 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isCountryOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-cp-border bg-[#121212] shadow-lg max-h-[400px]">
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
                      onClick={() => country.code && handleCountrySelect(country.code)}
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
                      {countryCode.toLowerCase() === country.code && (
                        <MdCheck size={20} className="text-cp-brand-500" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-cp-muted">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <input
          type="tel"
          placeholder="Mobile number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-4 py-4 text-cp-fg placeholder:text-cp-muted focus:outline-none font-poppins font-normal text-base leading-[22px]"
        />
      </div>
      {error && <p className="mt-1 text-cp-caption text-cp-danger">{error}</p>}
    </div>
  )
}
