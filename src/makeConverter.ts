import Ajv from 'ajv'
import fs from 'fs'
import { promisify } from 'util'

import { behaveConverter } from './behave/1/behaveConverter.js'
import { cucumberJsConverter } from './cucumber-js/7/cucumberJsConverter.js'
import { cucumberJvmConverter } from './cucumber-jvm/7/cucumberJvmConverter.js'
import { cucumberRubyConverter } from './cucumber-ruby/7/cucumberRubyConverter.js'
import { Convalidator, Converter } from './types.js'

const readFile = promisify(fs.readFile)

const converterByPath: Record<string, Converter<never>> = {
  'src/behave/1/BehaveJson.json': behaveConverter,
  'src/cucumber-js/7/CucumberJsJson.json': cucumberJsConverter,
  'src/cucumber-ruby/7/CucumberRubyJson.json': cucumberRubyConverter,
  'src/cucumber-jvm/7/CucumberJvmJson.json': cucumberJvmConverter,
  'src/CucumberJson.json': (data) => data,
}

export async function makeConverter(): Promise<Converter<never>> {
  const schemaFiles = Object.keys(converterByPath)

  const schemas = await Promise.all(schemaFiles.map((json) => readFile(json, 'utf-8')))
  const convalidators: Convalidator[] = schemaFiles.map((schemaFile, i) => {
    const schema = schemas[i]
    const validator = new Ajv().compile(JSON.parse(schema))
    const converter = converterByPath[schemaFile]
    if (!converter) throw new Error(`No converter for ${schemaFile}`)
    return { validator, converter, schemaFile }
  })

  return (data: never) => {
    const errors: string[] = []
    const convalidator = convalidators.find((convalidator) => {
      if (convalidator.validator(data)) {
        return true
      } else {
        errors.push(
          `Errors from ${convalidator.schemaFile} validation: ${JSON.stringify(
            convalidator.validator.errors,
            null,
            2
          )}`
        )
      }
    })
    if (!convalidator) {
      throw new Error(`Could not validate Cucumber JSON.\n${errors.join('\n')}`)
    }
    return convalidator.converter(data)
  }
}
