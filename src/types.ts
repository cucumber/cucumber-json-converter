import { SchemaObject, ValidateFunction } from 'ajv'

import { CucumberJson } from './CucumberJson.js'

export type Converter = (obj: unknown) => CucumberJson

export type Convalidator = {
  implementationValidator: ValidateFunction
  converter: Converter
  schema: SchemaObject
}
