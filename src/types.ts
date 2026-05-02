import type { SchemaObject, ValidateFunction } from 'ajv'

import type { CucumberJson } from './CucumberJson.js'

export type Converter = (obj: unknown) => CucumberJson

export type Convalidator = {
  implementationValidator: ValidateFunction
  converter: Converter
  schema: SchemaObject
}
