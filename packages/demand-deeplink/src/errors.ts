import { BookingTypes } from './constants'

export const codes = {
  DP001: 'DP001',
  DP002: 'DP002',
  DP003: 'DP003',
  DP004: 'DP004',
  DP005: 'DP005',
  DP006: 'DP006',
  DP007: 'DP007',
  DP008: 'DP008',
  DP009: 'DP009',
  DP010: 'DP010',
  DP011: 'DP011',
  DP012: 'DP012',
  DP013: 'DP013',
  DP014: 'DP014',
  DP015: 'DP015',
}

export const errorMessageByCode = {
  [codes.DP001]: 'Missing a required parameter',
  [codes.DP002]: 'Multiple journey leg parameters',
  [codes.DP003]: 'Incorrect format',
  [codes.DP004]: 'Timezone is missing',
  [codes.DP005]: 'Incorrect type',
  [codes.DP006]: 'Same pickup and dropoff',
  [codes.DP007]: 'No information about place in response',
  [codes.DP008]: 'Unable to check availability',
  [codes.DP009]: 'Pickup time is specified without pickup place',
  [codes.DP010]: `Unsupported booking type. Supported types are ${BookingTypes.ASAP} and ${BookingTypes.PREBOOK}`,
  [codes.DP011]: `Booking type is ${BookingTypes.ASAP} but pickup time is specified`,
  [codes.DP012]: 'Incorrect coordinates value',
  [codes.DP013]: 'Pickup or dropoff are unacceptable parameters',
  [codes.DP014]: 'Both pickup and dropoff information should be provided',
  [codes.DP015]: 'No availability in the requested area',
}

export function getError(code: string, path: string) {
  return {
    code,
    path,
    error: errorMessageByCode[code] || '',
  }
}
