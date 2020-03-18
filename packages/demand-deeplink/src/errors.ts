export const codes = {
  DP001: 'DP001',
  DP002: 'DP002',
  DP003: 'DP003',
  DP004: 'DP004',
  DP005: 'DP005',
  DP006: 'DP006',
  DP007: 'DP007',
}

export const errorMessageByCode = {
  [codes.DP001]: 'Missing a required parameter',
  [codes.DP002]: 'Multiple journey leg parameters',
  [codes.DP003]: 'Incorrect format',
  [codes.DP004]: 'Timezone is missing',
  [codes.DP005]: 'Incorrect type',
  [codes.DP006]: 'Unable to check availability',
  [codes.DP007]: 'No POI in response',
}

export function getError(code: string, path: string) {
  return {
    code,
    path,
    error: errorMessageByCode[code] || '',
  }
}
