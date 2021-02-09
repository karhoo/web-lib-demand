import { mocked } from 'ts-jest/utils'
import * as yup from 'yup'

import { PassengerDetailsForm, defaultValidationSchema } from './PassengerDetailsForm'
import { Form } from './Form'

jest.mock('./Form', () => ({ Form: jest.fn() }))

const mockedDedfaultFormShema = {
  COMMENT: {
    type: 'GENERIC',
  },
  EMAIL: {
    type: 'GENERIC',
  },
  FIRST_NAME: {
    type: 'GENERIC',
  },
  LAST_NAME: {
    type: 'GENERIC',
  },
  PHONE_NUMBER: {
    type: 'GENERIC',
  },
}

const mockedCustomFormFields = {
  field1: 'field1',
  field2: 'field2',
  field3: 'field3',
}

const customValidationSchema = yup.object({
  [mockedCustomFormFields.field1]: yup.string(),
  [mockedCustomFormFields.field2]: yup.number(),
  [mockedCustomFormFields.field3]: yup.boolean(),
})

const mockedCustomFormSchema = {
  field1: {
    type: 'GENERIC',
  },
  field2: {
    type: 'GENERIC',
  },
  field3: {
    type: 'GENERIC',
  },
}

describe('PassengerDetailsForm', () => {
  const mockedForm = mocked(Form, true)

  beforeEach(() => {
    mocked(Form).mockClear()
  })

  it('should create new form with default schemas', () => {
    PassengerDetailsForm.create()
    expect(mockedForm).toBeCalledTimes(1)
    expect(mockedForm).toBeCalledWith(mockedDedfaultFormShema, defaultValidationSchema)
  })

  it('should create new form with custom schemas', () => {
    PassengerDetailsForm.create(mockedCustomFormFields, customValidationSchema)
    expect(mockedForm).toBeCalledTimes(1)
    expect(mockedForm).toBeCalledWith(mockedCustomFormSchema, customValidationSchema)
  })
})
