import {
  CucumberJsonElement,
  CucumberJsonFeature,
  CucumberJsonResult,
  CucumberJsonStep,
  CucumberJsonTag,
} from '../CucumberJson.js'
import { Converter } from '../types.js'
import { BehaveElement, BehaveFeature, BehaveJson, BehaveResult, BehaveStep } from './BehaveJson.js'

export const behaveConverter: Converter = (json: BehaveJson) => {
  return {
    implementation: 'behave',
    features: json.map(behaveFeatureToFeature),
  }
}

function behaveFeatureToFeature(behaveFeature: BehaveFeature): CucumberJsonFeature {
  return {
    uri: getPath(behaveFeature.location),
    keyword: behaveFeature.keyword,
    name: behaveFeature.name,
    description: behaveFeature.description ? behaveFeature.description.join('') : '',
    elements: behaveFeature.elements.map(behaveElementToElement),
    tags: behaveFeature.tags.map(behaveTagToTag),
  }
}

function behaveTagToTag(behaveTag: string): CucumberJsonTag {
  return { name: behaveTag }
}

function behaveElementToElement(behaveElement: BehaveElement): CucumberJsonElement {
  return {
    line: getLine(behaveElement.location),
    type: behaveElement.type,
    keyword: behaveElement.keyword,
    name: behaveElement.name,
    description: behaveElement.description ? behaveElement.description.join('') : '',
    steps: behaveElement.steps.map(behaveStepToStep),
  }
}

function behaveStepToStep(behaveStep: BehaveStep): CucumberJsonStep {
  return {
    keyword: behaveStep.keyword,
    name: behaveStep.name,
    line: getLine(behaveStep.location),
    result: behaveResultToResult(behaveStep.result),
  }
}

function behaveResultToResult(behaveResult: BehaveResult | undefined): CucumberJsonResult {
  if (!behaveResult) return { status: 'undefined' }

  return {
    status: behaveResult.status,
    error_message: behaveResult.error_message ? behaveResult.error_message.join('') : undefined,
    duration: behaveResult.duration,
  }
}

function getLine(location: string): number {
  const match = /\w+:(\d+)/.exec(location)
  if (!match) throw new Error(`Location ${location} does not follow <path>:<line> pattern`)
  return parseInt(match[1])
}

function getPath(location: string): string {
  const match = /(\w+):\d+/.exec(location)
  if (!match) throw new Error(`Location ${location} does not follow <path>:<line> pattern`)
  return match[1]
}
