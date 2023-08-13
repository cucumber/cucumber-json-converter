import assert from 'assert'
import fs from 'fs'
import { glob } from 'glob'
import path from 'path'
import { promisify } from 'util'

import { convert, convertMulti } from '../src/index.js'

const readFile = promisify(fs.readFile)

describe('convert', () => {
  const jsonFiles = glob.sync('testdata/*/*/json/*.json')
  // const jsonFiles = glob.sync('testdata/cucumber-ruby/2.0.0/json/step-with-arguments.json')
  // const jsonFiles = glob.sync('testdata/cucumber-jvm/7.2.3/json/failing-passing-pending-scenarios.json')

  for (const jsonFile of jsonFiles) {
    it(`converts ${jsonFile}`, async () => {
      const json = await readFile(jsonFile, 'utf-8')
      const ob = JSON.parse(json)
      const cucumberJsons = convertMulti(ob)
      if (cucumberJsons.length === 1) {
        const implementation = cucumberJsons[0].implementation
        const dirname = path.basename(path.join(jsonFile, '../../..'))
        assert.strictEqual(implementation, dirname)
      } else {
        // This will check that the converted objects are the same (ignoring differences in the implementation)
        convert(ob)
      }
    })
  }
})
