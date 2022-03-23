import {
  CucumberJsonElement,
  CucumberJsonElementType,
  CucumberJsonFeature,
  CucumberJsonHook,
  CucumberJsonMatch,
  CucumberJsonResult,
  CucumberJsonStep,
} from '../CucumberJson.js'
import { Converter } from '../types'
import {
  CucumberRubyJson,
  RubyElement,
  RubyFeature,
  RubyHook,
  RubyMatch,
  RubyStep,
} from './CucumberRubyJson.js'

export const cucumberRubyConverter: Converter = (json: CucumberRubyJson) => {
  return {
    implementation: 'cucumber-ruby',
    features: json.map(rubyFeatureToFeature),
  }
}

function rubyFeatureToFeature(feature: RubyFeature): CucumberJsonFeature {
  const elements: readonly CucumberJsonElement[] = feature.elements.map(rubyElementToElement)

  return {
    description: feature.description,
    elements,
    id: feature.id,
    keyword: feature.keyword,
    line: feature.line,
    name: feature.name,
    tags: feature.tags || [],
    uri: feature.uri,
  }
}

function rubyElementToElement(rubyElement: RubyElement): CucumberJsonElement {
  const before: readonly CucumberJsonHook[] = (rubyElement.before || []).map(rubyHookToHook)
  const steps: readonly CucumberJsonStep[] = rubyElement.steps.map(rubyStepToStep)
  const after: readonly CucumberJsonHook[] = (rubyElement.after || []).map(rubyHookToHook)
  const type: CucumberJsonElementType =
    rubyElement.type === 'scenario_outline' ? 'scenario' : rubyElement.type

  return {
    type,
    before,
    steps,
    after,
    id: rubyElement.id,
    keyword: rubyElement.keyword,
    line: rubyElement.line,
    name: rubyElement.name,
    tags: rubyElement.tags,
    description: rubyElement.description,
    start_timestamp: rubyElement.start_timestamp,
  }
}

function rubyHookToHook(rubyHook: RubyHook): CucumberJsonHook {
  return {
    result: rubyHook.result,
    match: rubyMatchToMatch(rubyHook.match),
  }
}

function rubyMatchToMatch(rubyMatch: RubyMatch): CucumberJsonMatch {
  return {
    location: rubyMatch.location,
  }
}

function rubyStepToStep(rubyStep: RubyStep): CucumberJsonStep {
  const result: CucumberJsonResult = rubyStep.result || {
    status: 'unknown',
  }
  return {
    name: rubyStep.name,
    line: rubyStep.line,
    keyword: rubyStep.keyword,
    match: rubyStep.match ? rubyMatchToMatch(rubyStep.match) : undefined,
    result: result,
    doc_string: rubyStep.doc_string,
    rows: rubyStep.rows,
  }
}
