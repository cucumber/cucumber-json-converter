import tsj from "ts-json-schema-generator"
import fs from "fs"
import path from "path"
import glob from 'glob'

for (const typesPath of glob.sync("src/**/*Json.ts")) {
  const type = path.basename(typesPath, '.ts')

  const config = {
    path: typesPath,
    type,
    tsconfig: "tsconfig.json"
  };

  const schema = tsj.createGenerator(config).createSchema(config.type)
  const schemaString = JSON.stringify(schema, null, 2)
  const typeScriptSource = `import { SchemaObject } from 'ajv'
export default ${schemaString} as SchemaObject`
  const schemaPath = typesPath.replace(/Json\.ts$/, 'Schema.ts')
  fs.writeFileSync(schemaPath, typeScriptSource)
}
