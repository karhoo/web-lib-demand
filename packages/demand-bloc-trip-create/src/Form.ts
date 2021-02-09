import { SchemaOf } from 'yup'
import { merge, of, Subject, Observable } from 'rxjs'
import { scan, switchMap, distinctUntilChanged } from 'rxjs/operators'

import {
  TripCreateModuleFields,
  TripCreateFieldTypes,
  FormSchema,
  FormSchemaValue,
  ListOfFields,
} from './types'
import { AutocompleteBloc } from './AutocompleteBloc'
import { FieldBloc } from './FieldBloc'
import { createStream } from './createStream'
import { defaultTripCreateOptions } from './constants'

export class Form {
  private fields: TripCreateModuleFields = {}
  private isValid$ = new Subject<boolean>()
  private errors$ = new Subject<string[]>()
  private validationSchema: SchemaOf<object>

  constructor(schema: FormSchema, validationScheme: SchemaOf<object>) {
    this.validationSchema = validationScheme

    Object.keys(schema).forEach(key => {
      this.createStream(key, schema[key])
    })

    this.isValid$ = new Subject<boolean>()

    this.values.subscribe(this.handleValidation.bind(this))
  }

  /**
   * Gets all form fields and creates a single stream with all values
   */
  get values() {
    const streams = Object.keys(this.fields).map(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapKeyToStream = (stream: Observable<any>, keyPostfix?: string) =>
        stream.pipe(switchMap(value => of({ key: `${key}${keyPostfix ? '.' + keyPostfix : ''}`, value })))

      return merge(
        mapKeyToStream(this.fields[key].query),
        mapKeyToStream(this.fields[key]?.selectedAddress ?? of(), 'selectedAddress'),
        mapKeyToStream(this.fields[key]?.results ?? of(), 'results')
      )
    })

    return merge(...streams).pipe(
      scan(
        (acc, curr) => ({
          ...acc,
          [curr.key]: curr.value,
        }),
        {}
      )
    )
  }
  /**
   * Defines form validity
   */
  get isValid() {
    return createStream(this.isValid$).pipe(distinctUntilChanged())
  }

  /**
   * Streams validation form errors
   */
  get validationErrors() {
    return createStream(this.errors$).pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)) // As yup returns a new array every time
    )
  }

  private async handleValidation(formValues: object) {
    try {
      await this.validationSchema?.validate(formValues, {
        abortEarly: false,
      })
      this.isValid$.next(true)
    } catch (err) {
      this.isValid$.next(false)
      this.errors$.next(err.errors)
    }
  }

  private createStream(fieldName: string, schema: FormSchemaValue): void | Error {
    if (this.fields[fieldName]) {
      return
    }

    const isAutocomplete = schema.type === TripCreateFieldTypes.AUTOCOMPLETE

    if (!isAutocomplete) {
      this.fields[fieldName] = new FieldBloc()
      return
    }

    if (!schema.locationService) {
      throw new Error(`locationService is required for ${TripCreateFieldTypes.AUTOCOMPLETE} type of field`)
    }

    if (!this.fields[fieldName]) {
      this.fields[fieldName] = new AutocompleteBloc(
        schema.locationService,
        (schema.options = defaultTripCreateOptions)
      )
    }
  }

  getStream(fieldName: string) {
    return this.fields[fieldName]
  }

  onChange(fieldName: string, value: string) {
    this.fields[fieldName].onChange(value)
  }

  validateField(fieldName: string, values: ListOfFields) {
    this.validationSchema
      .validateAt(fieldName, values)
      .then(() => this.fields[fieldName].onError(''))
      .catch(error => this.fields[fieldName].onError(error.message))
  }

  validateForm(values: ListOfFields) {
    Object.keys(this.validationSchema.fields).forEach((field: string) => this.validateField(field, values))
  }

  dispose() {
    Object.values(this.fields).forEach(item => {
      item.dispose()
    })
  }
}
