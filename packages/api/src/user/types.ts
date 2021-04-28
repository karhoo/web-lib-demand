export type GetCurrentUserResponse = {
  user_id?: string
  email?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  locale?: string
  primary_organisation_id?: string
  organisations?: UserOrganisation[]
  avatar_url?: string
}

type UserOrganisation = {
  id?: string
  name?: string
  roles?: string[]
}

export type ResetPasswordParams = {
  email: string
}

export type GetOrganisationConfigurationResponse = {
  id?: string
  name?: string
  salesforce_id?: string
  client_config?: string
  config?: {
    send_sms_trip_updates?: boolean
    send_custom_comment_to_fleets?: string
    payment_by_invoice?: boolean
  }
  fleet_name_overrides?: object
}
