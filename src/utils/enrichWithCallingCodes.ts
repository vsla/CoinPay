import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

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

      // libphonenumber-js only supports valid ISO country codes
      if (!getCountries().includes(upperCode as any)) {
        return {
          ...c,
          callingCode: [],
        }
      }

      return {
        ...c,
        callingCode: [getCountryCallingCode(upperCode as any)],
      }
    } catch {
      return {
        ...c,
        callingCode: [],
      }
    }
  })
}
