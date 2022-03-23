import assert from 'assert'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { promisify } from 'util'

import { CucumberJson } from '../src/CucumberJson'
import { makeConverter } from '../src/makeConverter.js'
import { MultiConverter } from '../src/types.js'

const readFile = promisify(fs.readFile)

describe('converter', async () => {
  const jsonFiles = glob.sync('testdata/*/*/json/*.json')
  // const jsonFiles = glob.sync('testdata/cucumber-ruby/2.0.0/json/step-with-arguments.json')
  // const jsonFiles = glob.sync('testdata/cucumber-jvm/7.2.3/json/failing-passing-pending-scenarios.json')

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
          const cucumberJson1 = cucumberJsons[n - 1]
          const cucumberJson2 = cucumberJsons[n]

          assert.deepStrictEqual(
            withoutImplementation(cucumberJson1),
            withoutImplementation(cucumberJson2)
          )
        }
      } else {
        const implementation = cucumberJsons[0].implementation
        const dirname = path.basename(path.join(jsonFile, '../../..'))
        assert.strictEqual(implementation, dirname)
      }
    })
  }
})

function withoutImplementation(cucumberJson: CucumberJson): CucumberJson {
  const copy: CucumberJson = JSON.parse(JSON.stringify(cucumberJson))
  copy.implementation = ''
  return copy
}
