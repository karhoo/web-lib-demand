export type FlagsRequestPathParameters = {
  identifier: string
  platform: string
}

// As a structure of `flags` object may change from version to version we need keep type versiongon here as well
// See `flags` endpoint documentation on developer.karhoo.com
type v1FlagsType = Record<string, boolean | string>

export type FlagsResponse = {
  identifier: string
  version: string
  flags: v1FlagsType
}

export type FlagsVersionType = {
  version: string
}
