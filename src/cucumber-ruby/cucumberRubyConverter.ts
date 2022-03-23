import { Element, ElementType, Feature, Hook, Match, Result, Step } from '../CucumberJson.js'
import { Converter } from '../types'
import {
  CucumberRubyJson,
  RubyElement,
  RubyFeature,
  RubyHook,
  RubyMatch,
  RubyStep,
} from './CucumberRubyJson.js'

export const cucumberRubyConverter: Converter<CucumberRubyJson> = (json) => {
  return {
    implementation: 'cucumber-ruby',
    features: json.map(rubyFeatureToFeature),
  }
}

function rubyFeatureToFeature(feature: RubyFeature): Feature {
  const elements: readonly Element[] = feature.elements.map(rubyElementToElement)

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

function rubyElementToElement(rubyElement: RubyElement): Element {
  const before: readonly Hook[] = (rubyElement.before || []).map(rubyHookToHook)
  const steps: readonly Step[] = rubyElement.steps.map(rubyStepToStep)
  const after: readonly Hook[] = (rubyElement.after || []).map(rubyHookToHook)
  const type: ElementType = rubyElement.type === 'scenario_outline' ? 'scenario' : rubyElement.type

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

function rubyHookToHook(rubyHook: RubyHook): Hook {
  return {
    result: rubyHook.result,
    match: rubyMatchToMatch(rubyHook.match),
  }
}

function rubyMatchToMatch(rubyMatch: RubyMatch): Match {
  return {
    location: rubyMatch.location,
  }
}

function rubyStepToStep(rubyStep: RubyStep): Step {
  const result: Result = rubyStep.result || {
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
