import { Element, Feature, Hook, Match, Step } from '../../CucumberJson.js'
import { Converter } from '../../types'
import { CucumberRubyJson, RubyElement, RubyFeature, RubyHook, RubyMatch, RubyStep } from './CucumberRubyJson.js'

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

  return {
    ...rubyElement,
    ...{
      before,
      steps,
      after,
    },
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
    location: rubyMatch.location
  }
}

function rubyStepToStep(rubyStep: RubyStep): Step {
  return {
    name: rubyStep.name,
    line: rubyStep.line,
    keyword: rubyStep.keyword,
    match: rubyStep.match ? rubyMatchToMatch(rubyStep.match) : undefined,
    result: rubyStep.result,
    doc_string: rubyStep.doc_string,
    rows: rubyStep.rows,
  }
}
