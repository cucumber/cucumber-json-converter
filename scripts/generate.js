import tsj from "ts-json-schema-generator"
import fs from "fs"
import path from "path"
import glob from 'glob'

for (const ts of glob.sync("src/**/*Json.ts")) {
  const type = path.basename(ts, '.ts')

  const config = {
    path: ts,
    type,
    tsconfig: "tsconfig.json"
  };

  const schema = tsj.createGenerator(config).createSchema(config.type)
  const schemaString = JSON.stringify(schema, null, 2)
  const json = ts.replace(/\.ts$/, '.json')
  fs.writeFileSync(json, schemaString)
}
