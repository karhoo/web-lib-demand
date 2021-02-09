import * as yup from 'yup'
import { TripCreateFieldTypes, FormSchema, PassengerDetailsFormFields, ListOfFields } from './types'
import { Form } from './Form'

export const defaultValidationSchema = yup.object({
  [PassengerDetailsFormFields.FIRST_NAME]: yup.string().required(),
  [PassengerDetailsFormFields.LAST_NAME]: yup.string().required(),
  [PassengerDetailsFormFields.EMAIL]: yup
    .string()
    .email()
    .required(),
  [PassengerDetailsFormFields.COMMENT]: yup.string().max(110),
})

export const defaultFieldList = PassengerDetailsFormFields

export class PassengerDetailsForm {
  static create(
    filedList: ListOfFields = PassengerDetailsFormFields,
    validationSchema: yup.SchemaOf<object> = defaultValidationSchema
  ) {
    const formSchema = Object.keys(filedList).reduce((list: FormSchema, field: string) => {
      list[field] = {
        type: TripCreateFieldTypes.GENERIC,
      }

      return { ...list }
    }, {})

    return new Form(formSchema, validationSchema)
  }
}
