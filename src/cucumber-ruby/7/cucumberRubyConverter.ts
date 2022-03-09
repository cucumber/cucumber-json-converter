import { Converter } from '../../types.js'
import { CucumberRubyJson } from './CucumberRubyJson.js'

export const cucumberRubyConverter: Converter<CucumberRubyJson> = (json) => {
  return {
    implementation: 'cucumber-ruby',
    features: json,
  }
}
