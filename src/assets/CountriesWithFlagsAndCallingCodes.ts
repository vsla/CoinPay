import { countriesWithFlags } from './CountriesWithFlags'
import { enrichWithCallingCodes } from '../utils/enrichWithCallingCodes'

export const countriesWithFlagsAndCallingCodes = enrichWithCallingCodes(countriesWithFlags)
