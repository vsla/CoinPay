import { getCountryCallingCode, isSupportedCountry } from 'libphonenumber-js'

type Country = {
  flag: string
  country: string
  code?: string
}

type EnrichedCountry = Country & {
  callingCode: string[]
}

export function enrichWithCallingCodes(countries: Country[]): EnrichedCountry[] {
  return countries.map((c) => {
    if (!c.code) {
      return {
        ...c,
        callingCode: [],
      }
    }

    try {
      const upperCode = c.code.toUpperCase()

      if (!isSupportedCountry(upperCode)) {
        return {
          ...c,
          callingCode: [],
        }
      }

      return {
        ...c,
        callingCode: [getCountryCallingCode(upperCode)],
      }
    } catch {
      return {
        ...c,
        callingCode: [],
      }
    }
  })
}
