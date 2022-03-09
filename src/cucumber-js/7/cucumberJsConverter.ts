import { Element, Feature, Hook, Step } from '../../CucumberJson.js'
import { Converter } from '../../types.js'
import {
  Argument,
  CucumberJsJson,
  DataTable,
  DocString,
  Element as JsElement,
  Feature as JsFeature,
  HookStep,
  Step as JsStep,
} from './CucumberJsJson.js'

export const cucumberJsConverter: Converter<CucumberJsJson> = (json) => {
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
    ...jsElement,
    ...{
      before,
      steps,
      after,
    },
  }
}

function jsStepToStep(jsStep: JsStep): Step {
  const docStrings = jsStep.arguments.filter(isDocstring).map((docString) => ({
    line: docString.line,
    value: docString.content,
  }))
  const datatables = jsStep.arguments.filter(isDataTable)

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

function hookStepToHook(jsHook: HookStep): Hook {
  return {
    result: jsHook.result,
  }
}

function isStep(jsStep: JsStep | HookStep): jsStep is JsStep {
  return (jsStep as JsStep).name !== undefined
}

function isBeforeHook(jsStep: JsStep | HookStep): jsStep is HookStep {
  return !isStep(jsStep) && jsStep.keyword === 'Before'
}

function isAfterHook(jsStep: JsStep | HookStep): jsStep is HookStep {
  return !isStep(jsStep) && jsStep.keyword === 'After'
}

function isDocstring(argument: Argument): argument is DocString {
  return (argument as DocString).content !== undefined
}

function isDataTable(argument: Argument): argument is DataTable {
  return !isDocstring(argument)
}
