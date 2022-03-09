import fs from 'fs'
import glob from 'glob'
import { promisify } from 'util'

import { makeConverter } from '../src/makeConverter.js'
import { MultiConverter } from '../src/types.js'
import assert from 'assert'

const readFile = promisify(fs.readFile)

describe('converter', async () => {
  const jsonFiles = glob.sync('testdata/*/*/json/*.json')

  let convert: MultiConverter<never>
  beforeEach(async () => {
    if (!convert) convert = await makeConverter()
  })

  for (const jsonFile of jsonFiles) {
    it(`converts ${jsonFile}`, async () => {
      const ob = await readFile(jsonFile, 'utf-8')
      const cucumberJsons = convert(JSON.parse(ob) as never)
      if (cucumberJsons.length > 1) {
        for (let n = 1; n < cucumberJsons.length; n++) {
          assert.deepStrictEqual(cucumberJsons[n - 1], cucumberJsons[n])
        }
      }
    })
  }
})
