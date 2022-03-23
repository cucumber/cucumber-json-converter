import { SchemaObject, ValidateFunction } from 'ajv'

import { CucumberJson } from './CucumberJson.js'

export type MultiConverter<T> = (obj: T) => readonly CucumberJson[]
export type Converter<T> = (obj: T) => CucumberJson
export type Convalidator = {
  implementationValidator: ValidateFunction
  converter: Converter<never>
  schema: SchemaObject
}
