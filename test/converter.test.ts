import fs from 'fs'
import glob from 'glob'
import { promisify } from 'util'

import { makeConverter } from '../src/makeConverter.js'
import { Converter } from '../src/types.js'

const readFile = promisify(fs.readFile)

describe('converter', async () => {
  const jsonFiles = glob.sync('testdata/*/*/json/*.json')

  let convert: Converter<never>
  beforeEach(async () => {
    if (!convert) convert = await makeConverter()
  })

  for (const jsonFile of jsonFiles) {
    it(`converts ${jsonFile}`, async () => {
      const ob = await readFile(jsonFile, 'utf-8')
      const cucumberJson = convert(JSON.parse(ob) as never)
      if (!jsonFile.includes(cucumberJson.implementation)) {
        throw new Error(`Unexpected implementation: ${cucumberJson.implementation}`)
      }
    })
  }
})
