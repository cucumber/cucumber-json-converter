import Ajv from 'ajv'
import fs from 'fs'
import { promisify } from 'util'

import { behaveConverter } from './behave/1/behaveConverter.js'
import { cucumberJsConverter } from './cucumber-js/7/cucumberJsConverter.js'
import { cucumberJvmConverter } from './cucumber-jvm/7/cucumberJvmConverter.js'
import { cucumberRubyConverter } from './cucumber-ruby/7/cucumberRubyConverter.js'
import { Convalidator, Converter, MultiConverter } from './types.js'

const readFile = promisify(fs.readFile)

const implementationConverterByPath: Record<string, Converter<never>> = {
  'src/behave/1/BehaveJson.json': behaveConverter,
  'src/cucumber-js/7/CucumberJsJson.json': cucumberJsConverter,
  'src/cucumber-ruby/7/CucumberRubyJson.json': cucumberRubyConverter,
  'src/cucumber-jvm/7/CucumberJvmJson.json': cucumberJvmConverter,
}

export async function makeConverter(): Promise<MultiConverter<never>> {
  const implementationSchemaFiles = Object.keys(implementationConverterByPath)

  const resultSchemaFile = 'src/CucumberJson.json'
  const resultSchema = await readFile(resultSchemaFile, 'utf-8')
  const resultValidator = new Ajv().compile(JSON.parse(resultSchema))

  const implementationSchemas = await Promise.all(
    implementationSchemaFiles.map((json) => readFile(json, 'utf-8'))
  )
  const convalidators: Convalidator[] = implementationSchemaFiles.map((schemaFile, i) => {
    const implementationSchema = implementationSchemas[i]
    const implementationValidator = new Ajv().compile(JSON.parse(implementationSchema))
    const converter: Converter<never> = implementationConverterByPath[schemaFile]
    if (!converter) throw new Error(`No converter for ${schemaFile}`)

    const resultValidatingConverter: Converter<never> = (obj: never) => {
      const converted = converter(obj)
      if (resultValidator(converted)) {
        return converted
      } else {
        const error = `Error from ${resultSchemaFile} validation: ${JSON.stringify(
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

    return { implementationValidator, converter: resultValidatingConverter, schemaFile }
  })

  return (data: never) => {
    const errors: string[] = []
    const candidateConvalidators = convalidators.filter((convalidator) => {
      const validator = convalidator.implementationValidator
      const schemaFile = convalidator.schemaFile
      if (validator(data)) {
        return true
      } else {
        const error = `Errors from ${schemaFile} validation: ${JSON.stringify(
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
