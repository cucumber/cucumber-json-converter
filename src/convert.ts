import Ajv, { SchemaObject } from 'ajv'
import assert from 'assert'

import { behaveConverter } from './behave/behaveConverter'
import behaveSchema from './behave/BehaveSchema'
import { cucumberJsConverter } from './cucumber-js/cucumberJsConverter'
import cucumberJsSchema from './cucumber-js/CucumberJsSchema'
import { cucumberJvmConverter } from './cucumber-jvm/cucumberJvmConverter'
import cucumberJvmSchema from './cucumber-jvm/CucumberJvmSchema'
import { cucumberRubyConverter } from './cucumber-ruby/cucumberRubyConverter'
import cucumberRubySchema from './cucumber-ruby/CucumberRubySchema'
import { CucumberJson } from './CucumberJson'
import resultSchema from './CucumberSchema'
import { Convalidator, Converter } from './types'

const implementationConverterBySchema = new Map<SchemaObject, Converter>()
implementationConverterBySchema.set(behaveSchema, behaveConverter)
implementationConverterBySchema.set(cucumberJsSchema, cucumberJsConverter)
implementationConverterBySchema.set(cucumberJvmSchema, cucumberJvmConverter)
implementationConverterBySchema.set(cucumberRubySchema, cucumberRubyConverter)

const resultValidator = new Ajv().compile(resultSchema)
const convalidators: Convalidator[] = []

for (const [implementationSchema, converter] of implementationConverterBySchema.entries()) {
  const implementationValidator = new Ajv().compile(implementationSchema)

  const resultValidatingConverter: Converter = (obj: never) => {
    const converted = converter(obj)
    if (resultValidator(converted)) {
      return converted
    } else {
      const error = `Error from ${implementationSchema.$ref} validation: ${JSON.stringify(
        resultValidator.errors,
        null,
        2
      )}`
      const convertedJson = JSON.stringify(converted, null, 2)
      throw new Error(
        `Could not validate converted Cucumber JSON.\n${error}\nConverted JSON:${convertedJson}`
      )
    }
  }

  convalidators.push({
    implementationValidator,
    converter: resultValidatingConverter,
    schema: implementationSchema,
  })
}

export function convertMulti(data: unknown): readonly CucumberJson[] {
  const errors: string[] = []
  const candidateConvalidators = convalidators.filter((convalidator) => {
    const validator = convalidator.implementationValidator
    const schema = convalidator.schema
    if (validator(data)) {
      return true
    } else {
      const error = `Errors from ${schema.$ref} validation: ${JSON.stringify(
        validator.errors,
        null,
        2
      )}`
      // console.log(error)
      errors.push(error)
    }
  })
  if (candidateConvalidators.length === 0) {
    throw new Error(`Could not validate Cucumber JSON.\n${errors.join('\n')}`)
  }
  return candidateConvalidators.map((convalidator) => convalidator.converter(data))
}

export function convert(data: unknown): CucumberJson {
  const cucumberJsons = convertMulti(data)
  if (cucumberJsons.length > 1) {
    // Sanity check that all the conversions have the same result
    for (let n = 1; n < cucumberJsons.length; n++) {
      const cucumberJson1 = cucumberJsons[n - 1]
      const cucumberJson2 = cucumberJsons[n]
      assert.deepStrictEqual(
        withoutImplementation(cucumberJson1),
        withoutImplementation(cucumberJson2),
        "The platform-specifc Cucumber JSON was valid against multiple JSON schemas, and wasn't consistently converted"
      )
    }
  }
  return cucumberJsons[0]
}

function withoutImplementation(cucumberJson: CucumberJson): CucumberJson {
  const copy: CucumberJson = JSON.parse(JSON.stringify(cucumberJson))
  copy.implementation = ''
  return copy
}
