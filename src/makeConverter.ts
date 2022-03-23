import Ajv from 'ajv'
import { SchemaObject } from 'ajv'

import { behaveConverter } from './behave/behaveConverter.js'
import behaveSchema from './behave/BehaveSchema.js'
import { cucumberJsConverter } from './cucumber-js/cucumberJsConverter.js'
import cucumberJsSchema from './cucumber-js/CucumberJsSchema.js'
import { cucumberJvmConverter } from './cucumber-jvm/cucumberJvmConverter.js'
import cucumberJvmSchema from './cucumber-jvm/CucumberJvmSchema.js'
import { cucumberRubyConverter } from './cucumber-ruby/cucumberRubyConverter.js'
import cucumberRubySchema from './cucumber-ruby/CucumberRubySchema.js'
import resultSchema from './CucumberSchema.js'
import { Convalidator, Converter, MultiConverter } from './types.js'

const implementationConverterBySchema = new Map<SchemaObject, Converter<never>>()
implementationConverterBySchema.set(behaveSchema, behaveConverter)
implementationConverterBySchema.set(cucumberJsSchema, cucumberJsConverter)
implementationConverterBySchema.set(cucumberJvmSchema, cucumberJvmConverter)
implementationConverterBySchema.set(cucumberRubySchema, cucumberRubyConverter)

export async function makeConverter(): Promise<MultiConverter<never>> {
  const resultValidator = new Ajv().compile(resultSchema)
  const convalidators: Convalidator[] = []

  for (const [implementationSchema, converter] of implementationConverterBySchema.entries()) {
    const implementationValidator = new Ajv().compile(implementationSchema)

    const resultValidatingConverter: Converter<never> = (obj: never) => {
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

  return (data: never) => {
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
}
