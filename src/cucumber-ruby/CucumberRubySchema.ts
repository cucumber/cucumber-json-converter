import { readFileSync } from 'node:fs'

import { SchemaObject } from 'ajv'

const schema = JSON.parse(
  readFileSync('../../schemas/cucumber-ruby.json', { encoding: 'utf8' }).toString()
)

export default schema satisfies SchemaObject
