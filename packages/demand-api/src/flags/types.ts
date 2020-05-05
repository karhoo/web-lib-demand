export type FlagsRequestPathParameters = {
  identifier: string
  platform: string
}

export type FlagsResponse = {
  identifier: string
  version: string
  flags: Record<string, boolean | string>
}

export type FlagsVersionType = {
  version: string
}
