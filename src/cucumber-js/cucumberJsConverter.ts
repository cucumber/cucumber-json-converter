import { Element, Feature, Hook, Step } from '../CucumberJson.js'
import { Converter } from '../types.js'
import {
  CucumberJsJson,
  JsArgument,
  JsDataTable,
  JsDocString,
  JsElement,
  JsFeature,
  JsHookStep,
  JsStep,
  JsStepOrHook,
} from './CucumberJsJson.js'

export const cucumberJsConverter: Converter = (json: CucumberJsJson) => {
  return {
    implementation: 'cucumber-js',
    features: json.map(jsFeatureToFeature),
  }
}

function jsFeatureToFeature(jsFeature: JsFeature): Feature {
  return {
    ...jsFeature,
    ...{
      elements: jsFeature.elements.map(jsElementToElement),
    },
  }
}

function jsElementToElement(jsElement: JsElement): Element {
  const before = jsElement.steps.filter(isBeforeHook).map(hookStepToHook)
  const steps = jsElement.steps.filter(isStep).map(jsStepToStep)
  const after = jsElement.steps.filter(isAfterHook).map(hookStepToHook)

  return {
    after,
    before,
    description: jsElement.description || '',
    id: jsElement.id,
    keyword: jsElement.keyword,
    line: jsElement.line,
    name: jsElement.name,
    steps,
    tags: jsElement.tags,
    type: jsElement.type || 'scenario',
  }
}

function jsStepToStep(jsStep: JsStep): Step {
  const docStrings = (jsStep.arguments || []).filter(isDocstring).map((docString) => ({
    line: docString.line,
    value: docString.content,
  }))
  const datatables = (jsStep.arguments || []).filter(isDataTable)

  return {
    keyword: jsStep.keyword,
    line: jsStep.line,
    name: jsStep.name,
    result: jsStep.result,
    match: jsStep.match,
    doc_string: docStrings.length > 0 ? docStrings[0] : undefined,
    rows: datatables.length > 0 ? datatables[0].rows : undefined,
  }
}

function hookStepToHook(jsHook: JsHookStep): Hook {
  return {
    result: jsHook.result,
  }
}

function isStep(jsStepOrHook: JsStepOrHook): jsStepOrHook is JsStep {
  return !('hidden' in jsStepOrHook)
}

function isBeforeHook(jsStepOrHook: JsStepOrHook): jsStepOrHook is JsHookStep {
  return 'hidden' in jsStepOrHook && jsStepOrHook.keyword === 'Before'
}

function isAfterHook(jsStepOrHook: JsStepOrHook): jsStepOrHook is JsHookStep {
  return 'hidden' in jsStepOrHook && jsStepOrHook.keyword === 'After'
}

function isDocstring(argument: JsArgument): argument is JsDocString {
  return (argument as JsDocString).content !== undefined
}

function isDataTable(argument: JsArgument): argument is JsDataTable {
  return !isDocstring(argument)
}
